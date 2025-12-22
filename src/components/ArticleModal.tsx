import { X } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl neural-glow">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 glass-strong rounded-full hover:bg-destructive/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Article Content */}
        <div className="p-8 sm:p-12">
          {/* Title */}
          <h1 className="heading-lg text-3xl sm:text-4xl mb-6">{article.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-primary/20">
            <span>By Jeremy Taylor, NeurusAGi</span>
            <span>•</span>
            <span>{new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:gradient-text 
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-primary prose-strong:font-bold
              prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
              prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
}
