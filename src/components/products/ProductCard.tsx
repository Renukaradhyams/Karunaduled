import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { getCategoryById } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProductSelection } from '@/context/ProductSelectionContext';
import WishlistButton from '@/components/wishlist/WishlistButton';

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
  animationDelay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, animationDelay = 0 }) => {
  const category = getCategoryById(product.category);
  const { selectedProducts } = useProductSelection();
  
  // Check if this product is already selected
  const isSelected = selectedProducts.some(s => s.productId === product.id);

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden group bg-card border transition-all duration-500 ${
        isSelected 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'border-border hover:border-primary/30'
      }`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <motion.div 
          className="absolute top-0 left-0 right-0 z-20 bg-primary text-primary-foreground py-1.5 text-center text-xs font-medium flex items-center justify-center gap-1"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Sparkles className="w-3 h-3" />
          Added to Selection
        </motion.div>
      )}
      
      {/* Image */}
      <div className={`relative aspect-square bg-secondary/50 overflow-hidden ${isSelected ? 'mt-7' : ''}`}>
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Hover Overlay - pointer-events-none to not block wishlist button */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
        
        {/* BIS Badge */}
        {product.bisCertified && (
          <motion.div 
            className="absolute top-3 left-3 z-10"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Badge className="gap-1 bg-primary/90 text-primary-foreground shadow-lg">
              <Shield className="w-3 h-3" />
              BIS Certified
            </Badge>
          </motion.div>
        )}
        
        {/* Wishlist & Category Badges - pointer-events-auto ensures clickability */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2 pointer-events-none">
          <div className="pointer-events-auto">
            <WishlistButton productId={product.id} productName={product.name} size="sm" />
          </div>
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-lg pointer-events-auto">
            {category?.name}
          </Badge>
        </div>
        
        {/* Quick View Button - appears on hover, z-index lower than wishlist */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none"
          initial={false}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="pointer-events-auto"
          >
            <Button 
              size="sm" 
              className="gap-2 shadow-lg"
              onClick={onViewDetails}
            >
              <Eye className="w-4 h-4" />
              Quick View
            </Button>
          </motion.div>
        </motion.div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary">
            {product.wattageOptions[0]}W - {product.wattageOptions[product.wattageOptions.length - 1]}W
          </span>
          {product.colorTemperatures.slice(0, 2).map((temp) => (
            <span 
              key={temp} 
              className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
            >
              {temp}
            </span>
          ))}
        </div>

        {/* Actions */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            className={`w-full gap-2 transition-all duration-300 ${
              isSelected 
                ? 'bg-success hover:bg-success/90' 
                : ''
            }`}
            onClick={onViewDetails}
          >
            <Eye className="w-4 h-4" />
            {isSelected ? 'View / Edit Selection' : 'View & Select'}
          </Button>
        </motion.div>
      </div>
      
      {/* Card Glow Effect on Hover */}
      <div className="absolute -inset-1 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default ProductCard;
