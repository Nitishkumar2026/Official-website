import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PageHeader from '../components/PageHeader';

const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${profile?.full_name || user?.email}`}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-600">Full Name:</p>
              <p className="text-lg text-gray-800">{profile?.full_name}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Email:</p>
              <p className="text-lg text-gray-800">{user?.email}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Role:</p>
              <p className="text-lg text-gray-800 capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">{profile?.role}</p>
            </div>
             <div>
              <p className="font-medium text-gray-600">User ID:</p>
              <p className="text-sm text-gray-500 break-all">{user?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
