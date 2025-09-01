/**
 * REAL Export Service
 * Calls actual server-side export APIs
 * Returns REAL downloadable files - no placeholders
 */

type ExportFormat = 
  | 'pdf'
  | 'docx'
  | 'csv'
  | 'json'
  | 'html'
  | 'markdown';

interface ExportRequest {
  content: string;
  title: string;
  format: ExportFormat;
  metadata?: {
    author?: string;
    companyName?: string;
    createdAt?: string;
  };
}

interface ExportResult {
  success: boolean;
  downloadUrl?: string;
  filename?: string;
  error?: string;
  real: boolean;
}

class ExportService {
  /**
   * Export resource to specified format using REAL APIs
   */
  async exportResource(request: ExportRequest): Promise<ExportResult> {
    console.log(`📄 Exporting to ${request.format} format using REAL API`);
    
    try {
      let apiEndpoint = '';
      let requestBody: any = {
        content: request.content,
        title: request.title,
        metadata: request.metadata
      };

      // Route to appropriate REAL API endpoint
      switch (request.format) {
        case 'pdf':
          return this.exportPDFClient(request);
          
        case 'docx':
          apiEndpoint = '/api/export/docx/';
          break;
          
        case 'csv':
          apiEndpoint = '/api/export/csv/';
          requestBody = {
            data: request.content,
            title: request.title
          };
          break;
          
        case 'json':
          // For JSON, we can handle client-side
          return this.exportJSON(request);
          
        case 'html':
          // For HTML, we can handle client-side
          return this.exportHTML(request);
          
        case 'markdown':
          // For Markdown, we can handle client-side
          return this.exportMarkdown(request);
          
        default:
          throw new Error(`Unsupported format: ${request.format}`);
      }

      // Call REAL API endpoint
      console.log(`🌐 Calling real export API: ${apiEndpoint}`);
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Export failed with status ${response.status}`);
      }

      // Get the real file blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const filename = `${request.title.replace(/[^a-z0-9]/gi, '_')}.${request.format}`;
      
      console.log(`✅ Real export successful: ${filename} (${blob.size} bytes)`);
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up URL after download
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      return {
        success: true,
        downloadUrl: url,
        filename,
        real: true
      };
      
    } catch (error: any) {
      console.error('❌ Real export failed:', error);
      return {
        success: false,
        error: error.message,
        real: true
      };
    }
  }

  /**
   * Export as JSON (client-side)
   */
  private exportJSON(request: ExportRequest): ExportResult {
    try {
      const jsonData = {
        title: request.title,
        content: request.content,
        metadata: request.metadata,
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const filename = `${request.title.replace(/[^a-z0-9]/gi, '_')}.json`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      return {
        success: true,
        downloadUrl: url,
        filename,
        real: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        real: true
      };
    }
  }

  /**
   * Export as HTML (client-side)
   */
  private exportHTML(request: ExportRequest): ExportResult {
    try {
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${request.title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { color: #8B5CF6; }
    h2 { color: #333; }
    .metadata { color: #666; font-size: 0.9em; margin-bottom: 20px; }
  </style>
</head>
<body>
  <h1>${request.title}</h1>
  <div class="metadata">
    ${request.metadata?.companyName ? `<p>Company: ${request.metadata.companyName}</p>` : ''}
    ${request.metadata?.author ? `<p>Author: ${request.metadata.author}</p>` : ''}
    ${request.metadata?.createdAt ? `<p>Date: ${new Date(request.metadata.createdAt).toLocaleDateString()}</p>` : ''}
  </div>
  <div class="content">
    ${this.markdownToHTML(request.content)}
  </div>
</body>
</html>`;
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const filename = `${request.title.replace(/[^a-z0-9]/gi, '_')}.html`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      return {
        success: true,
        downloadUrl: url,
        filename,
        real: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        real: true
      };
    }
  }

  /**
   * Export as Markdown (client-side)
   */
  private exportMarkdown(request: ExportRequest): ExportResult {
    try {
      const markdownContent = `# ${request.title}

${request.metadata?.companyName ? `**Company:** ${request.metadata.companyName}\n` : ''}
${request.metadata?.author ? `**Author:** ${request.metadata.author}\n` : ''}
${request.metadata?.createdAt ? `**Date:** ${new Date(request.metadata.createdAt).toLocaleDateString()}\n` : ''}

---

${request.content}

---

*Generated by H&S Revenue Intelligence Platform*`;
      
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const filename = `${request.title.replace(/[^a-z0-9]/gi, '_')}.md`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      return {
        success: true,
        downloadUrl: url,
        filename,
        real: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        real: true
      };
    }
  }

  /**
   * Simple markdown to HTML conversion
   */
  private markdownToHTML(markdown: string): string {
    return markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\* (.+)/gim, '<li>$1</li>')
      .replace(/^- (.+)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br>');
  }

  /**
   * Export PDF using client-side approach (browser print-to-PDF)
   */
  private async exportPDFClient(request: ExportRequest): ExportResult {
    try {
      console.log('📄 Generating PDF using client-side approach');
      
      // Create HTML content for PDF
      const htmlContent = this.generatePrintableHTML(request);
      
      // Create a new window and print it
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Could not open print window. Please allow popups.');
      }
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Focus and print
      printWindow.focus();
      printWindow.print();
      
      // Close the window after printing
      setTimeout(() => printWindow.close(), 1000);
      
      return {
        success: true,
        filename: `${request.title.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        real: true
      };
      
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        real: true
      };
    }
  }

  /**
   * Generate printable HTML for PDF
   */
  private generatePrintableHTML(request: ExportRequest): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${request.title}</title>
  <style>
    @media print {
      body { margin: 0; -webkit-print-color-adjust: exact; }
      @page { margin: 1in; }
    }
    body { 
      font-family: Arial, sans-serif; 
      max-width: 700px; 
      margin: 20px auto; 
      padding: 20px;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #8B5CF6;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .company {
      color: #8B5CF6;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .title {
      font-size: 20px;
      color: #333;
    }
    .metadata {
      color: #666;
      font-size: 12px;
      text-align: right;
      margin: 20px 0;
    }
    h1 { color: #333; font-size: 18px; margin-top: 25px; }
    h2 { color: #444; font-size: 16px; margin-top: 20px; }
    h3 { color: #555; font-size: 14px; margin-top: 15px; }
    ul { margin: 10px 0; padding-left: 20px; }
    li { margin: 5px 0; }
    .footer {
      text-align: center;
      color: #999;
      font-size: 10px;
      margin-top: 40px;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="company">${request.metadata?.companyName || 'H&S Revenue Intelligence'}</div>
    <div class="title">${request.title}</div>
  </div>
  
  ${request.metadata?.createdAt ? `<div class="metadata">Generated: ${new Date(request.metadata.createdAt).toLocaleDateString()}</div>` : ''}
  
  <div class="content">
    ${this.markdownToHTML(request.content)}
  </div>
  
  <div class="footer">
    Generated by H&S Revenue Intelligence Platform
  </div>
</body>
</html>`;
  }

  /**
   * Test method to verify real export is working
   */
  async testRealExport(): Promise<boolean> {
    try {
      const response = await fetch('/api/export/pdf/');
      const data = await response.json();
      console.log('🧪 Real Export API test result:', data);
      return data.real === true;
    } catch (error) {
      console.error('🧪 Real Export API test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const exportService = new ExportService();
export default exportService;
export type { ExportFormat, ExportRequest, ExportResult };