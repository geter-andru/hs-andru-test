'use client';

import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Star, Send } from 'lucide-react';

interface FeedbackItem {
  id: string;
  competencyArea: string;
  rating: number;
  feedback: string;
  improvement: string;
  date: string;
}

interface CompetencyFeedbackProps {
  customerId?: string;
  onFeedbackSubmit?: (feedback: FeedbackItem) => void;
}

const CompetencyFeedback: React.FC<CompetencyFeedbackProps> = ({
  customerId,
  onFeedbackSubmit
}) => {
  const [selectedArea, setSelectedArea] = useState('customer_intelligence');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [improvement, setImprovement] = useState('');

  const competencyAreas = [
    { id: 'customer_intelligence', name: 'Customer Intelligence' },
    { id: 'revenue_operations', name: 'Revenue Operations' },
    { id: 'technical_translation', name: 'Technical Translation' },
    { id: 'market_intelligence', name: 'Market Intelligence' }
  ];

  const handleSubmit = () => {
    if (onFeedbackSubmit && rating > 0) {
      const feedbackItem: FeedbackItem = {
        id: Date.now().toString(),
        competencyArea: selectedArea,
        rating,
        feedback,
        improvement,
        date: new Date().toISOString()
      };
      onFeedbackSubmit(feedbackItem);
      
      // Reset form
      setRating(0);
      setFeedback('');
      setImprovement('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-7 h-7" />
          Competency Feedback
        </h2>
        <p className="text-gray-400 mt-1">Share your experience and improvement suggestions</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Competency Area
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              {competencyAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Overall Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              rows={3}
              placeholder="Share your thoughts on this competency area..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Suggested Improvements
            </label>
            <textarea
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              rows={3}
              placeholder="What could be improved in this area?"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetencyFeedback;