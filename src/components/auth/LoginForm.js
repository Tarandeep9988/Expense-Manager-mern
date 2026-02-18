'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);
      router.replace('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-5">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-xs">Login to manage your expenses</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-linear-to-r from-purple-500 to-purple-700 text-white font-semibold py-2 text-sm rounded-lg hover:from-purple-600 hover:to-purple-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-3 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-xs">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-xs">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-600 font-semibold hover:text-purple-700 transition">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;