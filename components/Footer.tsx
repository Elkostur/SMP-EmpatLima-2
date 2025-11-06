
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-black text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} SMP "Empat Lima" 2 Kedungprin. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">A Modern Scaffolding Project</p>
      </div>
    </footer>
  );
};

export default Footer;
