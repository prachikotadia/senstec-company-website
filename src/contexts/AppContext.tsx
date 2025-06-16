
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'general' | 'guest';
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  image?: string;
  published: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  image?: string;
  pdfUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
  caseStudies: CaseStudy[];
  setCaseStudies: (studies: CaseStudy[]) => void;
  contactMessages: ContactMessage[];
  setContactMessages: (messages: ContactMessage[]) => void;
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Infrastructure Monitoring',
    content: 'Advanced sensor technologies are revolutionizing how we monitor critical infrastructure...',
    author: 'Dr. Sarah Chen',
    publishDate: '2024-01-15',
    tags: ['AI', 'Sensors', 'Infrastructure'],
    published: true
  },
  {
    id: '2',
    title: 'Predictive Maintenance in Marine Structures',
    content: 'Offshore platforms face unique challenges that require specialized monitoring solutions...',
    author: 'Prof. Michael Torres',
    publishDate: '2024-01-10',
    tags: ['Marine', 'Predictive Maintenance'],
    published: true
  }
];

const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Golden Gate Bridge Health Monitoring',
    client: 'San Francisco Transportation Authority',
    location: 'San Francisco, CA',
    industry: 'Bridge',
    problem: 'Need for real-time structural health monitoring of the iconic bridge',
    solution: 'Deployed 200+ wireless sensors across the bridge structure',
    outcome: '99.9% uptime monitoring with early warning capabilities'
  },
  {
    id: '2',
    title: 'North Sea Oil Platform Monitoring',
    client: 'PetroNorth Energy',
    location: 'North Sea, UK',
    industry: 'Marine',
    problem: 'Corrosion monitoring in harsh marine environment',
    solution: 'Underwater sensor arrays with satellite connectivity',
    outcome: '40% reduction in maintenance costs'
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(mockCaseStudies);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  const addContactMessage = (message: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    setContactMessages(prev => [newMessage, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      blogPosts,
      setBlogPosts,
      caseStudies,
      setCaseStudies,
      contactMessages,
      setContactMessages,
      addContactMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
