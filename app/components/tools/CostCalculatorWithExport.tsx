'use client';

import React, { useState } from 'react';
import { Download, FileText, Mail, Share2, Presentation } from 'lucide-react';
import CostCalculator from './CostCalculator';

interface CostCalculatorWithExportProps {
  initialData?: any;
  onCostCalculated?: (result: any) => void;
  customerData?: any;
}

const CostCalculatorWithExport: React.FC<CostCalculatorWithExportProps> = (props) => {
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const handleCostCalculated = (result: any) => {
    setCalculationResult(result);
    if (props.onCostCalculated) {
      props.onCostCalculated(result);
    }
  };

  const exportFormats = [
    { id: 'pdf', label: 'Executive Summary', icon: FileText, description: 'PDF report for C-suite' },
    { id: 'ppt', label: 'Board Presentation', icon: Presentation, description: 'PowerPoint deck' },
    { id: 'email', label: 'Email CFO', icon: Mail, description: 'Send financial analysis' },
    { id: 'crm', label: 'Update CRM', icon: Share2, description: 'Sync to Salesforce' },
    { id: 'csv', label: 'Raw Data', icon: Download, description: 'Excel spreadsheet' }
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting cost analysis as ${format}:`, calculationResult);
    
    // Simulate export process
    const exportMessages: Record<string, string> = {
      pdf: 'Generating executive PDF summary...',
      ppt: 'Creating board presentation deck...',
      email: 'Preparing CFO email with analysis...',
      crm: 'Updating opportunity in Salesforce...',
      csv: 'Downloading calculation spreadsheet...'
    };
    
    alert(exportMessages[format] || 'Export initiated!');
  };

  return (
    <div className="space-y-6">
      <CostCalculator {...props} onCostCalculated={handleCostCalculated} />
      
      {calculationResult && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Export & Share Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              return (
                <button
                  key={format.id}
                  onClick={() => handleExport(format.id)}
                  className="flex items-start gap-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors text-left"
                >
                  <Icon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">{format.label}</div>
                    <div className="text-sm text-gray-400 mt-0.5">{format.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
            <p className="text-sm text-blue-300">
              💡 <strong>Pro Tip:</strong> Export to PowerPoint for your next board meeting, or send directly to your CFO via email with one click.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculatorWithExport;