/**
 * Security configuration for Puppeteer MCP Server
 * Implements URL validation, rate limiting, and safe browsing policies
 */

export const SecurityConfig = {
  // Allowed domains for navigation - prevents malicious URL access
  allowedDomains: [
    'linkedin.com',
    'crunchbase.com',
    'g2.com',
    'capterra.com',
    'statista.com',
    'gartner.com',
    'forrester.com',
    'techcrunch.com',
    'venturebeat.com',
    'businesswire.com',
    'pricingpages.com',
    'saasworthy.com',
    'pitchbook.com',
    'similarweb.com',
    'builtwith.com',
    'glassdoor.com',
    'indeed.com',
    'angel.co',
    'producthunt.com',
    'google.com',
    'bing.com',
    'duckduckgo.com'
  ],

  // Blocked domains - known problematic sites
  blockedDomains: [
    'example-malicious-site.com',
    'spam-domain.net'
  ],

  // Rate limiting configuration
  rateLimit: {
    maxRequestsPerMinute: 30,
    maxRequestsPerHour: 500,
    windowMs: 60000, // 1 minute
    maxConcurrentRequests: 5
  },

  // Browser security settings
  browserSecurity: {
    headless: 'new', // Use new headless mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-features=TranslateUI',
      '--disable-ipc-flooding-protection'
    ],
    defaultViewport: {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  },

  // Request timeouts
  timeouts: {
    navigation: 30000, // 30 seconds
    element: 10000,    // 10 seconds
    execution: 15000   // 15 seconds
  }
};

/**
 * Validates if a URL is safe to navigate to
 */
export function validateUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.toLowerCase();
    
    // Check if domain is blocked
    if (SecurityConfig.blockedDomains.some(blocked => domain.includes(blocked))) {
      throw new Error(`Blocked domain: ${domain}`);
    }
    
    // Check if domain is allowed
    const isAllowed = SecurityConfig.allowedDomains.some(allowed => 
      domain === allowed || domain.endsWith('.' + allowed)
    );
    
    if (!isAllowed) {
      throw new Error(`Domain not in allowlist: ${domain}`);
    }
    
    // Ensure HTTPS for sensitive operations
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      throw new Error(`Invalid protocol: ${parsedUrl.protocol}`);
    }
    
    return {
      valid: true,
      url: parsedUrl.href,
      domain: domain
    };
    
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
}

/**
 * Rate limiting tracker
 */
class RateLimiter {
  constructor() {
    this.requests = new Map(); // Track requests per IP/session
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Cleanup every minute
  }

  checkRateLimit(identifier = 'default') {
    const now = Date.now();
    const key = identifier;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const requests = this.requests.get(key);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => 
      now - timestamp < SecurityConfig.rateLimit.windowMs
    );
    
    // Check if rate limit exceeded
    if (validRequests.length >= SecurityConfig.rateLimit.maxRequestsPerMinute) {
      throw new Error(`Rate limit exceeded: ${validRequests.length} requests in the last minute`);
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }

  cleanup() {
    const now = Date.now();
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(timestamp => 
        now - timestamp < SecurityConfig.rateLimit.windowMs
      );
      
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();