'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

const ProtectedLayoutClient = ({ children, userData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        userData={userData} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-30 hover:bg-blue-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayoutClient;
