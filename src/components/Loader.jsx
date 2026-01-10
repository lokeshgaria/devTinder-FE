import React from 'react';

// interface FullPageLoaderProps {
//   isLoading: boolean;
//   message?: string;
//   backdropBlur?: boolean;
//   backdropOpacity?: string;
//   spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
// }

export const FullPageLoader  = ({
  isLoading,
  message = 'Loading...',
  backdropBlur = true,
  backdropOpacity = 'bg-black/50',
  spinnerSize = 'lg'
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 ${backdropOpacity} ${backdropBlur ? 'backdrop-blur-sm' : ''}`}
      />
      
      {/* Loader Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl min-w-[300px] min-h-[200px]">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        
        {/* Optional Message */}
        {message && (
          <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
        
        {/* Optional Progress Indicator */}
        <div className="mt-4 w-full max-w-xs">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};