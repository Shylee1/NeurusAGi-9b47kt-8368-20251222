import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { articles } from '../data/articles';
import { ArticleModal } from '../components/ArticleModal';

export function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <section className="section-container">
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-4">News & Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles by Jeremy Taylor exploring artificial general intelligence, innovation, and the future
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-12 pr-12"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="feature-block group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              {article.thumbnail && (
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="heading-sm text-lg group-hover:text-primary transition-colors line-clamp-2 mb-3">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>By {article.author}</span>
                <span>{article.company}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your search.</p>
          </div>
        )}
      </section>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
