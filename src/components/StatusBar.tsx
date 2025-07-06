import React from 'react';
import { Activity, Clock, Shield, AlertTriangle } from 'lucide-react';

interface StatusBarProps {
  isConnected: boolean;
  lastSentTime: number;
  rateLimitRemaining: number;
  isLoading: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isConnected,
  lastSentTime,
  rateLimitRemaining,
  isLoading,
}) => {
  const timeSinceLastSent = lastSentTime > 0 ? Date.now() - lastSentTime : 0;
  const secondsSinceLastSent = Math.floor(timeSinceLastSent / 1000);

  return (
    <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'}`} />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${isLoading ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'}`} />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {isLoading ? 'Sending...' : 'Ready'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {lastSentTime > 0 ? `${secondsSinceLastSent}s ago` : 'Never'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {rateLimitRemaining > 10 ? (
            <Shield className="w-4 h-4 text-green-500 dark:text-green-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
          )}
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {rateLimitRemaining}% rate limit
          </span>
        </div>
      </div>
    </div>
  );
};