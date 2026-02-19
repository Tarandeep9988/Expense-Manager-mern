'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '@/lib/api';

const Sidebar = ({ userData: initialUserData, isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    // Fetch fresh user data on component mount to show latest profile info
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    
    if (!confirmed) {
      return;
    }

    try {
      setIsLoading(true);
      await api.post('/auth/logout');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { href: '/dashboard', icon: '📊', label: 'Dashboard' },
    { href: '/incomes', icon: '💰', label: 'Incomes' },
    { href: '/expenses', icon: '💸', label: 'Expenses' },
    { href: '/profile', icon: '👤', label: 'Profile' },
  ];

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col p-5 z-50 overflow-y-auto transform lg:transform-none transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      {/* Close button for mobile */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expense Manager</h1>
      </div>

      {/* Profile Section */}
      <div className="pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg shrink-0 overflow-hidden">
            {userData?.avatarImage?.secure_url ? (
              <img 
                src={userData.avatarImage.secure_url} 
                alt={userData?.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              userData?.name?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{userData?.name || 'User'}</h3>
            <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
    </aside>
  );
};

export default Sidebar;
