'use client'

import React from 'react';

const MilestoneTrackerWidget: React.FC = () => {
  const milestones = [
    { id: 1, title: 'ICP Analysis Complete', progress: 100, status: 'completed' },
    { id: 2, title: 'Cost Calculator', progress: 75, status: 'in-progress' },
    { id: 3, title: 'Business Case', progress: 0, status: 'pending' }
  ];

  return (
    <div className="space-y-3">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white truncate">
              {milestone.title}
            </span>
            <span className="text-xs text-gray-400 ml-2">
              {milestone.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                milestone.status === 'completed'
                  ? 'bg-green-500'
                  : milestone.status === 'in-progress'
                  ? 'bg-purple-500'
                  : 'bg-gray-600'
              }`}
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MilestoneTrackerWidget;