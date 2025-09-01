/**
 * REAL Web Research Service
 * Calls actual server-side API for real web scraping
 * NO TEMPLATES, NO PLACEHOLDERS - REAL DATA ONLY
 */

interface ProductData {
  productName: string;
  businessType: string;
  productDescription: string;
}

interface ResearchData {
  successful: number;
  failed: number;
  cached: number;
  data: Record<string, any>;
  error?: string;
  real: boolean;
}

interface ResearchResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
}

class WebResearchService {
  private apiEndpoint = '/api/research';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheExpiry = 60 * 60 * 1000; // 1 hour cache for real data

  /**
   * Conduct REAL product research using server-side web scraping
   */
  async conductProductResearch(
    productData: ProductData,
    researchDepth: 'light' | 'medium' | 'deep' = 'medium'
  ): Promise<ResearchData> {
    const startTime = Date.now();
    console.log('🔍 Starting REAL web research for:', productData.productName);

    try {
      // Check cache first
      const cacheKey = `${productData.productName}-${productData.businessType}-${researchDepth}`;
      const cached = this.getFromCache(cacheKey);
      
      if (cached) {
        console.log('📦 Returning cached real data');
        return {
          successful: 1,
          failed: 0,
          cached: 1,
          data: cached,
          real: true
        };
      }

      // Prepare research queries
      const queries = this.buildResearchQueries(productData, researchDepth);
      const researchResults: Record<string, any> = {};
      let successCount = 0;
      let failCount = 0;

      // Execute real research for each query
      for (const [key, query] of Object.entries(queries)) {
        try {
          console.log(`🌐 Executing real research: ${key}`);
          
          // Call REAL API endpoint
          const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: query.query,
              sources: query.sources,
              depth: researchDepth
            })
          });

          if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
          }

          const data = await response.json();
          
          if (data.real && data.results) {
            researchResults[key] = this.processRealResults(data.results, key);
            successCount++;
            console.log(`✅ Real data received for ${key}: ${data.results.length} results`);
          } else {
            throw new Error('Invalid response format');
          }

        } catch (error) {
          console.error(`❌ Real research failed for ${key}:`, error);
          failCount++;
          researchResults[key] = { error: true, message: (error as any).message };
        }
      }

      // Cache the real results
      if (successCount > 0) {
        this.addToCache(cacheKey, researchResults);
      }

      const duration = Date.now() - startTime;
      console.log(`🎯 Real research completed in ${duration}ms`);

      return {
        successful: successCount,
        failed: failCount,
        cached: 0,
        data: researchResults,
        real: true
      };

    } catch (error: any) {
      console.error('❌ Real research service failed:', error);
      return {
        successful: 0,
        failed: 1,
        cached: 0,
        data: {},
        error: error.message,
        real: true
      };
    }
  }

  /**
   * Build research queries based on product data
   */
  private buildResearchQueries(productData: ProductData, depth: string) {
    const { productName, businessType, productDescription } = productData;
    
    const queries: Record<string, { query: string; sources: string[] }> = {
      market_size: {
        query: `${productName} ${businessType} market size 2024 statistics`,
        sources: ['statista.com', 'gartner.com', 'forrester.com']
      },
      competitors: {
        query: `${productName} competitors alternatives ${businessType}`,
        sources: ['g2.com', 'capterra.com', 'trustradius.com']
      }
    };

    if (depth === 'medium' || depth === 'deep') {
      queries.industry_trends = {
        query: `${businessType} industry trends 2024 ${productName}`,
        sources: ['techcrunch.com', 'venturebeat.com', 'forbes.com']
      };
      
      queries.pricing = {
        query: `${productName} pricing cost ${businessType} software`,
        sources: ['capterra.com', 'g2.com', 'softwareadvice.com']
      };
    }

    if (depth === 'deep') {
      queries.funding = {
        query: `${businessType} startup funding investment ${productName}`,
        sources: ['crunchbase.com', 'pitchbook.com', 'techcrunch.com']
      };
      
      queries.customer_reviews = {
        query: `${productName} reviews testimonials ${businessType}`,
        sources: ['g2.com', 'trustpilot.com', 'capterra.com']
      };
    }

    return queries;
  }

  /**
   * Process real scraped results into structured data
   */
  private processRealResults(results: ResearchResult[], category: string): any {
    console.log(`📊 Processing ${results.length} real results for ${category}`);
    
    switch (category) {
      case 'market_size':
        return {
          sources: results.map(r => r.url),
          insights: results.map(r => r.snippet),
          marketIndicators: this.extractMarketIndicators(results),
          real: true
        };
      
      case 'competitors':
        return {
          competitorList: this.extractCompetitorNames(results),
          sources: results.map(r => r.url),
          comparisons: results.map(r => ({
            title: r.title,
            snippet: r.snippet,
            source: r.source
          })),
          real: true
        };
      
      case 'industry_trends':
        return {
          trends: this.extractTrends(results),
          sources: results.map(r => r.url),
          articles: results.map(r => ({
            title: r.title,
            snippet: r.snippet
          })),
          real: true
        };
      
      case 'pricing':
        return {
          pricingInfo: this.extractPricingInfo(results),
          sources: results.map(r => r.url),
          real: true
        };
      
      case 'funding':
        return {
          fundingData: results.map(r => r.snippet),
          sources: results.map(r => r.url),
          real: true
        };
      
      case 'customer_reviews':
        return {
          reviews: results.map(r => ({
            snippet: r.snippet,
            source: r.source
          })),
          sources: results.map(r => r.url),
          real: true
        };
      
      default:
        return {
          raw: results,
          real: true
        };
    }
  }

  /**
   * Extract market indicators from real search results
   */
  private extractMarketIndicators(results: ResearchResult[]): string[] {
    const indicators: string[] = [];
    
    results.forEach(result => {
      // Look for real numbers and percentages in snippets
      const numbers = result.snippet.match(/\$[\d.]+[BMK]|\d+%|CAGR|growth|billion|million/gi);
      if (numbers) {
        indicators.push(...numbers);
      }
    });
    
    return [...new Set(indicators)]; // Remove duplicates
  }

  /**
   * Extract competitor names from real results
   */
  private extractCompetitorNames(results: ResearchResult[]): string[] {
    const competitors: string[] = [];
    
    results.forEach(result => {
      // Look for "vs", "alternative to", "competitor" patterns
      const patterns = result.title.match(/vs\.?\s+(\w+)|alternative to (\w+)|(\w+) competitor/i);
      if (patterns) {
        competitors.push(...patterns.filter(p => p && !p.includes('vs') && !p.includes('alternative')));
      }
    });
    
    return [...new Set(competitors)].slice(0, 5); // Top 5 unique competitors
  }

  /**
   * Extract trends from real results
   */
  private extractTrends(results: ResearchResult[]): string[] {
    return results
      .map(r => {
        // Extract the main point from each snippet
        const firstSentence = r.snippet.split('.')[0];
        return firstSentence.length > 20 ? firstSentence : r.title;
      })
      .filter(t => t.length > 0);
  }

  /**
   * Extract pricing information from real results
   */
  private extractPricingInfo(results: ResearchResult[]): any[] {
    return results.map(result => {
      const priceMatches = result.snippet.match(/\$[\d,]+|\d+\s*per\s*\w+|free|freemium|trial/gi);
      return {
        source: result.source,
        pricing: priceMatches || ['Pricing information not found in snippet'],
        description: result.snippet.substring(0, 200)
      };
    });
  }

  /**
   * Cache management
   */
  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private addToCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    // Limit cache size
    if (this.cache.size > 50) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  /**
   * Test method to verify real API is working
   */
  async testRealResearch(): Promise<boolean> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'test query',
          depth: 'light'
        })
      });
      
      const data = await response.json();
      console.log('🧪 Real API test result:', data);
      return data.real === true;
      
    } catch (error) {
      console.error('🧪 Real API test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const webResearchService = new WebResearchService();
export default webResearchService;