'use client';

import React, { useState } from 'react';
import { Award, TrendingUp, Target, Users, BarChart3, Calendar } from 'lucide-react';

interface CompetencyDashboardProps {
  customerId?: string;
  competencyData?: any;
}

const CompetencyDashboard: React.FC<CompetencyDashboardProps> = ({
  customerId,
  competencyData
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const competencyAreas = [
    { name: 'Customer Intelligence', current: 75, target: 90, trend: 'up' },
    { name: 'Revenue Operations', current: 60, target: 85, trend: 'up' },
    { name: 'Technical Translation', current: 85, target: 95, trend: 'stable' },
    { name: 'Market Intelligence', current: 70, target: 80, trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="w-7 h-7" />
          Competency Dashboard
        </h2>
        <p className="text-gray-400 mt-1">Track your professional development progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {competencyAreas.map((area) => (
          <div key={area.name} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="font-medium text-white text-sm mb-3">{area.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current</span>
                <span className="text-blue-400 font-medium">{area.current}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${area.current}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Target: {area.target}%</span>
                <TrendingUp className="w-3 h-3 text-green-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetencyDashboard;