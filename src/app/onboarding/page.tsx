'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function OnboardingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    industry: '',
    whatsappNumber: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const steps = [
    { id: 1, title: 'Welcome' },
    { id: 2, title: 'Business Details' },
    { id: 3, title: 'Knowledge Base' },
    { id: 4, title: 'WhatsApp Setup' },
    { id: 5, title: 'Complete' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const handleComplete = () => {
    router.push('/dashboard');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-colors ${
                    currentStep === step.id
                      ? 'bg-[#25D366] text-white'
                      : currentStep > step.id
                      ? 'bg-[#128C7E] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 sm:mx-4 transition-colors ${
                      currentStep > step.id ? 'bg-[#25D366]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 px-1">
            {steps.map((step) => (
              <span key={step.id} className={`text-center ${currentStep === step.id ? 'font-semibold text-[#25D366]' : ''} hidden sm:block`}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {currentStep === 1 && (
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3 sm:mb-4">Welcome to JawabAI</h1>
              <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Your AI-powered WhatsApp Sales Assistant is ready to help you reply to customers 24/7. Let's set it up in just a few steps.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl mb-2">📚</div>
                  <h3 className="font-semibold text-[#0F172A] mb-1 text-sm sm:text-base">Upload Your Data</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Add your business documents</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl mb-2">🔗</div>
                  <h3 className="font-semibold text-[#0F172A] mb-1 text-sm sm:text-base">Connect WhatsApp</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Link your Business API</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl mb-2">🤖</div>
                  <h3 className="font-semibold text-[#0F172A] mb-1 text-sm sm:text-base">Start Auto-Replying</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Let AI handle your customers</p>
                </div>
              </div>
              <Button onClick={handleNext} className="w-full sm:w-auto sm:max-w-xs">
                Get Started
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2">Tell Us About Your Business</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">This helps us customize your AI assistant</p>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={businessData.businessName}
                    onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm sm:text-base"
                    placeholder="Your business name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={businessData.industry}
                    onChange={(e) => setBusinessData({ ...businessData, industry: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm sm:text-base"
                  >
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Business Number</label>
                  <input
                    type="tel"
                    value={businessData.whatsappNumber}
                    onChange={(e) => setBusinessData({ ...businessData, whatsappNumber: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm sm:text-base"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto">
                  Back
                </Button>
                <Button onClick={handleNext} className="w-full sm:w-auto">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2">Upload Your Knowledge Base</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Upload documents (PDF, TXT, DOCX) to train your AI</p>
              
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-8 text-center hover:border-[#25D366] transition-colors cursor-pointer mb-4 sm:mb-6"
              >
                <input
                  type="file"
                  multiple
                  accept=".pdf,.txt,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📄</div>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-xs text-gray-400">PDF, TXT, DOCX up to 10MB each</p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mb-4 sm:mb-6">
                  <h3 className="font-semibold text-[#0F172A] text-sm sm:text-base">Uploaded Files</h3>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 sm:p-3">
                      <span className="text-xs sm:text-sm text-gray-700 truncate flex-1 mr-2">{file.name}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto">
                  Back
                </Button>
                <Button onClick={handleNext} className="w-full sm:w-auto">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2">Connect Your WhatsApp</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Scan the QR code to connect your WhatsApp Business API</p>
              
              <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl sm:text-6xl mb-2">📱</div>
                    <p className="text-xs sm:text-sm text-gray-500">QR Code Placeholder</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-center px-4">
                  Open WhatsApp Business on your phone → Settings → Linked Devices → Link a Device
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto">
                  Back
                </Button>
                <Button onClick={handleNext} className="w-full sm:w-auto">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3 sm:mb-4">You're All Set!</h1>
              <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Your JawabAI assistant is ready. Start by testing it with your uploaded documents, then upgrade to activate auto-replies.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-md mx-auto">
                <h3 className="font-semibold text-[#0F172A] mb-2 sm:mb-3 text-sm sm:text-base">What's Next?</h3>
                <ul className="text-left text-xs sm:text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#25D366] rounded-full mr-2 mt-1.5 sm:mt-0.5 flex-shrink-0"></span>
                    <span>Test your AI with the "Ask Anything" feature</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#25D366] rounded-full mr-2 mt-1.5 sm:mt-0.5 flex-shrink-0"></span>
                    <span>Upgrade to activate WhatsApp auto-replies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#25D366] rounded-full mr-2 mt-1.5 sm:mt-0.5 flex-shrink-0"></span>
                    <span>Monitor conversations in real-time</span>
                  </li>
                </ul>
              </div>
              <Button onClick={handleComplete} className="w-full sm:w-auto sm:max-w-xs">
                Go to Dashboard
              </Button>
            </div>
          )}

          {/* Skip Button */}
          {currentStep < 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-[#25D366] transition-colors"
              >
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
