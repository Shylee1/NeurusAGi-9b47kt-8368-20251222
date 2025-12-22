import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Article, ThirdPartyMedia } from '../types';
import { ExternalLink, Calendar, User } from 'lucide-react';

export function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [media, setMedia] = useState<ThirdPartyMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      const { data: mediaData } = await supabase
        .from('third_party_media')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (articlesData) setArticles(articlesData);
      if (mediaData) setMedia(mediaData);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-4">News & Updates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest insights, articles, and media coverage
          </p>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="section-container pt-0">
        <div className="glass-strong rounded-2xl p-8 neural-glow mb-16">
          <h2 className="heading-md text-center mb-8">[FEATURED VIDEO TITLE]</h2>
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-xl gradient-text font-semibold">
                [EMBEDDED YOUTUBE VIDEO]
              </p>
              <p className="text-sm text-muted-foreground">
                [Replace with YouTube embed code]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Articles Section */}
      <section className="section-container pt-0">
        <h2 className="heading-lg text-center mb-12">Featured Articles</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="feature-block group cursor-pointer">
                {article.thumbnail_url && (
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={article.thumbnail_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <h3 className="heading-sm text-lg group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-strong rounded-xl p-12 text-center">
            <p className="text-muted-foreground">
              [NO ARTICLES YET - Articles will appear here once published]
            </p>
          </div>
        )}
      </section>

      {/* Third-Party Media Section */}
      <section className="section-container">
        <h2 className="heading-lg text-center mb-12">Media Coverage</h2>
        
        {media.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="feature-block group"
              >
                {item.thumbnail_url && (
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="heading-sm text-lg group-hover:text-primary transition-colors flex-1">
                      {item.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="uppercase tracking-wide">{item.media_type}</span>
                    {item.source && <span>{item.source}</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="glass-strong rounded-xl p-12 text-center">
            <p className="text-muted-foreground">
              [NO MEDIA YET - Third-party publications will appear here once added]
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
