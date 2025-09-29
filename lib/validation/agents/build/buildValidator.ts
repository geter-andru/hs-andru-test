/**
 * Build Artifact Validator
 * 
 * Scans build artifacts for secrets and validates build integrity
 * after Next.js build completion.
 */

import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { z } from 'zod';
import { securityScanner, type SecurityScanResult } from '../security/securityScanner.js';
import { environmentValidator } from '../../environmentValidator.js';

// Build validation result schema
export const BuildValidationResult = z.object({
  success: z.boolean(),
  buildPath: z.string(),
  artifactsScanned: z.number(),
  secretsFound: z.number(),
  environmentValid: z.boolean(),
  error: z.string().optional(),
  details: z.object({
    buildExists: z.boolean(),
    staticFiles: z.number(),
    serverFiles: z.number(),
    securityScan: z.any(),
    environmentValidation: z.any()
  })
});

export type BuildValidationResult = z.infer<typeof BuildValidationResult>;

export class BuildValidator {
  private buildDir: string;
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
    this.buildDir = path.join(this.projectRoot, '.next');
  }

  /**
   * Validate build artifacts for secrets and integrity
   */
  async validateBuild(): Promise<BuildValidationResult> {
    console.log(chalk.blue('🏗️  Validating build artifacts...'));

    try {
      // Check if build directory exists
      const buildExists = fs.existsSync(this.buildDir);
      if (!buildExists) {
        return {
          success: false,
          buildPath: this.buildDir,
          artifactsScanned: 0,
          secretsFound: 0,
          environmentValid: false,
          error: 'Build directory not found. Run "npm run build" first.',
          details: {
            buildExists: false,
            staticFiles: 0,
            serverFiles: 0,
            securityScan: null,
            environmentValidation: null
          }
        };
      }

      // Count build artifacts
      const staticFiles = this.countFiles(path.join(this.buildDir, 'static'));
      const serverFiles = this.countFiles(path.join(this.buildDir, 'server'));

      // Scan build artifacts for secrets
      console.log(chalk.blue('🔍 Scanning build artifacts for secrets...'));
      const securityScan = await this.scanBuildArtifacts();

      // Validate environment variables
      console.log(chalk.blue('🔍 Validating environment variables...'));
      let environmentValidation;
      try {
        environmentValidation = await environmentValidator.validateEnvironment();
      } catch (error) {
        console.log(chalk.yellow(`⚠️  Environment validation error: ${error instanceof Error ? error.message : 'Unknown error'}`));
        environmentValidation = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }

      const success = securityScan.secretsFound === 0 && environmentValidation.success;

      if (!success) {
        console.log(chalk.red('❌ Build validation failed'));
        if (securityScan.secretsFound > 0) {
          console.log(chalk.red(`   Secrets found in build artifacts: ${securityScan.secretsFound}`));
        }
        if (!environmentValidation.success) {
          console.log(chalk.red(`   Environment validation failed: ${environmentValidation.error}`));
        }
      } else {
        console.log(chalk.green('✅ Build validation passed'));
      }

      return {
        success,
        buildPath: this.buildDir,
        artifactsScanned: staticFiles + serverFiles,
        secretsFound: securityScan.secretsFound,
        environmentValid: environmentValidation.success,
        error: success ? undefined : 'Build validation failed',
        details: {
          buildExists: true,
          staticFiles,
          serverFiles,
          securityScan,
          environmentValidation
        }
      };

    } catch (error) {
      console.log(chalk.red(`❌ Build validation error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      return {
        success: false,
        buildPath: this.buildDir,
        artifactsScanned: 0,
        secretsFound: 0,
        environmentValid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: {
          buildExists: false,
          staticFiles: 0,
          serverFiles: 0,
          securityScan: null,
          environmentValidation: null
        }
      };
    }
  }

  /**
   * Scan build artifacts for secrets
   */
  private async scanBuildArtifacts(): Promise<SecurityScanResult> {
    try {
      // Create a temporary security scanner for build artifacts
      const buildScanner = new (securityScanner.constructor as any)();
      
      // Override the base directory to scan only build artifacts
      buildScanner.baseDir = this.buildDir;
      
      // Scan the build directory
      return await buildScanner.scanRepository();
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not scan build artifacts: ${error instanceof Error ? error.message : 'Unknown error'}`));
      return {
        success: false,
        scannedFiles: 0,
        secretsFound: 0,
        vulnerabilities: [],
        nextjsSpecificIssues: [],
        safeFiles: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Count files in a directory recursively
   */
  private countFiles(dirPath: string): number {
    try {
      if (!fs.existsSync(dirPath)) return 0;
      
      let count = 0;
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          count += this.countFiles(itemPath);
        } else {
          count++;
        }
      }
      
      return count;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get build summary
   */
  getBuildSummary(): Record<string, any> {
    const summary: Record<string, any> = {
      buildPath: this.buildDir,
      buildExists: fs.existsSync(this.buildDir),
      timestamp: new Date().toISOString()
    };

    if (summary.buildExists) {
      try {
        const staticPath = path.join(this.buildDir, 'static');
        const serverPath = path.join(this.buildDir, 'server');
        
        summary.staticFiles = this.countFiles(staticPath);
        summary.serverFiles = this.countFiles(serverPath);
        summary.totalFiles = summary.staticFiles + summary.serverFiles;
      } catch (error) {
        summary.error = error instanceof Error ? error.message : 'Unknown error';
      }
    }

    return summary;
  }
}

export const buildValidator = new BuildValidator();

// CLI execution
async function main() {
  const validator = new BuildValidator();
  const result = await validator.validateBuild();
  
  if (result.success) {
    console.log(chalk.green('✅ Build validation completed successfully'));
    process.exit(0);
  } else {
    console.log(chalk.red('❌ Build validation failed'));
    console.log(chalk.red(`Error: ${result.error}`));
    process.exit(1);
  }
}

// ES module entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
