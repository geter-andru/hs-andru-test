#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Mock data patterns to detect
const MOCK_PATTERNS = [
  /mock|fake|dummy|test|sample/i,
  /lorem ipsum/i,
  /john doe|jane doe/i,
  /@example\.com/,
  /123-456-7890/,
  /placeholder/i,
  /foo|bar|baz/i,
  /\btest\w+/i,
  /\bmock\w+/i,
  /\bfake\w+/i
];

let hasErrors = false;
const errors = [];

// Scan TypeScript/TSX files for mock data patterns
function scanFile(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
    return;
  }
  
  // Skip test files
  if (filePath.includes('.test.') || filePath.includes('.spec.') || filePath.includes('__tests__')) {
    return;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Skip comments and production-approved mock data
      if (line.trim().startsWith('//') || line.includes('@production-approved')) {
        return;
      }
      
      MOCK_PATTERNS.forEach(pattern => {
        if (pattern.test(line)) {
          const lineNum = index + 1;
          errors.push({
            file: filePath,
            line: lineNum,
            pattern: pattern.toString(),
            content: line.trim().substring(0, 100)
          });
          hasErrors = true;
        }
      });
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

// Recursively scan directory
function scanDirectory(dir) {
  // Skip node_modules and build directories
  const skipDirs = ['node_modules', '.next', 'dist', 'build', 'coverage', 'out'];
  
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!skipDirs.includes(file) && !file.startsWith('.')) {
          scanDirectory(fullPath);
        }
      } else {
        scanFile(fullPath);
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

// Main execution
console.log('🔍 Scanning for mock data patterns...\n');

// Scan app and lib directories
['app', 'lib', 'src'].forEach(dir => {
  if (fs.existsSync(dir)) {
    scanDirectory(dir);
  }
});

// Report results
if (hasErrors) {
  console.error('❌ MOCK DATA VALIDATION FAILED!\n');
  console.error('Found mock data patterns in the following locations:\n');
  
  errors.forEach(error => {
    console.error(`📄 ${error.file}:${error.line}`);
    console.error(`   Pattern: ${error.pattern}`);
    console.error(`   Content: ${error.content}`);
    console.error('');
  });
  
  console.error(`\nTotal violations: ${errors.length}`);
  console.error('\n⚠️  Fix these issues before proceeding:');
  console.error('1. Replace mock data with real data sources');
  console.error('2. Add @production-approved comment if mock data is intentional');
  console.error('3. Use proper data fetching from APIs or databases\n');
  
  process.exit(1);
} else {
  console.log('✅ No mock data patterns detected!');
  console.log('All data appears to be production-ready.\n');
}