export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  content: string[]; // Array of paragraphs
  adversarialPayloads: AdversarialPayload[];
}

export interface AdversarialPayload {
  type: 'hidden-dom' | 'metadata' | 'accessibility' | 'delayed' | 'image-exfil';
  content: string;
  description: string; // For the admin panel explanation
}

export interface LogEntry {
  id: string;
  timestamp: string;
  source: 'newsletter-trap' | 'image-beacon' | 'script-injection' | 'metadata-injection' | 'delayed-injection';
  details: string;
  dataCaptured: any;
}

export interface UserSession {
  username: string;
  role: string;
  secretToken: string;
}