/**
 * REAL Server-Side Research API
 * Uses axios and cheerio for reliable web scraping
 * Returns REAL data from actual web searches
 */

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface ResearchRequest {
  query: string;
  sources?: string[];
  depth?: 'light' | 'medium' | 'deep';
}

interface ScrapedResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
}

export async function POST(request: NextRequest) {
  console.log('🔍 REAL Research API called');
  
  try {
    const body: ResearchRequest = await request.json();
    const { query, sources = [], depth = 'medium' } = body;
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    console.log(`📊 Starting REAL web scraping for: "${query}"`);
    
    const results: ScrapedResult[] = [];
    
    // Use DuckDuckGo HTML version for reliable scraping (no JS required)
    try {
      const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      console.log(`🌐 Scraping: ${searchUrl}`);
      
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        timeout: 10000
      });
      
      const $ = cheerio.load(response.data);
      
      // Extract real search results from DuckDuckGo
      $('.result').each((index, element) => {
        if (index >= 10) return; // Limit to 10 results
        
        const $result = $(element);
        const title = $result.find('.result__title').text().trim();
        const url = $result.find('.result__url').text().trim();
        const snippet = $result.find('.result__snippet').text().trim();
        
        if (title && snippet) {
          results.push({
            title,
            url: url || 'https://' + url,
            snippet,
            source: 'duckduckgo'
          });
        }
      });
      
      console.log(`✅ Found ${results.length} real results from DuckDuckGo`);
      
    } catch (searchError: any) {
      console.error('Primary search failed, trying alternative:', searchError.message);
      
      // Fallback: Try to get data from specific sources if provided
      if (sources.length > 0) {
        for (const source of sources.slice(0, 3)) {
          try {
            console.log(`🔍 Attempting to scrape: ${source}`);
            
            const siteUrl = `https://${source}`;
            const siteResponse = await axios.get(siteUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ResearchBot/1.0)'
              },
              timeout: 5000
            });
            
            const $ = cheerio.load(siteResponse.data);
            
            // Extract title and meta description as a basic result
            const title = $('title').text() || source;
            const description = $('meta[name="description"]').attr('content') || 
                              $('meta[property="og:description"]').attr('content') ||
                              'No description available';
            
            results.push({
              title: title.substring(0, 100),
              snippet: description.substring(0, 200),
              url: siteUrl,
              source: source
            });
            
          } catch (sourceError) {
            console.warn(`Could not scrape ${source}:`, sourceError);
          }
        }
      }
    }
    
    // If still no results, provide at least some real data from a reliable source
    if (results.length === 0 && depth !== 'light') {
      try {
        // Try Wikipedia as a last resort for real content
        const wikiQuery = query.split(' ').slice(0, 3).join('_');
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srlimit=5`;
        
        const wikiResponse = await axios.get(wikiUrl, { timeout: 5000 });
        const wikiData = wikiResponse.data;
        
        if (wikiData.query && wikiData.query.search) {
          wikiData.query.search.forEach((item: any) => {
            results.push({
              title: item.title,
              snippet: item.snippet.replace(/<[^>]*>/g, ''), // Remove HTML tags
              url: `https://en.wikipedia.org/wiki/${item.title.replace(/ /g, '_')}`,
              source: 'wikipedia'
            });
          });
          console.log(`✅ Found ${results.length} results from Wikipedia API`);
        }
      } catch (wikiError) {
        console.error('Wikipedia fallback failed:', wikiError);
      }
    }
    
    // Return REAL scraped data
    const response = {
      success: true,
      query,
      results,
      resultCount: results.length,
      timestamp: Date.now(),
      real: true, // This is REAL data from actual web sources
      message: results.length > 0 
        ? `Successfully scraped ${results.length} real results`
        : 'No results found, but this was a real search attempt'
    };
    
    console.log(`✅ Real scraping complete: ${results.length} results found`);
    
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('❌ Real research API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Research failed',
        message: error.message,
        real: true, // Even errors are real!
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    status: 'Real Research API is running',
    endpoints: {
      POST: '/api/research',
      accepts: {
        query: 'string (required)',
        sources: 'string[] (optional)',
        depth: 'light | medium | deep (optional)'
      }
    },
    real: true,
    backend: 'axios + cheerio (no Puppeteer needed)',
    sources: ['DuckDuckGo HTML', 'Wikipedia API', 'Direct site scraping']
  });
}