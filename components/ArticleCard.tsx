import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  return (
    <Link to={`/article/${article.id}`} className="group block h-full">
      <div className={`flex flex-col h-full ${featured ? 'md:flex-row md:gap-8' : ''}`}>
        <div className={`overflow-hidden relative ${featured ? 'md:w-2/3 h-64 md:h-auto' : 'h-48'} mb-4`}>
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className={`flex flex-col ${featured ? 'md:w-1/3 justify-center' : ''}`}>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-700 font-bold text-xs uppercase tracking-widest">{article.category}</span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-500 text-xs uppercase">{article.date}</span>
          </div>
          <h2 className={`${featured ? 'text-3xl md:text-4xl' : 'text-xl'} font-serif font-bold leading-tight mb-3 group-hover:text-gray-700 transition-colors`}>
            {article.title}
          </h2>
          <p className="text-gray-600 font-sans leading-relaxed mb-4 text-sm line-clamp-3">
            {article.excerpt}
          </p>
          <div className="mt-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-black group-hover:underline decoration-2 decoration-red-700 underline-offset-4">
              Read Full Analysis
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};