import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt = 'Product image',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <motion.button
              className="p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-primary/20 hover:border-primary transition-all"
              onClick={toggleZoom}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isZoomed ? (
                <ZoomOut className="w-5 h-5 text-foreground" />
              ) : (
                <ZoomIn className="w-5 h-5 text-foreground" />
              )}
            </motion.button>
            <motion.button
              className="p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-destructive/20 hover:border-destructive transition-all"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                className="absolute left-4 z-10 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-primary/20 hover:border-primary transition-all"
                onClick={goToPrevious}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </motion.button>
              <motion.button
                className="absolute right-4 z-10 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-primary/20 hover:border-primary transition-all"
                onClick={goToNext}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </motion.button>
            </>
          )}

          {/* Main Image */}
          <motion.div
            className="relative z-10 max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${alt} ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain cursor-zoom-in"
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isZoomed ? 1.5 : 1,
              }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onClick={toggleZoom}
              style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
            />
          </motion.div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 p-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-primary shadow-lg shadow-primary/30'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsZoomed(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-primary/20"
                      layoutId="activeThumb"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Image Counter */}
          <motion.div
            className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
          >
            <span className="text-sm font-medium text-foreground">
              {currentIndex + 1} / {images.length}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
