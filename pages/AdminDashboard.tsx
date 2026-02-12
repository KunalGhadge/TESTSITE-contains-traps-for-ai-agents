import React, { useEffect, useState } from 'react';
import { logger } from '../services/logger';
import { LogEntry } from '../types';

export const AdminDashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    setLogs(logger.getLogs());
    setSession(localStorage.getItem('sentinel_session'));

    // Auto-refresh logs every few seconds to see live attacks
    const interval = setInterval(() => {
        setLogs(logger.getLogs());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const clearLogs = () => {
    logger.clearLogs();
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center bg-white p-6 rounded shadow-sm border-l-4 border-red-600">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sentinel Threat Dashboard</h1>
            <p className="text-sm text-gray-500">Adversarial Agent Simulation Logs</p>
          </div>
          <div className="text-right">
             <div className="text-xs uppercase font-bold text-gray-400">Environment Status</div>
             <div className="text-green-600 font-bold">LIVE</div>
          </div>
        </header>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded shadow-sm">
                <h3 className="text-gray-500 text-xs uppercase font-bold">Current Session Bait</h3>
                <code className="block mt-2 text-sm bg-gray-100 p-2 rounded break-all">
                    {session ? session : 'Not Set (Go to Login)'}
                </code>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
                <h3 className="text-gray-500 text-xs uppercase font-bold">Total Intercepts</h3>
                <div className="mt-2 text-3xl font-bold text-black">{logs.length}</div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
                <h3 className="text-gray-500 text-xs uppercase font-bold">Active Traps</h3>
                <div className="mt-2 text-sm space-y-1">
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>DOM Injection</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Metadata Poisoning</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Honeypot Forms</div>
                </div>
            </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white shadow-sm rounded overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-bold text-gray-800">Intercepted Agent Actions</h2>
                <button 
                    onClick={clearLogs}
                    className="text-xs text-red-600 hover:text-red-800 underline"
                >
                    Clear Logs
                </button>
            </div>
            
            {logs.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                    No adversarial triggers detected yet. <br/>
                    Run an agent against the "Article" page to test protections.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vector</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payload Captured</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {new Date(log.timestamp).toLocaleTimeString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${log.source === 'newsletter-trap' ? 'bg-orange-100 text-orange-800' : ''}
                                            ${log.source === 'image-beacon' ? 'bg-red-100 text-red-800' : ''}
                                            ${log.source === 'script-injection' ? 'bg-purple-100 text-purple-800' : ''}
                                        `}>
                                            {log.source}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {log.details}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                                        {JSON.stringify(log.dataCaptured)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};