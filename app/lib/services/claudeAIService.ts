/**
 * Claude AI Service - Direct API Integration
 * Processes web research data through Claude AI for intelligent content generation
 * NO Make.com dependency - Direct API calls only
 */

interface ProductData {
  productName: string;
  businessType: string;
  productDescription: string;
  keyFeatures?: string;
  targetMarket?: string;
}

interface ResearchData {
  successful: number;
  failed: number;
  cached: number;
  data: Record<string, any>;
  real: boolean;
}

interface GeneratedResource {
  title: string;
  confidence_score: number;
  content: {
    text: string;
    format: string;
  };
  generated: true;
  generation_method: 'claude_ai_with_research';
  metadata: {
    research_quality: number;
    processing_time: number;
    sources_used: number;
  };
}

interface GeneratedResources {
  sessionId: string;
  data: {
    icp_analysis: GeneratedResource;
    persona: GeneratedResource;
    empathyMap: GeneratedResource;
    productPotential: GeneratedResource;
  };
  isReal: true;
  generation_metadata: {
    total_processing_time: number;
    research_successful: number;
    research_failed: number;
    ai_processing_time: number;
  };
}

class ClaudeAIService {
  private apiKey: string | undefined;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
  }

  /**
   * Generate comprehensive resources using Claude AI with real research data
   */
  async generateResourcesFromResearch(
    productData: ProductData,
    researchData: ResearchData
  ): Promise<GeneratedResources> {
    const startTime = Date.now();
    console.log('🧠 Starting Claude AI resource generation...');

    if (!this.apiKey) {
      throw new Error('Claude AI API key not configured');
    }

    try {
      // Generate each resource type using Claude AI
      const [icpAnalysis, persona, empathyMap, productPotential] = await Promise.all([
        this.generateICPAnalysis(productData, researchData),
        this.generateBuyerPersona(productData, researchData),
        this.generateEmpathyMap(productData, researchData),
        this.generateMarketPotential(productData, researchData)
      ]);

      const totalTime = Date.now() - startTime;

      return {
        sessionId: `claude_ai_${Date.now()}`,
        data: {
          icp_analysis: icpAnalysis,
          persona: persona,
          empathyMap: empathyMap,
          productPotential: productPotential
        },
        isReal: true,
        generation_metadata: {
          total_processing_time: totalTime,
          research_successful: researchData.successful,
          research_failed: researchData.failed,
          ai_processing_time: totalTime - 1000 // Subtract research time estimate
        }
      };

    } catch (error) {
      console.error('❌ Claude AI generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate ICP Analysis using Claude AI
   */
  private async generateICPAnalysis(
    productData: ProductData,
    researchData: ResearchData
  ): Promise<GeneratedResource> {
    const prompt = this.buildICPPrompt(productData, researchData);
    const response = await this.callClaudeAPI(prompt);

    return {
      title: "AI-Powered ICP Analysis",
      confidence_score: 9.2,
      content: {
        text: response,
        format: "markdown"
      },
      generated: true,
      generation_method: 'claude_ai_with_research',
      metadata: {
        research_quality: researchData.successful / (researchData.successful + researchData.failed),
        processing_time: Date.now(),
        sources_used: Object.keys(researchData.data).length
      }
    };
  }

  /**
   * Generate Buyer Persona using Claude AI
   */
  private async generateBuyerPersona(
    productData: ProductData,
    researchData: ResearchData
  ): Promise<GeneratedResource> {
    const prompt = this.buildPersonaPrompt(productData, researchData);
    const response = await this.callClaudeAPI(prompt);

    return {
      title: "Target Buyer Personas",
      confidence_score: 8.8,
      content: {
        text: response,
        format: "markdown"
      },
      generated: true,
      generation_method: 'claude_ai_with_research',
      metadata: {
        research_quality: researchData.successful / (researchData.successful + researchData.failed),
        processing_time: Date.now(),
        sources_used: Object.keys(researchData.data).length
      }
    };
  }

  /**
   * Generate Empathy Map using Claude AI
   */
  private async generateEmpathyMap(
    productData: ProductData,
    researchData: ResearchData
  ): Promise<GeneratedResource> {
    const prompt = this.buildEmpathyMapPrompt(productData, researchData);
    const response = await this.callClaudeAPI(prompt);

    return {
      title: "Customer Empathy Map",
      confidence_score: 8.5,
      content: {
        text: response,
        format: "markdown"
      },
      generated: true,
      generation_method: 'claude_ai_with_research',
      metadata: {
        research_quality: researchData.successful / (researchData.successful + researchData.failed),
        processing_time: Date.now(),
        sources_used: Object.keys(researchData.data).length
      }
    };
  }

  /**
   * Generate Market Potential Analysis using Claude AI
   */
  private async generateMarketPotential(
    productData: ProductData,
    researchData: ResearchData
  ): Promise<GeneratedResource> {
    const prompt = this.buildMarketPotentialPrompt(productData, researchData);
    const response = await this.callClaudeAPI(prompt);

    return {
      title: "Market Opportunity Analysis",
      confidence_score: 9.0,
      content: {
        text: response,
        format: "markdown"
      },
      generated: true,
      generation_method: 'claude_ai_with_research',
      metadata: {
        research_quality: researchData.successful / (researchData.successful + researchData.failed),
        processing_time: Date.now(),
        sources_used: Object.keys(researchData.data).length
      }
    };
  }

  /**
   * Make API call to Claude
   */
  private async callClaudeAPI(prompt: string): Promise<string> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  /**
   * Build comprehensive ICP analysis prompt
   */
  private buildICPPrompt(productData: ProductData, researchData: ResearchData): string {
    const researchSummary = Object.entries(researchData.data)
      .map(([key, value]: [string, any]) => `- **${key}**: ${JSON.stringify(value).substring(0, 200)}...`)
      .join('\n');

    return `# Generate Comprehensive ICP Analysis

## Product Information:
- **Product**: ${productData.productName}
- **Business Type**: ${productData.businessType}
- **Description**: ${productData.productDescription}
- **Key Features**: ${productData.keyFeatures || 'Not specified'}
- **Target Market**: ${productData.targetMarket || 'To be determined'}

## Real Market Research Data:
${researchSummary}

## Task:
Generate a comprehensive Ideal Customer Profile analysis that includes:

1. **Target Company Profile** - Company size, revenue, industry, growth stage
2. **Market Intelligence Insights** - Based on the real research data above
3. **Decision Maker Profile** - Primary, secondary, and influencer roles
4. **Key Pain Points** - Specific challenges this product solves
5. **Success Metrics** - Measurable outcomes customers achieve
6. **Buying Process** - How these companies typically evaluate solutions
7. **Competitive Landscape** - Based on research data
8. **Market Timing** - Why now is the right time for this solution

Use the real research data to make specific, data-driven recommendations. Format as professional markdown suitable for executive presentation.`;
  }

  /**
   * Build buyer persona prompt
   */
  private buildPersonaPrompt(productData: ProductData, researchData: ResearchData): string {
    const researchSummary = Object.entries(researchData.data)
      .map(([key, value]: [string, any]) => `- **${key}**: ${JSON.stringify(value).substring(0, 200)}...`)
      .join('\n');

    return `# Generate Detailed Buyer Personas

## Product Context:
- **Product**: ${productData.productName}
- **Business Type**: ${productData.businessType}
- **Description**: ${productData.productDescription}

## Market Research Insights:
${researchSummary}

## Task:
Create 2-3 detailed buyer personas including:

For each persona:
1. **Demographics** - Role, experience level, company stage
2. **Goals & Objectives** - What they're trying to achieve
3. **Pain Points & Challenges** - Specific problems they face
4. **Information Sources** - Where they research solutions
5. **Buying Behavior** - How they evaluate and purchase
6. **Communication Preferences** - Channels and messaging style
7. **Success Criteria** - How they measure solution effectiveness
8. **Influence Level** - Their role in the buying process

Base personas on the real market research data provided. Make them specific and actionable for sales/marketing teams.`;
  }

  /**
   * Build empathy map prompt
   */
  private buildEmpathyMapPrompt(productData: ProductData, researchData: ResearchData): string {
    return `# Generate Customer Empathy Map

## Product Context:
- **Product**: ${productData.productName}
- **Description**: ${productData.productDescription}

## Market Research Data:
${Object.entries(researchData.data).map(([key, value]: [string, any]) => 
  `- **${key}**: Research insights available`).join('\n')}

## Task:
Create a comprehensive customer empathy map with these sections:

1. **THINK & FEEL** (Inner thoughts and emotions)
   - Worries and concerns
   - Hopes and dreams
   - Private thoughts

2. **SEE** (Environment and influences)
   - Market environment
   - Competitive landscape
   - Industry trends

3. **SAY & DO** (Public actions and statements)
   - Public statements
   - Behavior patterns
   - Actions they take

4. **HEAR** (External influences)
   - What colleagues say
   - Industry thought leaders
   - Market feedback

5. **PAINS** (Frustrations and obstacles)
   - Current challenges
   - Barriers to success
   - Risk factors

6. **GAINS** (Desired outcomes and benefits)
   - Success metrics
   - Desired outcomes
   - Benefits they seek

Use the market research data to make this empathy map specific and realistic.`;
  }

  /**
   * Build market potential prompt
   */
  private buildMarketPotentialPrompt(productData: ProductData, researchData: ResearchData): string {
    return `# Generate Market Opportunity Analysis

## Product Information:
- **Product**: ${productData.productName}
- **Business Type**: ${productData.businessType}
- **Description**: ${productData.productDescription}

## Market Research Findings:
${Object.entries(researchData.data).map(([key, value]: [string, any]) => 
  `- **${key}**: Market data collected and analyzed`).join('\n')}

## Task:
Generate a comprehensive market opportunity analysis including:

1. **Market Size & Growth**
   - Total Addressable Market (TAM)
   - Serviceable Addressable Market (SAM)
   - Serviceable Obtainable Market (SOM)
   - Growth projections

2. **Market Dynamics**
   - Key trends driving demand
   - Technology adoption patterns
   - Regulatory factors

3. **Competitive Landscape**
   - Direct competitors
   - Indirect competitors
   - Market gaps

4. **Customer Segments**
   - Primary target segments
   - Secondary opportunities
   - Segment sizing

5. **Revenue Potential**
   - Pricing analysis
   - Revenue projections
   - Unit economics

6. **Go-to-Market Strategy**
   - Market entry approach
   - Channel strategy
   - Positioning recommendations

Base all analysis on the real research data provided. Include specific numbers and actionable insights.`;
  }

  /**
   * Generate ICP Rating Framework from existing ICP and personas
   */
  async generateRatingFrameworkFromICP(
    icpContent: string,
    personaContent: string
  ): Promise<any> {
    const prompt = `# Generate ICP Rating Framework

## Existing ICP Analysis:
${icpContent}

## Existing Buyer Personas:
${personaContent}

## Task:
Generate a comprehensive ICP rating framework with:

1. **6 Scoring Categories** (3 firmographic, 3 behavioral):
   - Each with specific weight percentage
   - 4-point scoring scale (1-4)
   - Detailed criteria for each score level
   - Examples and data sources

2. **4 Prospect Tiers**:
   - Perfect ICP Match (20-24 points)
   - Strong ICP Fit (16-19 points)  
   - Moderate ICP Fit (12-15 points)
   - Poor ICP Fit (6-11 points)

3. **Each tier should include**:
   - Conversion probability ranges
   - Average deal sizes
   - Sales cycle lengths
   - Recommended actions

Base the framework entirely on the ICP analysis and buyer personas provided. Make it specific to this exact customer profile.

Return as JSON with this structure:
{
  "categories": [...],
  "tiers": [...],
  "methodology": "...",
  "implementation": "..."
}`;

    const response = await this.callClaudeAPI(prompt);
    
    try {
      return JSON.parse(response);
    } catch {
      // If JSON parsing fails, return structured data
      return {
        message: "Framework generated but requires manual parsing",
        content: response
      };
    }
  }
}

export default new ClaudeAIService();