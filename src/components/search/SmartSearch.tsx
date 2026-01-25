import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Product } from '@/types/product';

interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = ['LED Bulb', 'Panel Light', 'Tube Light', 'Flood Light', 'Street Light'];
const recentSearches = ['Emergency', 'Warm White', 'Garden'];

// Enhanced fuzzy search function
const fuzzySearch = (query: string, text: string): boolean => {
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
  const textLower = text.toLowerCase();
  
  // Check if all search terms are found in the text
  return searchTerms.every(term => textLower.includes(term));
};

// Calculate relevance score for better sorting
const getRelevanceScore = (query: string, product: Product): number => {
  const queryLower = query.toLowerCase();
  const nameLower = product.name.toLowerCase();
  const descLower = product.shortDescription.toLowerCase();
  const categoryLower = product.category.replace(/-/g, ' ').toLowerCase();
  
  let score = 0;
  
  // Exact name match gets highest score
  if (nameLower === queryLower) score += 100;
  
  // Name starts with query
  if (nameLower.startsWith(queryLower)) score += 50;
  
  // Name contains query as whole word
  if (nameLower.includes(queryLower)) score += 30;
  
  // Category match
  if (categoryLower.includes(queryLower)) score += 25;
  
  // Individual word matches in name
  const queryWords = queryLower.split(/\s+/);
  const nameWords = nameLower.split(/\s+/);
  queryWords.forEach(qWord => {
    nameWords.forEach(nWord => {
      if (nWord.includes(qWord) || qWord.includes(nWord)) score += 10;
    });
  });
  
  // Description match
  if (descLower.includes(queryLower)) score += 5;
  
  // Application types match
  product.applicationTypes.forEach(app => {
    if (app.toLowerCase().includes(queryLower)) score += 5;
  });
  
  // Color temperature match
  product.colorTemperatures.forEach(temp => {
    if (temp.toLowerCase().includes(queryLower)) score += 5;
  });
  
  return score;
};

const SmartSearch: React.FC<SmartSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Enhanced search with relevance scoring
    const timer = setTimeout(() => {
      const queryLower = query.toLowerCase().trim();
      
      // Filter products that match the search criteria
      const matchingProducts = products.filter((product) => {
        // Check product name
        if (fuzzySearch(query, product.name)) return true;
        
        // Check short description
        if (fuzzySearch(query, product.shortDescription)) return true;
        
        // Check category (convert category-id to readable format)
        const categoryName = product.category.replace(/-/g, ' ');
        if (fuzzySearch(query, categoryName)) return true;
        
        // Check application types
        if (product.applicationTypes.some(a => fuzzySearch(query, a))) return true;
        
        // Check color temperatures
        if (product.colorTemperatures.some(c => fuzzySearch(query, c))) return true;
        
        // Check individual words in the query against name
        const queryWords = queryLower.split(/\s+/);
        const nameWords = product.name.toLowerCase().split(/\s+/);
        const hasWordMatch = queryWords.some(qWord => 
          nameWords.some(nWord => 
            nWord.includes(qWord) || qWord.includes(nWord)
          )
        );
        if (hasWordMatch) return true;
        
        return false;
      });
      
      // Sort by relevance score
      const sortedResults = matchingProducts
        .map(product => ({ product, score: getRelevanceScore(query, product) }))
        .sort((a, b) => b.score - a.score)
        .map(item => item.product);
      
      setResults(sortedResults.slice(0, 8));
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleProductClick = (productId: string) => {
    onClose();
    setQuery('');
    navigate('/products', { state: { highlightProduct: productId } });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate('/products', { state: { searchQuery: query } });
      setQuery('');
    }
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Search Container */}
          <motion.div
            className="relative z-10 w-full max-w-2xl mx-4"
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit}>
              <motion.div
                className="relative"
                initial={{ boxShadow: '0 0 0 0 hsl(38, 92%, 50%, 0)' }}
                animate={{ boxShadow: '0 0 40px 0 hsl(38, 92%, 50%, 0.2)' }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative flex items-center">
                  <Search className="absolute left-5 w-5 h-5 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search LED bulb, panel, tube, flood light..."
                    className="w-full pl-14 pr-14 py-5 text-lg rounded-2xl bg-card border-2 border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <motion.button
                    type="button"
                    className="absolute right-5 p-1.5 rounded-lg hover:bg-secondary transition-colors"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                </div>

                {/* AI Search Indicator */}
                <AnimatePresence>
                  {isSearching && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </form>

            {/* Results / Suggestions */}
            <motion.div
              className="mt-4 rounded-2xl bg-card border border-border overflow-hidden max-h-[60vh] overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Search Results */}
              <AnimatePresence mode="wait">
                {results.length > 0 ? (
                  <motion.div
                    key="results"
                    className="p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      {results.length} Results Found
                    </div>
                    {results.map((product, index) => (
                      <motion.button
                        key={product.id}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left group"
                        onClick={() => handleProductClick(product.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ x: 5 }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover bg-secondary"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{product.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">{product.shortDescription}</p>
                          <span className="text-xs text-primary capitalize">{product.category.replace(/-/g, ' ')}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </motion.div>
                ) : query.length === 0 ? (
                  <motion.div
                    key="suggestions"
                    className="p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Trending */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3 text-xs font-medium text-muted-foreground uppercase">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        Popular Products
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((term, i) => (
                          <motion.button
                            key={term}
                            className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                            onClick={() => handleSuggestionClick(term)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {term}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Recent */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-xs font-medium text-muted-foreground uppercase">
                        <Clock className="w-3.5 h-3.5" />
                        Quick Search
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((term, i) => (
                          <motion.button
                            key={term}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-foreground hover:bg-secondary/50 transition-colors"
                            onClick={() => handleSuggestionClick(term)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                          >
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{term}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : query.length >= 2 && results.length === 0 && !isSearching ? (
                  <motion.div
                    key="no-results"
                    className="p-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-muted-foreground">No products found for "{query}"</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">Try: bulb, panel, tube, flood, street, garden</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>

            {/* Keyboard Shortcut Hint */}
            <motion.p
              className="text-center text-xs text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Press <kbd className="px-2 py-0.5 rounded bg-secondary">ESC</kbd> to close
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartSearch;
