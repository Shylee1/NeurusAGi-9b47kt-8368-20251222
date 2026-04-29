import { useState, useMemo } from 'react';
import { Search, X, List, Globe } from 'lucide-react';
import { articles } from '../data/articles';
import { ArticleModal } from '../components/ArticleModal';
import { SphereGallery } from '../components/SphereGallery';

export function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'sphere' | 'list'>('sphere');

  const filteredArticles = useMemo(() =>
    articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [searchTerm]
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-container pb-0">
        <div className="text-center mb-8">
          <h1 className="heading-xl mb-3">News &amp; Insights</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles by Jeremy Taylor exploring artificial general intelligence, innovation, and the future
          </p>
        </div>

        {/* Search + View Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto mb-6">
          <div className="relative flex-1 w-full">
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div
            style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,206,209,0.18)' }}
            className="flex rounded-lg overflow-hidden flex-shrink-0"
          >
            <button
              onClick={() => setViewMode('sphere')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                viewMode === 'sphere'
                  ? 'bg-primary text-black'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Sphere</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-primary text-black'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center mb-2">
          {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}{searchTerm ? ' found' : ' total'}
        </p>
      </section>

      {/* Sphere View */}
      {viewMode === 'sphere' && (
        <section className="py-4 px-4 overflow-hidden">
          {searchTerm ? (
            /* When searching, fall back to grid so results are visible */
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
              ))}
              {filteredArticles.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <p className="text-muted-foreground">No articles match your search.</p>
                </div>
              )}
            </div>
          ) : (
            <SphereGallery
              articles={articles}
              onArticleClick={(a) => setSelectedArticle(a)}
            />
          )}
        </section>
      )}

      {/* List / Grid View */}
      {viewMode === 'list' && (
        <section className="section-container pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No articles match your search.</p>
            </div>
          )}
        </section>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

function ArticleCard({ article, onClick }: { article: any; onClick: () => void }) {
  return (
    <div
      className="feature-block group cursor-pointer"
      style={{ padding: '0', overflow: 'hidden' }}
      onClick={onClick}
    >
      {article.thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2" style={{ lineHeight: 1.4 }}>
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-primary/10 pt-3">
          <span>By {article.author}</span>
          <span className="text-primary text-xs font-medium">Read more</span>
        </div>
      </div>
    </div>
  );
}
