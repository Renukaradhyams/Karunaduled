import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  productName = 'Product',
  className,
  size = 'md',
  showLabel = false,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(productId);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(productId);
    
    if (!isWishlisted) {
      toast.success(`${productName} added to wishlist!`, {
        icon: '❤️',
      });
    } else {
      toast.info(`${productName} removed from wishlist`, {
        icon: '💔',
      });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'relative rounded-full flex items-center justify-center transition-all duration-300',
        isWishlisted
          ? 'bg-red-500/20 hover:bg-red-500/30'
          : 'bg-background/80 hover:bg-background backdrop-blur-sm',
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      style={{ zIndex: 30 }}
    >
      <AnimatePresence mode="wait">
        {isWishlisted ? (
          <motion.div
            key="filled"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="heart-pop"
          >
            <Heart className={cn(iconSizes[size], 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]')} />
          </motion.div>
        ) : (
          <motion.div
            key="outline"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <Heart className={cn(iconSizes[size], 'text-muted-foreground hover:text-red-400 transition-colors')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burst animation on wishlist */}
      <AnimatePresence>
        {isWishlisted && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-red-500"
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isWishlisted ? 'Saved' : 'Save'}
        </span>
      )}
    </motion.button>
  );
};

export default WishlistButton;
