import React, { useState } from 'react';
import { Rocket, Package, Target, Sparkles } from 'lucide-react';

/**
 * ProductInputSection - Generate Sales Sage resources based on product information
 * Features:
 * - Product data collection interface
 * - Make.com webhook integration for resource generation
 * - Real-time generation status feedback
 * - Professional dark theme styling
 */

const ProductInputSection = ({ customerId, onProductSubmit }) => {
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    targetMarket: '',
    keyFeatures: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    // Call Make.com webhook to generate resources
    try {
      // Use the Make.com webhook ID we have configured
      const webhookUrl = 'https://hook.us1.make.com/o7yrkxd4u8vqne9c5eqhb6e8dmh4d4fg'; // H&S Revenue Intelligence Platform Webhook
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: customerId || 'CUST_DOTUN_01',
          productData: productData,
          action: 'generate_sales_sage_resources',
          timestamp: new Date().toISOString(),
          requestType: 'sales_sage_generation'
        })
      });
      
      if (response.ok) {
        onProductSubmit(productData);
        // Store in localStorage for persistence
        localStorage.setItem('pendingSalesSageGeneration', JSON.stringify({
          productData,
          customerId,
          timestamp: Date.now()
        }));
        alert('🎉 Resources are being generated! Check the Resource Library in 2-3 minutes.');
        // Clear form after successful submission
        setProductData({
          productName: '',
          productDescription: '',
          targetMarket: '',
          keyFeatures: ''
        });
      } else {
        throw new Error('Webhook response not ok');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      alert('⚠️ Generation failed. Please try again or contact support.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isFormValid = productData.productName && productData.productDescription && 
                     productData.targetMarket && productData.keyFeatures;

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Generate Sales Sage Resources
          </h3>
          <p className="text-sm text-gray-400">Create AI-powered sales materials for your product</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Package className="w-4 h-4 inline mr-1" />
            Product Name
          </label>
          <input
            type="text"
            value={productData.productName}
            onChange={(e) => setProductData({...productData, productName: e.target.value})}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="e.g., AI-Powered Sales Assistant"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Target className="w-4 h-4 inline mr-1" />
            Target Market
          </label>
          <input
            type="text"
            value={productData.targetMarket}
            onChange={(e) => setProductData({...productData, targetMarket: e.target.value})}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="e.g., B2B SaaS Companies"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Product Description
        </label>
        <textarea
          value={productData.productDescription}
          onChange={(e) => setProductData({...productData, productDescription: e.target.value})}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
          rows={3}
          placeholder="Describe what your product does and how it helps customers..."
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Sparkles className="w-4 h-4 inline mr-1" />
          Key Features
        </label>
        <textarea
          value={productData.keyFeatures}
          onChange={(e) => setProductData({...productData, keyFeatures: e.target.value})}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
          rows={2}
          placeholder="List 3-5 key features that differentiate your product..."
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isGenerating || !isFormValid}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Generating Resources...
          </>
        ) : (
          <>
            <Rocket className="w-5 h-5" />
            Generate Sales Resources
          </>
        )}
      </button>
      
      {!isFormValid && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Please fill in all fields to generate resources
        </p>
      )}
    </div>
  );
};

export default ProductInputSection;