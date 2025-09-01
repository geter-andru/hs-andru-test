import type { NextConfig } from "next";

// Bundle analyzer setup
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Temporarily disable static export for testing (API routes removed, using direct service calls)
  // output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Trailing slash for static hosting
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Base path configuration (empty for root deployment)
  basePath: '',
  
  // Asset prefix for CDN
  assetPrefix: '',
  
  // Production optimizations
  productionBrowserSourceMaps: false, // Remove source maps in production
  
  // Disable TypeScript checking during build for staging
  typescript: {
    ignoreBuildErrors: true
  },
  
  // Disable ESLint during build for staging
  eslint: {
    ignoreDuringBuilds: true
  },
  
  // Experimental features for better Netlify compatibility
  experimental: {
    esmExternals: true
  },
  
  // Webpack optimizations for bundle size
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        
        // Better chunk splitting
        splitChunks: {
          ...config.optimization?.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        
        // Remove unused code
        minimizer: config.optimization.minimizer,
      };
    }
    
    // Don't bundle dev dependencies
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Exclude dev-only packages from client bundle
        '@tanstack/react-query-devtools': false,
      };
    }
    
    return config;
  },
  
  // Headers configuration for development
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.airtable.com https://hook.us1.make.com https://molcqjsqtjbfclasynpg.supabase.co;"
          }
        ]
      }
    ]
  }
};

export default withBundleAnalyzer(nextConfig);
