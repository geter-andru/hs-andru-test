import dotenv from 'dotenv';

// Load environment-specific .env file
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

const config = {
  // Server Configuration
  server: {
    port: parseInt(process.env.PORT) || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // Airtable Configuration
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY,
    baseId: process.env.AIRTABLE_BASE_ID,
    tables: {
      customerAssets: process.env.AIRTABLE_CUSTOMER_ASSETS_TABLE || 'Customer Assets',
      userProgress: process.env.AIRTABLE_USER_PROGRESS_TABLE || 'User Progress',
    },
  },


  // Security Configuration
  security: {
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
      strictMax: parseInt(process.env.RATE_LIMIT_STRICT_MAX) || 20,
    },
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/hs-platform-api.log',
    format: process.env.LOG_FORMAT || 'combined',
  },

  // Development/Testing Configuration
  development: {
    enableTestEndpoints: process.env.ENABLE_TEST_ENDPOINTS === 'true',
    testCustomerId: process.env.TEST_CUSTOMER_ID || 'CUST_0001',
  },
};

// Validation for required environment variables
const requiredEnvVars = [
  'AIRTABLE_API_KEY',
  'AIRTABLE_BASE_ID',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Required environment variable ${envVar} is not set`);
  }
}

export default config;