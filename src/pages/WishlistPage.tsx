import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import ScrollReveal from '@/components/animations/ScrollReveal';
import WishlistButton from '@/components/wishlist/WishlistButton';

const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/20 flex items-center justify-center"
          >
            <Heart className="w-10 h-10 text-red-500 fill-red-500" />
          </motion.div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-gradient">Wishlist</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            {wishlistProducts.length > 0
              ? `You have ${wishlistProducts.length} item${wishlistProducts.length > 1 ? 's' : ''} saved`
              : 'Your wishlist is empty'}
          </p>
        </ScrollReveal>

        {wishlistProducts.length > 0 ? (
          <>
            {/* Clear All Button */}
            <div className="flex justify-end mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
                className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlistProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 z-10">
                      <WishlistButton productId={product.id} productName={product.name} size="sm" />
                    </div>

                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-secondary/20">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* Wattage Options */}
                      <div className="flex flex-wrap gap-1">
                        {product.wattageOptions.slice(0, 4).map(watt => (
                          <span
                            key={watt}
                            className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {watt}W
                          </span>
                        ))}
                        {product.wattageOptions.length > 4 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">
                            +{product.wattageOptions.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action */}
                      <Link to="/products" className="block">
                        <Button size="sm" className="w-full gap-2 group/btn">
                          <ShoppingBag className="w-4 h-4" />
                          View Product
                          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
              No saved items yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Browse our products and tap the heart icon to save your favorites here.
            </p>
            <Link to="/products">
              <Button size="lg" className="gap-2">
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
