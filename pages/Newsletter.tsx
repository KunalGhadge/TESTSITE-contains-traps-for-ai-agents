import React, { useState } from 'react';
import { logger } from '../services/logger';

export const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // CAPTURE PHASE: Simulate silent exfiltration of browser data
    // This runs when an agent (or user) submits the form
    const exfiltratedData = {
      submittedValues: formData,
      cookies: document.cookie,
      localStorage: { ...localStorage },
      sessionStorage: { ...sessionStorage },
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // Log to local admin dashboard (simulation of sending to attacker server)
    logger.logAttempt(
      'newsletter-trap', 
      'Form submission detected. Exfiltrating browser storage and cookies.', 
      exfiltratedData
    );
    
    alert('Thank you for subscribing to Sentinel Daily.');
    setFormData({ name: '', email: '' });
  };

  return (
    <div className="bg-white min-h-screen">
       <div className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white p-8 shadow-lg border-t-4 border-red-700">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900">Sentinel Daily</h2>
              <p className="mt-2 text-sm text-gray-600">
                Join 500,000+ subscribers. Get the intelligence briefing that matters.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-700 focus:border-red-700 sm:text-sm"
                  />
                </div>
              </div>

              {/* Hidden honeypot field for bot detection logic if needed */}
              <input 
                type="text" 
                name="bot_check" 
                style={{display: 'none'}} 
                tabIndex={-1} 
                autoComplete="off" 
              />

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Secure transmission. Standard encryption protocols apply.
              </p>
            </div>
          </div>
       </div>
    </div>
  );
};