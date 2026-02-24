'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/me');
      if (response.data.success) {
        setUserData(response.data.data);
        setFormData({ name: response.data.data.name, email: response.data.data.email });
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      
      if (imageFile) {
        formDataToSend.append('avatarImage', imageFile);
      }

      const response = await api.patch('/users/me', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUserData(response.data.data);
        setIsEditing(false);
        setImageFile(null);
        setImagePreview(null);
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({ name: userData.name, email: userData.email });
    setImageFile(null);
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl sm:text-4xl font-bold">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full rounded-full object-cover" />
              ) : userData?.avatarImage?.secure_url ? (
                <img src={userData.avatarImage.secure_url} alt={userData.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                userData?.name?.charAt(0).toUpperCase()
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{userData?.name}</h2>
            <p className="text-sm text-gray-500 mb-2">Member since {new Date(userData?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Profile Form/Display */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                disabled={updating}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              <p className="text-lg text-gray-800">{userData?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-lg text-gray-800">{userData?.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 font-medium"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Account Created</h3>
          <p className="text-lg font-semibold text-gray-800">{new Date(userData?.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
          <p className="text-lg font-semibold text-gray-800">{new Date(userData?.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;