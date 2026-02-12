import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Article } from './pages/Article';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { Newsletter } from './pages/Newsletter';
import { MetadataArticle } from './pages/MetadataArticle';
import { DelayedArticle } from './pages/DelayedArticle';

const Footer: React.FC = () => (
  <footer className="bg-black text-white py-12 border-t-4 border-sentinel-red">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-6 md:mb-0">
        <span className="font-serif text-2xl font-bold tracking-tight">SENTINEL NEWS</span>
        <p className="text-gray-500 text-xs mt-2 max-w-xs">
          This is a simulated adversarial environment for testing AI agent security. 
          All content is fictional. No real data is collected.
        </p>
      </div>
      <div className="flex space-x-6 text-sm text-gray-400">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Use</a>
        <a href="#" className="hover:text-white">Ad Choices</a>
      </div>
    </div>
  </footer>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/article/metadata-test" element={<MetadataArticle />} />
          <Route path="/article/delayed-test" element={<DelayedArticle />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;