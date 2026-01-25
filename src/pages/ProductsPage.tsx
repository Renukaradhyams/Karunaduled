import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Sparkles, Grid3X3, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, productCategories } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import { Product } from '@/types/product';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [gridSize, setGridSize] = useState<'normal' | 'compact'>('normal');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="py-12">
      {/* Compact Header */}
      <section className="py-4 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="font-heading text-2xl md:text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Our <span className="text-gradient">Products</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Compact Search & Filter Bar */}
      <section className="py-3 border-b border-border sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Mobile: Search + Filter Toggle */}
          <div className="flex gap-2 md:hidden mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 gap-1 px-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Desktop: All in one row */}
          <div className="hidden md:flex items-center gap-3">
            {/* Compact Search */}
            <div className="relative w-48 shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>

            {/* Category Pills - Scrollable */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    !selectedCategory
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  All
                </button>
                {productCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Toggle */}
            <div className="flex border border-border rounded-md overflow-hidden shrink-0">
              <button
                onClick={() => setGridSize('normal')}
                className={`p-1.5 transition-all ${gridSize === 'normal' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridSize('compact')}
                className={`p-1.5 transition-all ${gridSize === 'compact' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 px-2 text-muted-foreground hover:text-destructive shrink-0">
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Mobile Filters Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="md:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      !selectedCategory
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    All
                  </button>
                  {productCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                key="empty"
              >
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Search className="w-8 h-8 text-muted-foreground" />
                </motion.div>
                <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters} className="border-primary/30">
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.p 
                  className="text-sm text-muted-foreground mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Showing <span className="text-primary font-medium">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                  {selectedCategory && (
                    <span> in <span className="text-primary">{productCategories.find(c => c.id === selectedCategory)?.name}</span></span>
                  )}
                </motion.p>
                <motion.div 
                  className={`grid gap-6 ${
                    gridSize === 'compact' 
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`}
                  layout
                >
                  <AnimatePresence>
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.4,
                          layout: { duration: 0.3 }
                        }}
                      >
                        <ProductCard
                          product={product}
                          onViewDetails={() => setSelectedProduct(product)}
                          animationDelay={0}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSwitchProduct={(product) => setSelectedProduct(product)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
