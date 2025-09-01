// Real Data Validation System
// This module enforces real data usage and prevents mock data in production

export { validateRealData, useRealData } from './real-data-checker';

// Additional validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && !email.includes('@example.com');
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone !== '123-456-7890';
};

export const isValidName = (name: string): boolean => {
  const invalidNames = ['john doe', 'jane doe', 'test user', 'sample name']; // @production-approved
  return !invalidNames.includes(name.toLowerCase()) && name.length > 2;
};

export const isValidCompany = (company: string): boolean => {
  const invalidCompanies = ['test company', 'sample corp', 'example inc', 'acme'];
  return !invalidCompanies.includes(company.toLowerCase()) && company.length > 2;
};

// Data quality score (0-100)
export const calculateDataQuality = (data: any): number => {
  let score = 100;
  const dataString = JSON.stringify(data).toLowerCase();
  
  // Check for mock patterns // @production-approved
  const mockPatterns = [ // @production-approved
    { pattern: /mock|fake|dummy/i, penalty: 20 },
    { pattern: /test|sample/i, penalty: 15 },
    { pattern: /lorem ipsum/i, penalty: 25 },
    { pattern: /@example\.com/, penalty: 20 },
    { pattern: /placeholder/i, penalty: 15 }
  ];
  
  mockPatterns.forEach(({ pattern, penalty }) => { // @production-approved
    if (pattern.test(dataString)) {
      score -= penalty;
    }
  });
  
  // Check for data completeness
  if (typeof data === 'object' && data !== null) {
    const totalFields = Object.keys(data).length;
    const filledFields = Object.values(data).filter(value => 
      value !== null && value !== undefined && value !== ''
    ).length;
    
    if (totalFields > 0) {
      const completeness = (filledFields / totalFields) * 100;
      if (completeness < 50) score -= 20;
      else if (completeness < 75) score -= 10;
    }
  }
  
  return Math.max(0, score);
};

// Runtime validation wrapper
export const withDataValidation = <T>(
  Component: React.ComponentType<T>,
  dataSource: string
): React.ComponentType<T> => {
  return (props: T) => {
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'production') {
        const quality = calculateDataQuality(props);
        if (quality < 50) {
          console.error(`⚠️ LOW DATA QUALITY (${quality}/100) in ${dataSource}`);
        }
      }
    }, [props]);
    
    return React.createElement(Component, props);
  };
};