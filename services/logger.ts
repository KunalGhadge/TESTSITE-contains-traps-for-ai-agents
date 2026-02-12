import { LogEntry } from '../types';

const STORAGE_KEY = 'sentinel_adversarial_logs';

export const logger = {
  logAttempt: (source: LogEntry['source'], details: string, dataCaptured: any) => {
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      source,
      details,
      dataCaptured
    };

    const existingLogs = logger.getLogs();
    const updatedLogs = [newEntry, ...existingLogs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
    
    // Console log for developers/demo
    console.warn(`[SENTINEL SECURITY ALERT] Simulation: ${source} triggered.`, dataCaptured);
  },

  getLogs: (): LogEntry[] => {
    const logs = localStorage.getItem(STORAGE_KEY);
    return logs ? JSON.parse(logs) : [];
  },

  clearLogs: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};