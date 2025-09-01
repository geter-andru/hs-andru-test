# Puppeteer MCP Server for H&S Revenue Intelligence Platform

A comprehensive Model Context Protocol (MCP) server that provides Puppeteer-based web automation capabilities for the H&S Revenue Intelligence Platform.

## Features

### Core Puppeteer Tools
- `puppeteer_navigate` - Navigate to URLs with security validation
- `puppeteer_screenshot` - Capture screenshots of pages/elements
- `puppeteer_extract_data` - Extract text and data from pages
- `puppeteer_interact` - Click, fill forms, interact with elements
- `puppeteer_execute_js` - Run JavaScript in browser context
- `puppeteer_monitor_console` - Capture console logs and errors

### Integration Capabilities
- Enhanced webResearchService integration
- ICP Analysis automation
- Cost Calculator real-time pricing capture
- Business Case Builder market intelligence
- Competitive research automation

### Security & Performance
- URL validation and allowlist system
- Rate limiting and browser resource management
- Headless browser configuration for server environments
- Stealth mode to avoid bot detection

## Installation

```bash
cd mcp-servers/puppeteer-mcp-server
npm install
```

## Configuration

Add to Claude Code's MCP settings:

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "node",
      "args": ["/Users/geter/hs-andru-test/modern-platform/mcp-servers/puppeteer-mcp-server/src/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Usage Examples

### Basic Web Research
```javascript
// Navigate and screenshot
await puppeteer_navigate({ url: "https://example.com" });
await puppeteer_screenshot({ filename: "research.png" });

// Extract competitor pricing
await puppeteer_extract_data({ 
  selector: ".pricing-table", 
  type: "pricing_data" 
});
```

### ICP Research Automation
```javascript
// Automated competitor analysis
await puppeteer_navigate({ url: "https://competitor.com/about" });
const companyInfo = await puppeteer_extract_data({
  type: "company_profile",
  extractors: ["company_size", "industry", "funding"]
});
```

## Integration with Existing Services

The server automatically integrates with:
- `/src/services/webResearchService.js` - Real web scraping capabilities
- ICP Analysis tools - Automated competitor research
- Cost Calculator - Live pricing data capture
- Business Case Builder - Market intelligence gathering

## Development

```bash
npm run dev  # Development mode with hot reload
npm test     # Run example workflows
npm start    # Production mode
```