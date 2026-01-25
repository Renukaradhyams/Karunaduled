import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useProductSelection } from '@/context/ProductSelectionContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EnquirySummaryPage: React.FC = () => {
  const { selectedProducts, removeProduct, updateProduct, getTotalCount } = useProductSelection();

  const handleQuantityChange = (selectionId: string, delta: number) => {
    const product = selectedProducts.find((p) => p.selectionId === selectionId);
    if (product) {
      const newQuantity = Math.max(1, product.quantity + delta);
      updateProduct(selectionId, { quantity: newQuantity });
    }
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              No Products Selected
            </h1>
            <p className="text-muted-foreground">
              Browse our products and add items to your selection to request a quote.
            </p>
            <Link to="/products">
              <Button className="gap-2 glow-primary-sm">
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* Header */}
      <section className="py-8 bg-glow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Your <span className="text-gradient">Selection</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Review your selected products before submitting your enquiry
            </p>
          </div>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <Badge className="px-4 py-2 text-base badge-glow">
                {selectedProducts.length} Product{selectedProducts.length !== 1 ? 's' : ''}
              </Badge>
              <Badge className="px-4 py-2 text-base badge-glow">
                {getTotalCount()} Total Item{getTotalCount() !== 1 ? 's' : ''}
              </Badge>
            </div>

            {/* Products List */}
            <div className="space-y-4">
              {selectedProducts.map((item, index) => (
                <div
                  key={item.selectionId}
                  className="card-glow p-4 md:p-6 rounded-xl animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        {item.productName}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{item.wattage}W</Badge>
                        <Badge variant="secondary">{item.colorTemperature}</Badge>
                        <Badge variant="secondary">{item.applicationType}</Badge>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground">Note: {item.notes}</p>
                      )}
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary/30"
                          onClick={() => handleQuantityChange(item.selectionId, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-primary/30"
                          onClick={() => handleQuantityChange(item.selectionId, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeProduct(item.selectionId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="outline" className="w-full sm:w-auto gap-2 border-primary/30">
                  <Plus className="w-4 h-4" />
                  Add More Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="w-full sm:w-auto gap-2 glow-primary-sm">
                  Proceed to Enquiry Form
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnquirySummaryPage;
