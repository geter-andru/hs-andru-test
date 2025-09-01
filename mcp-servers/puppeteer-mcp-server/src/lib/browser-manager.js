/**
 * Browser Manager for Puppeteer MCP Server
 * Handles browser lifecycle, page management, and resource optimization
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { SecurityConfig } from '../config/security.js';

// Add stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

class BrowserManager {
  constructor() {
    this.browser = null;
    this.pages = new Map(); // Track active pages
    this.maxPages = 5;
    this.pageCleanupInterval = null;
    this.browserCleanupTimeout = null;
    this.isInitializing = false;
  }

  /**
   * Initialize browser instance with security settings
   */
  async initializeBrowser() {
    if (this.browser || this.isInitializing) {
      return this.browser;
    }

    this.isInitializing = true;
    
    try {
      console.log('🚀 Initializing Puppeteer browser...');
      
      this.browser = await puppeteer.launch({
        ...SecurityConfig.browserSecurity,
        executablePath: process.env.CHROME_PATH, // Allow custom Chrome path
      });

      console.log('✅ Browser initialized successfully');
      
      // Set up cleanup intervals
      this.setupCleanupIntervals();
      
      // Handle browser disconnect
      this.browser.on('disconnected', () => {
        console.log('🔌 Browser disconnected, cleaning up...');
        this.cleanup();
      });

      return this.browser;
      
    } catch (error) {
      console.error('❌ Failed to initialize browser:', error);
      this.isInitializing = false;
      throw new Error(`Browser initialization failed: ${error.message}`);
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * Get or create a new page for operations
   */
  async getPage(pageId = 'default') {
    if (!this.browser) {
      await this.initializeBrowser();
    }

    // Check if page already exists and is not closed
    if (this.pages.has(pageId)) {
      const existingPage = this.pages.get(pageId);
      if (!existingPage.isClosed()) {
        return existingPage;
      }
      this.pages.delete(pageId);
    }

    // Create new page if under limit
    if (this.pages.size >= this.maxPages) {
      await this.cleanupOldestPage();
    }

    try {
      const page = await this.browser.newPage();
      
      // Configure page security and performance
      await this.configurePage(page);
      
      // Track page
      this.pages.set(pageId, {
        page,
        created: Date.now(),
        lastUsed: Date.now()
      });

      console.log(`📄 Created new page: ${pageId}`);
      return page;
      
    } catch (error) {
      console.error(`❌ Failed to create page ${pageId}:`, error);
      throw new Error(`Page creation failed: ${error.message}`);
    }
  }

  /**
   * Configure page with security and performance settings
   */
  async configurePage(page) {
    // Set viewport and user agent
    await page.setViewport(SecurityConfig.browserSecurity.defaultViewport);
    await page.setUserAgent(SecurityConfig.browserSecurity.userAgent);

    // Configure request interception for performance
    await page.setRequestInterception(true);
    
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      
      // Block unnecessary resources to improve performance
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Set timeouts
    page.setDefaultNavigationTimeout(SecurityConfig.timeouts.navigation);
    page.setDefaultTimeout(SecurityConfig.timeouts.element);

    // Configure console monitoring
    this.setupConsoleMonitoring(page);
  }

  /**
   * Setup console monitoring for debugging and error tracking
   */
  setupConsoleMonitoring(page) {
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      
      if (type === 'error') {
        console.warn(`🔍 Console Error: ${text}`);
      } else if (type === 'warning') {
        console.warn(`⚠️ Console Warning: ${text}`);
      }
      
      // Store console logs for monitoring tool
      if (!page._consoleLogs) {
        page._consoleLogs = [];
      }
      page._consoleLogs.push({
        type,
        text,
        timestamp: Date.now()
      });
      
      // Keep only last 100 logs
      if (page._consoleLogs.length > 100) {
        page._consoleLogs = page._consoleLogs.slice(-100);
      }
    });

    page.on('error', error => {
      console.error('📄 Page error:', error);
    });

    page.on('pageerror', error => {
      console.error('📄 Page error:', error);
    });
  }

  /**
   * Update page last used timestamp
   */
  updatePageUsage(pageId) {
    if (this.pages.has(pageId)) {
      this.pages.get(pageId).lastUsed = Date.now();
    }
  }

  /**
   * Clean up oldest page to maintain resource limits
   */
  async cleanupOldestPage() {
    let oldestPageId = null;
    let oldestTime = Date.now();

    for (const [pageId, pageInfo] of this.pages.entries()) {
      if (pageInfo.lastUsed < oldestTime) {
        oldestTime = pageInfo.lastUsed;
        oldestPageId = pageId;
      }
    }

    if (oldestPageId) {
      await this.closePage(oldestPageId);
    }
  }

  /**
   * Close a specific page
   */
  async closePage(pageId) {
    if (this.pages.has(pageId)) {
      const pageInfo = this.pages.get(pageId);
      try {
        if (!pageInfo.page.isClosed()) {
          await pageInfo.page.close();
        }
      } catch (error) {
        console.warn(`⚠️ Error closing page ${pageId}:`, error.message);
      }
      
      this.pages.delete(pageId);
      console.log(`🗑️ Closed page: ${pageId}`);
    }
  }

  /**
   * Setup cleanup intervals for resource management
   */
  setupCleanupIntervals() {
    // Clean up unused pages every 5 minutes
    this.pageCleanupInterval = setInterval(async () => {
      await this.cleanupUnusedPages();
    }, 5 * 60 * 1000);

    // Auto-restart browser every 2 hours to prevent memory leaks
    this.browserCleanupTimeout = setTimeout(async () => {
      await this.restartBrowser();
    }, 2 * 60 * 60 * 1000);
  }

  /**
   * Clean up pages that haven't been used recently
   */
  async cleanupUnusedPages() {
    const cutoffTime = Date.now() - (10 * 60 * 1000); // 10 minutes ago
    const pagesToClose = [];

    for (const [pageId, pageInfo] of this.pages.entries()) {
      if (pageInfo.lastUsed < cutoffTime && pageId !== 'default') {
        pagesToClose.push(pageId);
      }
    }

    for (const pageId of pagesToClose) {
      await this.closePage(pageId);
    }

    if (pagesToClose.length > 0) {
      console.log(`🧹 Cleaned up ${pagesToClose.length} unused pages`);
    }
  }

  /**
   * Restart browser to prevent memory leaks
   */
  async restartBrowser() {
    console.log('🔄 Restarting browser for maintenance...');
    
    try {
      await this.cleanup();
      await this.initializeBrowser();
      console.log('✅ Browser restarted successfully');
    } catch (error) {
      console.error('❌ Browser restart failed:', error);
    }
  }

  /**
   * Get browser and page status information
   */
  getStatus() {
    return {
      browserConnected: this.browser && this.browser.isConnected(),
      activePagesCount: this.pages.size,
      maxPages: this.maxPages,
      pages: Array.from(this.pages.keys())
    };
  }

  /**
   * Clean up all resources
   */
  async cleanup() {
    console.log('🧹 Cleaning up browser resources...');

    // Clear intervals
    if (this.pageCleanupInterval) {
      clearInterval(this.pageCleanupInterval);
      this.pageCleanupInterval = null;
    }

    if (this.browserCleanupTimeout) {
      clearTimeout(this.browserCleanupTimeout);
      this.browserCleanupTimeout = null;
    }

    // Close all pages
    const closePromises = [];
    for (const [pageId] of this.pages.entries()) {
      closePromises.push(this.closePage(pageId));
    }
    await Promise.allSettled(closePromises);

    // Close browser
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (error) {
        console.warn('⚠️ Error closing browser:', error.message);
      }
      this.browser = null;
    }

    console.log('✅ Browser cleanup completed');
  }
}

// Export singleton instance
export const browserManager = new BrowserManager();

// Graceful shutdown handling
process.on('SIGINT', async () => {
  await browserManager.cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await browserManager.cleanup();
  process.exit(0);
});