# H&S Platform - Next.js Frontend

## ⚠️ MANDATORY DEVELOPMENT PATTERNS ⚠️
**ALL DEVELOPERS MUST FOLLOW THE PATTERNS IN [MANDATORY_PATTERNS.md](./MANDATORY_PATTERNS.md)**

Violations will:
- ❌ Block commits
- ❌ Block builds  
- ❌ Block deployments
- ❌ Be tracked and reported

## Overview
Enterprise-grade Next.js 15 + TypeScript implementation of the H&S Revenue Intelligence Platform. This is the production-ready frontend designed for scalability and performance.

## 🎯 Status: Next.js Production Platform
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety (NO JavaScript allowed)
- **Deployment Target**: Production environment
- **Code Quality**: Enforced via automated guardrails

## Key Features
- **Enterprise Dashboard**: Advanced analytics and business intelligence
- **TypeScript Safety**: Full type coverage for robust development
- **Server-Side Rendering**: Optimized performance and SEO
- **Component Architecture**: Scalable component system
- **API Integration**: RESTful API client with React Query

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **React Query**: State management and caching
- **React Hook Form**: Form handling and validation

### Backend API
- **Node.js**: Runtime environment
- **Express**: Web framework
- **Airtable SDK**: Database integration
- **JWT**: Authentication
- **Make.com**: Automation workflows
- **Claude API**: AI-powered insights

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Airtable account and API key
- Claude API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/geter-andru/hs-andru-v1.git
   cd hs-andru-v1
   ```

2. **MANDATORY: Read the patterns guide**
   ```bash
   cat MANDATORY_PATTERNS.md  # READ THIS FIRST!
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../hs-platform-api
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:3001
   
   # Backend (.env)
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_base_id
   JWT_SECRET=your_jwt_secret
   CLAUDE_API_KEY=your_claude_api_key (optional)
   MAKE_API_TOKEN=your_make_token (optional)
   ```

### Development

1. **Start the backend server**
   ```bash
   cd hs-platform-api
   npm start
   # Server runs on http://localhost:3001
   ```

2. **Start the frontend development server**
   ```bash
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:3001/api/docs
   - Health Check: http://localhost:3001/health

### Demo Credentials
- Customer ID: `CUST_2`

## Features

### 🎯 ICP Analysis
- Multi-step customer profiling form
- AI-enhanced segment scoring
- Visual results with recommendations
- Historical analysis tracking

### 💰 Cost Calculator
- Revenue impact assessment
- Operational efficiency analysis
- Competitive disadvantage modeling
- Scenario-based projections

### 📊 Dashboard
- Real-time progress overview
- Milestone tracking
- AI-powered insights
- Quick action navigation

### 🚀 Progress Tracking
- Automated milestone detection
- Achievement notifications
- Performance analytics
- Goal setting and monitoring

## API Endpoints

### Authentication
- `POST /api/auth/token` - Generate access token
- `POST /api/auth/refresh` - Refresh token

### Customer Management
- `GET /api/customer/:id` - Get customer details
- `GET /api/customer/:id/icp` - Get ICP analysis
- `POST /api/customer/:id/generate-icp` - Generate AI ICP

### Cost Calculator
- `POST /api/cost-calculator/calculate` - Basic calculation
- `POST /api/cost-calculator/calculate-ai` - AI-enhanced calculation
- `GET /api/cost-calculator/history/:id` - Calculation history

### Business Case
- `POST /api/business-case/generate` - Generate business case
- `GET /api/business-case/templates` - Get templates
- `GET /api/business-case/:id/history` - Case history

### Progress Tracking
- `GET /api/progress/:id` - Get progress data
- `POST /api/progress/:id/track` - Track action
- `GET /api/progress/:id/milestones` - Get milestones

### Export
- `POST /api/export/icp` - Export ICP analysis
- `POST /api/export/cost-calculator` - Export calculations
- `POST /api/export/comprehensive` - Export full report

## Deployment

### Production Build
```bash
# Frontend
npm run build
npm start

# Backend
npm run build (if applicable)
npm start
```

### Environment Variables
Ensure all production environment variables are configured:
- Database credentials
- API keys
- JWT secrets
- External service tokens

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support and questions:
- Documentation: See inline code comments
- Issues: GitHub Issues tab
- Contact: [Your contact information]
