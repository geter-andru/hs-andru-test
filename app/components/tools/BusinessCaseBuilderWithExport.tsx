'use client';

import React, { useState } from 'react';
import { Download, FileText, Mail, Presentation, Printer, Globe } from 'lucide-react';
import BusinessCaseBuilder from './BusinessCaseBuilder';

interface BusinessCaseBuilderWithExportProps {
  initialData?: any;
  onBusinessCaseReady?: (data: any) => void;
  customerData?: any;
}

const BusinessCaseBuilderWithExport: React.FC<BusinessCaseBuilderWithExportProps> = (props) => {
  const [businessCaseData, setBusinessCaseData] = useState<any>(null);

  const handleBusinessCaseReady = (data: any) => {
    setBusinessCaseData(data);
    if (props.onBusinessCaseReady) {
      props.onBusinessCaseReady(data);
    }
  };

  const exportFormats = [
    { 
      id: 'executive-pdf', 
      label: 'Executive PDF', 
      icon: FileText, 
      description: 'One-page executive summary',
      audience: 'CEO, Board'
    },
    { 
      id: 'board-deck', 
      label: 'Board Deck', 
      icon: Presentation, 
      description: 'Full presentation deck',
      audience: 'Board meeting'
    },
    { 
      id: 'email-stakeholder', 
      label: 'Email Stakeholders', 
      icon: Mail, 
      description: 'Send to decision makers',
      audience: 'CFO, VP Sales'
    },
    { 
      id: 'print-ready', 
      label: 'Print Version', 
      icon: Printer, 
      description: 'Formatted for printing',
      audience: 'Physical meetings'
    },
    { 
      id: 'web-publish', 
      label: 'Web Version', 
      icon: Globe, 
      description: 'Shareable web link',
      audience: 'Wide distribution'
    },
    { 
      id: 'word-doc', 
      label: 'Word Document', 
      icon: Download, 
      description: 'Editable document',
      audience: 'Collaboration'
    }
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting business case as ${format}:`, businessCaseData);
    
    const exportMessages: Record<string, string> = {
      'executive-pdf': 'Generating executive summary PDF...',
      'board-deck': 'Creating board presentation deck...',
      'email-stakeholder': 'Preparing stakeholder emails...',
      'print-ready': 'Formatting print version...',
      'web-publish': 'Publishing to secure web link...',
      'word-doc': 'Generating editable Word document...'
    };
    
    alert(exportMessages[format] || 'Export initiated!');
  };

  return (
    <div className="space-y-6">
      <BusinessCaseBuilder {...props} onBusinessCaseReady={handleBusinessCaseReady} />
      
      {businessCaseData && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Export Business Case</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              return (
                <button
                  key={format.id}
                  onClick={() => handleExport(format.id)}
                  className="p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors text-left group"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-white">{format.label}</div>
                      <div className="text-sm text-gray-400 mt-0.5">{format.description}</div>
                      <div className="text-xs text-gray-500 mt-1">For: {format.audience}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
              <p className="text-sm text-green-300">
                ✅ <strong>Quick Export:</strong> Your business case is ready for immediate distribution to stakeholders.
              </p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <p className="text-sm text-blue-300">
                💡 <strong>Best Practice:</strong> Use the Board Deck for formal presentations and Executive PDF for quick reviews.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessCaseBuilderWithExport;