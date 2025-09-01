'use client';

import React from 'react';
import { Download, FileText, Mail, Share2 } from 'lucide-react';
import ICPDisplay from './ICPDisplay';

interface ICPDisplayWithExportProps {
  initialData?: any;
  companyName?: string;
  onICPComplete?: (data: any) => void;
  customerData?: any;
}

const ICPDisplayWithExport: React.FC<ICPDisplayWithExportProps> = (props) => {
  const [exportData, setExportData] = React.useState<any>(null);

  const handleICPComplete = (data: any) => {
    setExportData(data);
    if (props.onICPComplete) {
      props.onICPComplete(data);
    }
  };

  const exportFormats = [
    { id: 'pdf', label: 'Export as PDF', icon: FileText },
    { id: 'email', label: 'Email Report', icon: Mail },
    { id: 'crm', label: 'Send to CRM', icon: Share2 },
    { id: 'csv', label: 'Download CSV', icon: Download }
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}:`, exportData);
    // Implementation would go here
    alert(`Export to ${format} initiated!`);
  };

  return (
    <div className="space-y-6">
      <ICPDisplay {...props} onICPComplete={handleICPComplete} />
      
      {exportData && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Export Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              return (
                <button
                  key={format.id}
                  onClick={() => handleExport(format.id)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-6 h-6 text-blue-400" />
                  <span className="text-sm text-gray-300">{format.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ICPDisplayWithExport;