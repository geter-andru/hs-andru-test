#!/usr/bin/env node

import { MCPServer } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import puppeteer from 'puppeteer';
import { URL } from 'url';

class PuppeteerMCPServer {
  constructor() {
    this.browser = null;
    this.page = null;
    this.server = new MCPServer({
      name: "puppeteer-mcp-server",
      version: "1.0.0"
    }, {
      capabilities: {
        tools: {}
      }
    });

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "puppeteer_navigate",
            description: "Navigate to a URL with security validation",
            inputSchema: {
              type: "object",
              properties: {
                url: { type: "string", description: "URL to navigate to" },
                waitFor: { type: "string", description: "CSS selector to wait for (optional)" },
                timeout: { type: "number", description: "Timeout in ms (default: 30000)" }
              },
              required: ["url"]
            }
          },
          {
            name: "puppeteer_screenshot",
            description: "Take a screenshot of current page or specific element",
            inputSchema: {
              type: "object",
              properties: {
                selector: { type: "string", description: "CSS selector for element screenshot (optional)" },
                fullPage: { type: "boolean", description: "Take full page screenshot (default: true)" },
                filename: { type: "string", description: "Optional filename for screenshot" }
              }
            }
          },
          {
            name: "puppeteer_extract_data",
            description: "Extract text content or data from page elements",
            inputSchema: {
              type: "object",
              properties: {
                selector: { type: "string", description: "CSS selector for elements to extract" },
                attribute: { type: "string", description: "Attribute to extract (optional, default: text content)" },
                multiple: { type: "boolean", description: "Extract from multiple elements (default: false)" }
              },
              required: ["selector"]
            }
          },
          {
            name: "puppeteer_interact",
            description: "Interact with page elements (click, type, select)",
            inputSchema: {
              type: "object",
              properties: {
                action: { type: "string", enum: ["click", "type", "select", "hover"], description: "Action to perform" },
                selector: { type: "string", description: "CSS selector for target element" },
                value: { type: "string", description: "Value for type/select actions (optional)" },
                waitAfter: { type: "number", description: "Wait time after action in ms (default: 1000)" }
              },
              required: ["action", "selector"]
            }
          },
          {
            name: "puppeteer_execute_js",
            description: "Execute JavaScript in the browser context",
            inputSchema: {
              type: "object",
              properties: {
                script: { type: "string", description: "JavaScript code to execute" },
                waitFor: { type: "number", description: "Wait time after execution in ms (default: 1000)" }
              },
              required: ["script"]
            }
          },
          {
            name: "puppeteer_monitor_console",
            description: "Monitor and return console logs and errors",
            inputSchema: {
              type: "object",
              properties: {
                duration: { type: "number", description: "Monitoring duration in ms (default: 5000)" },
                types: { type: "array", items: { type: "string" }, description: "Log types to capture (default: ['log', 'error', 'warn'])" }
              }
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        await this.ensureBrowser();
        
        switch (request.params.name) {
          case "puppeteer_navigate":
            return await this.navigate(request.params.arguments);
          case "puppeteer_screenshot":
            return await this.screenshot(request.params.arguments);
          case "puppeteer_extract_data":
            return await this.extractData(request.params.arguments);
          case "puppeteer_interact":
            return await this.interact(request.params.arguments);
          case "puppeteer_execute_js":
            return await this.executeJS(request.params.arguments);
          case "puppeteer_monitor_console":
            return await this.monitorConsole(request.params.arguments);
          default:
            throw new Error(`Unknown tool: ${request.params.name}`);
        }
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error: ${error.message}`
          }]
        };
      }
    });
  }

  async ensureBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
        ]
      });
      this.page = await this.browser.newPage();
      
      // Set reasonable defaults
      await this.page.setViewport({ width: 1920, height: 1080 });
      await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
  }

  validateURL(url) {
    try {
      const parsedUrl = new URL(url);
      // Security validation - only allow http/https
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Only HTTP and HTTPS URLs are allowed');
      }
      return true;
    } catch (error) {
      throw new Error(`Invalid URL: ${error.message}`);
    }
  }

  async navigate(args) {
    const { url, waitFor, timeout = 30000 } = args;
    
    this.validateURL(url);
    
    await this.page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout 
    });
    
    if (waitFor) {
      await this.page.waitForSelector(waitFor, { timeout });
    }
    
    const finalUrl = this.page.url();
    
    return {
      content: [{
        type: "text",
        text: `Successfully navigated to: ${finalUrl}`
      }]
    };
  }

  async screenshot(args) {
    const { selector, fullPage = true, filename } = args;
    
    let screenshotOptions = {
      type: 'png',
      encoding: 'base64'
    };
    
    if (selector) {
      const element = await this.page.$(selector);
      if (!element) {
        throw new Error(`Element not found: ${selector}`);
      }
      screenshotOptions.element = element;
      screenshotOptions.fullPage = false;
    } else {
      screenshotOptions.fullPage = fullPage;
    }
    
    const screenshot = await this.page.screenshot(screenshotOptions);
    
    return {
      content: [{
        type: "text",
        text: `Screenshot captured${selector ? ` of element: ${selector}` : ''}${filename ? ` as: ${filename}` : ''}`
      }],
      metadata: {
        screenshot: screenshot,
        url: this.page.url(),
        timestamp: new Date().toISOString()
      }
    };
  }

  async extractData(args) {
    const { selector, attribute, multiple = false } = args;
    
    const result = await this.page.evaluate((sel, attr, multi) => {
      const elements = multi ? 
        document.querySelectorAll(sel) : 
        [document.querySelector(sel)];
      
      return Array.from(elements)
        .filter(el => el)
        .map(el => {
          if (attr) {
            return el.getAttribute(attr);
          }
          return el.textContent?.trim();
        });
    }, selector, attribute, multiple);
    
    const data = multiple ? result : result[0];
    
    return {
      content: [{
        type: "text",
        text: `Extracted data from ${selector}: ${JSON.stringify(data, null, 2)}`
      }],
      metadata: {
        data,
        selector,
        attribute,
        url: this.page.url()
      }
    };
  }

  async interact(args) {
    const { action, selector, value, waitAfter = 1000 } = args;
    
    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    
    switch (action) {
      case 'click':
        await element.click();
        break;
      case 'type':
        if (!value) throw new Error('Value required for type action');
        await element.type(value);
        break;
      case 'select':
        if (!value) throw new Error('Value required for select action');
        await this.page.select(selector, value);
        break;
      case 'hover':
        await element.hover();
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }
    
    await this.page.waitForTimeout(waitAfter);
    
    return {
      content: [{
        type: "text",
        text: `Successfully performed ${action} on ${selector}${value ? ` with value: ${value}` : ''}`
      }]
    };
  }

  async executeJS(args) {
    const { script, waitFor = 1000 } = args;
    
    const result = await this.page.evaluate(script);
    await this.page.waitForTimeout(waitFor);
    
    return {
      content: [{
        type: "text",
        text: `JavaScript executed successfully. Result: ${JSON.stringify(result, null, 2)}`
      }],
      metadata: {
        result,
        script
      }
    };
  }

  async monitorConsole(args) {
    const { duration = 5000, types = ['log', 'error', 'warn'] } = args;
    
    const logs = [];
    
    const handleConsole = (msg) => {
      if (types.includes(msg.type())) {
        logs.push({
          type: msg.type(),
          text: msg.text(),
          timestamp: new Date().toISOString()
        });
      }
    };
    
    this.page.on('console', handleConsole);
    
    await this.page.waitForTimeout(duration);
    
    this.page.off('console', handleConsole);
    
    return {
      content: [{
        type: "text",
        text: `Console monitoring complete. Captured ${logs.length} logs:\n${JSON.stringify(logs, null, 2)}`
      }],
      metadata: {
        logs,
        duration
      }
    };
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    // Cleanup on exit
    process.on('SIGINT', async () => {
      await this.cleanup();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      await this.cleanup();
      process.exit(0);
    });
  }
}

// Start server
const server = new PuppeteerMCPServer();
server.run().catch(console.error);