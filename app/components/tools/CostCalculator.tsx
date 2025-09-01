'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react';

interface CostCalculatorProps {
  initialData?: any;
  onCostCalculated?: (result: CostCalculationResult) => void;
  customerData?: any;
}

interface CostCalculationResult {
  currentCost: number;
  futureCost: number;
  savings: number;
  roi: number;
  paybackPeriod: number;
}

const CostCalculator: React.FC<CostCalculatorProps> = ({
  initialData,
  onCostCalculated,
  customerData
}) => {
  const [formData, setFormData] = useState({
    currentRevenue: '',
    targetGrowthRate: '20',
    averageDealSize: '',
    salesCycleLength: '90',
    conversionRate: '15',
    churnRate: '5',
    timeframe: '12'
  });

  const [showResults, setShowResults] = useState(false);

  const calculations = useMemo((): CostCalculationResult | null => {
    const revenue = parseFloat(formData.currentRevenue) || 0;
    const dealSize = parseFloat(formData.averageDealSize) || 0;
    const conversionRate = parseFloat(formData.conversionRate) / 100 || 0.15;
    const growthRate = parseFloat(formData.targetGrowthRate) / 100 || 0.2;
    
    if (revenue === 0 || dealSize === 0) return null;

    const currentCost = revenue * 0.12; // 12% inefficiency
    const futureCost = revenue * (1 + growthRate) * 0.08; // Reduced to 8%
    const savings = currentCost - futureCost;
    const roi = (savings / (dealSize * 2)) * 100; // Investment is 2x avg deal
    const paybackPeriod = (dealSize * 2) / (savings / 12); // Months

    return {
      currentCost: Math.round(currentCost),
      futureCost: Math.round(futureCost),
      savings: Math.round(savings),
      roi: Math.round(roi),
      paybackPeriod: Math.round(paybackPeriod)
    };
  }, [formData]);

  const handleCalculate = () => {
    if (calculations) {
      setShowResults(true);
      if (onCostCalculated) {
        onCostCalculated(calculations);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Cost of Inaction Calculator</h2>
        </div>
        <p className="text-gray-400">Calculate the financial impact of delayed decisions</p>
      </div>

      {/* Input Form */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Business Metrics</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Annual Revenue ($)
            </label>
            <input
              type="number"
              value={formData.currentRevenue}
              onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="1000000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Average Deal Size ($)
            </label>
            <input
              type="number"
              value={formData.averageDealSize}
              onChange={(e) => handleInputChange('averageDealSize', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Growth Rate (%)
            </label>
            <input
              type="number"
              value={formData.targetGrowthRate}
              onChange={(e) => handleInputChange('targetGrowthRate', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sales Cycle Length (days)
            </label>
            <input
              type="number"
              value={formData.salesCycleLength}
              onChange={(e) => handleInputChange('salesCycleLength', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="90"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Conversion Rate (%)
            </label>
            <input
              type="number"
              value={formData.conversionRate}
              onChange={(e) => handleInputChange('conversionRate', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="15"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Analysis Timeframe (months)
            </label>
            <input
              type="number"
              value={formData.timeframe}
              onChange={(e) => handleInputChange('timeframe', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="12"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!calculations}
          className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Cost of Inaction
        </button>
      </div>

      {/* Results */}
      {showResults && calculations && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Cost Analysis Results</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-sm text-gray-400">Current Cost</span>
              </div>
              <div className="text-2xl font-bold text-red-400">
                ${calculations.currentCost.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">Annual inefficiency cost</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Potential Savings</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                ${calculations.savings.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">Annual opportunity</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">ROI</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {calculations.roi}%
              </div>
              <p className="text-xs text-gray-500 mt-1">Return on investment</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-white mb-1">Cost of Delay Impact</h4>
                <p className="text-sm text-gray-300">
                  Every month of delay costs your organization approximately{' '}
                  <span className="font-bold text-red-400">
                    ${Math.round(calculations.savings / 12).toLocaleString()}
                  </span>{' '}
                  in missed opportunities and inefficiencies.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Expected payback period: <span className="font-medium text-white">{calculations.paybackPeriod} months</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;