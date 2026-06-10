'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { success, error: toastError, ToastProvider } = useToast();
  const [activeTab, setActiveTab] = useState('account');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'business', label: 'Business' },
    { id: 'api', label: 'API Keys' },
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate save — no backend PATCH endpoint exists yet
    await new Promise(r => setTimeout(r, 800));
    success('Settings saved successfully');
    setSaving(false);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <ToastProvider />
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your account and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-[#25D366] border-[#25D366]'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="max-w-2xl space-y-6">
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-bold text-[#0F172A] mb-6">
                  Profile Information
                </h2>
                <div className="space-y-5">
                  <Input
                    label="Full Name"
                    value={formData.fullName}
                    onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Your full name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    helperText="Used for login and notifications"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 234 567 8900"
                  />
                  <div className="pt-4 border-t border-gray-100">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-lg font-bold text-[#0F172A] mb-2">
                  Account Details
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Plan</span>
                    <span className="font-medium text-[#0F172A] capitalize">
                      {user.role || 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium text-[#0F172A]">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Status</span>
                    <span className="inline-flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-[#25D366]' : 'bg-red-500'}`} />
                      <span className="font-medium text-[#0F172A]">
                        {user.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-lg font-bold text-red-600 mb-2">
                  Danger Zone
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Once you log out, you&apos;ll need to sign in again to access your dashboard.
                </p>
                <Button
                  variant="outline"
                  onClick={() => logout()}
                  className="!border-red-500 !text-red-600 hover:!bg-red-50"
                >
                  Logout
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Business Tab */}
        {activeTab === 'business' && (
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-bold text-[#0F172A] mb-6">
                Business Profile
              </h2>
              <div className="max-w-2xl space-y-5">
                <Input
                  label="Business Name"
                  placeholder="Your business name"
                />
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Industry
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm bg-white">
                    <option value="">Select your industry</option>
                    <option value="retail">Retail</option>
                    <option value="food">Food & Beverage</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="services">Professional Services</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Business Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your business..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm resize-none"
                  />
                </div>
                <Input
                  label="Website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                />
                <div className="pt-4 border-t border-gray-100">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api' && (
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-bold text-[#0F172A] mb-2">
                API Keys
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Use these keys to integrate JawabAI with your own applications.
              </p>
              <div className="max-w-2xl space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-[#0F172A]">Production Key</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono truncate">
                      jawabai_prod_************************
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText('jawabai_prod_placeholder');
                        success('Copied to clipboard');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-[#0F172A]">Test Key</p>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                      Test
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono truncate">
                      jawabai_test_************************
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText('jawabai_test_placeholder');
                        success('Copied to clipboard');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <Button variant="outline">
                  Generate New API Key
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Security Note:</strong> Keep your API keys secret. Never share them with anyone or expose them in client-side code.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
