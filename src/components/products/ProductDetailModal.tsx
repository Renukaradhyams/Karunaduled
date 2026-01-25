import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Plus, Minus, Check, Sparkles, ZoomIn } from 'lucide-react';
import { Product } from '@/types/product';
import { useProductSelection } from '@/context/ProductSelectionContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import ImageLightbox from '@/components/ui/image-lightbox';
import WishlistButton from '@/components/wishlist/WishlistButton';
import RelatedProducts from '@/components/products/RelatedProducts';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSwitchProduct?: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose, onSwitchProduct }) => {
  const { addProduct } = useProductSelection();
  const [selectedWattage, setSelectedWattage] = useState<number>(product.wattageOptions[0]);
  const [selectedColorTemp, setSelectedColorTemp] = useState<string>(product.colorTemperatures[0]);
  const [selectedApplication, setSelectedApplication] = useState<string>(product.applicationTypes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!isOpen) return null;

  const handleAddToSelection = () => {
    addProduct({
      productId: product.id,
      productName: product.name,
      wattage: selectedWattage,
      colorTemperature: selectedColorTemp,
      applicationType: selectedApplication,
      quantity,
      notes: notes || undefined,
      selectionId: `${product.id}-${Date.now()}`,
    });

    setIsAdded(true);
    toast({
      title: '✨ Product Added!',
      description: `${product.name} (${selectedWattage}W) added to your selection.`,
    });

    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
      setNotes('');
    }, 1500);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div 
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
          
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-300"
            aria-label="Close modal"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-secondary/50 to-background group overflow-hidden">
              <motion.img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => openLightbox(0)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Zoom Indicator */}
              <motion.div
                className="absolute bottom-4 right-4 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border cursor-pointer"
                onClick={() => openLightbox(0)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ZoomIn className="w-5 h-5 text-foreground" />
              </motion.div>
              
              {/* Badges Row - BIS + Wishlist */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                {product.bisCertified && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className="gap-1 bg-primary text-primary-foreground shadow-lg">
                      <Shield className="w-3 h-3" />
                      BIS Certified
                    </Badge>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="ml-auto"
                >
                  <WishlistButton productId={product.id} productName={product.name} size="md" />
                </motion.div>
              </div>
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 space-y-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {product.name}
                </h2>
                <p className="text-muted-foreground mt-2">{product.shortDescription}</p>
              </motion.div>

              {/* Specifications Table */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    { label: 'Lumen Output', value: product.specifications.lumenOutput },
                    { label: 'Voltage', value: product.specifications.voltage },
                    { label: 'Life Hours', value: product.specifications.lifeHours },
                    { label: 'Beam Angle', value: product.specifications.beamAngle },
                    { label: 'Power Factor', value: product.specifications.powerFactor },
                    { label: 'Warranty', value: product.specifications.warranty },
                  ].map((spec, index) => (
                    <motion.div 
                      key={spec.label}
                      className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-default group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-muted-foreground text-xs">{spec.label}:</span>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{spec.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Selection Options */}
              <motion.div 
                className="space-y-4 border-t border-border pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-heading font-semibold text-foreground">Configure Your Selection</h3>

                {/* Wattage */}
                <div className="space-y-2">
                  <Label>Wattage</Label>
                  <Select
                    value={selectedWattage.toString()}
                    onValueChange={(val) => setSelectedWattage(Number(val))}
                  >
                    <SelectTrigger className="input-glow transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.wattageOptions.map((watt) => (
                        <SelectItem key={watt} value={watt.toString()}>
                          {watt}W
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Temperature */}
                <div className="space-y-2">
                  <Label>Color Temperature</Label>
                  <Select value={selectedColorTemp} onValueChange={setSelectedColorTemp}>
                    <SelectTrigger className="input-glow transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colorTemperatures.map((temp) => (
                        <SelectItem key={temp} value={temp}>
                          {temp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Application Type */}
                <div className="space-y-2">
                  <Label>Application Type</Label>
                  <Select value={selectedApplication} onValueChange={setSelectedApplication}>
                    <SelectTrigger className="input-glow transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.applicationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </motion.div>
                    <motion.span 
                      className="text-xl font-semibold w-12 text-center text-primary"
                      key={quantity}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {quantity}
                    </motion.span>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    placeholder="Any specific requirements or preferences..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-glow resize-none transition-all duration-300"
                    rows={2}
                  />
                </div>
              </motion.div>

              {/* Add Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={`w-full gap-2 transition-all duration-500 ${
                      isAdded 
                        ? 'bg-success hover:bg-success/90 shadow-lg shadow-success/30' 
                        : 'glow-primary-sm hover:shadow-lg hover:shadow-primary/30'
                    }`}
                    size="lg"
                    onClick={handleAddToSelection}
                    disabled={isAdded}
                  >
                    <AnimatePresence mode="wait">
                      {isAdded ? (
                        <motion.div
                          key="added"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Check className="w-5 h-5" />
                          Added to Selection!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Plus className="w-5 h-5" />
                          Add to Selection
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Related Products */}
              <RelatedProducts 
                currentProduct={product} 
                onProductClick={(p) => {
                  if (onSwitchProduct) {
                    onSwitchProduct(p);
                  }
                }} 
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={product.images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt={product.name}
      />
    </>
  );
};

export default ProductDetailModal;
