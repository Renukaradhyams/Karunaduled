import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import ScrollReveal from '@/components/animations/ScrollReveal';

const tabs = [
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'popular', label: 'Most Popular', icon: Star },
  { id: 'new', label: 'New Arrivals', icon: Sparkles },
];

const ProductRecommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trending');
  
  // Get different products for each tab
  const getProducts = () => {
    switch (activeTab) {
      case 'trending':
        return products.slice(0, 4);
      case 'popular':
        return products.slice(2, 6);
      case 'new':
        return products.slice(4, 8);
      default:
        return products.slice(0, 4);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-glow text-sm font-medium text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              AI Recommended
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Curated <span className="text-gradient">Just For You</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground">
              Based on popular choices and customer preferences
            </p>
          </ScrollReveal>
        </div>

        {/* Tabs */}
        <ScrollReveal delay={0.3}>
          <div className="flex justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon className={`relative w-4 h-4 ${activeTab === tab.id ? 'text-primary-foreground' : ''}`} />
                <span className="relative">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {getProducts().map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -8 }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick View */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <Link to="/products">
                      <Button size="sm" className="gap-2 shadow-lg">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </Link>
                  </motion.div>
                  
                  {/* AI Badge */}
                  <div className="absolute top-3 left-3">
                    <motion.span
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    >
                      <Sparkles className="w-3 h-3" />
                      AI Pick
                    </motion.span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  
                  {/* Wattage Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.wattageOptions.slice(0, 3).map((w) => (
                      <span
                        key={w}
                        className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground"
                      >
                        {w}W
                      </span>
                    ))}
                    {product.wattageOptions.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">
                        +{product.wattageOptions.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <ScrollReveal className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" variant="outline" className="gap-2 group border-primary/30 hover:border-primary hover:bg-primary/10">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProductRecommendations;
