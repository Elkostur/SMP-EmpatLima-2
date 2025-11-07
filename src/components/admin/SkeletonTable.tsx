import React from 'react';

interface SkeletonTableProps {
  columns: number;
  rows?: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ columns, rows = 5 }) => {
  const skeletonRows = Array.from({ length: rows }).map((_, rowIndex) => (
    <tr key={rowIndex} className="border-b dark:border-gray-700">
      {Array.from({ length: columns }).map((_, colIndex) => (
        <td key={colIndex} className="p-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b dark:border-gray-700">
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="p-4 text-gray-600 dark:text-gray-300">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skeletonRows}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;