import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { products } from '@/data/products';
import WishlistButton from '@/components/wishlist/WishlistButton';

interface RelatedProductsProps {
  currentProduct: Product;
  onProductClick: (product: Product) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, onProductClick }) => {
  // Get related products from the same category, excluding current product
  const relatedProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  // If not enough in same category, add from other categories
  if (relatedProducts.length < 4) {
    const otherProducts = products
      .filter(p => p.category !== currentProduct.category && p.id !== currentProduct.id)
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...otherProducts);
  }

  if (relatedProducts.length === 0) return null;

  return (
    <motion.div
      className="border-t border-border pt-6 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="font-heading font-semibold text-foreground">Related Products</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="group relative bg-secondary/50 rounded-lg overflow-hidden cursor-pointer hover:bg-secondary transition-colors"
            onClick={() => onProductClick(product)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Wishlist button */}
              <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
                <WishlistButton productId={product.id} productName={product.name} size="sm" />
              </div>
              
              {/* View indicator */}
              <motion.div
                className="absolute bottom-2 right-2 p-1.5 rounded-full bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowRight className="w-3 h-3 text-primary-foreground" />
              </motion.div>
            </div>
            
            <div className="p-2">
              <p className="text-xs font-medium text-foreground line-clamp-1">{product.name}</p>
              <p className="text-xs text-muted-foreground">
                {product.wattageOptions[0]}-{product.wattageOptions[product.wattageOptions.length - 1]}W
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;
