import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useProductSelection } from '@/context/ProductSelectionContext';

const FloatingSelectionCounter: React.FC = () => {
  const { getTotalCount, selectedProducts } = useProductSelection();
  const totalItems = getTotalCount();

  if (selectedProducts.length === 0) return null;

  return (
    <Link
      to="/enquiry-summary"
      className="floating-counter flex items-center gap-3 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="font-semibold">
        {selectedProducts.length} Product{selectedProducts.length > 1 ? 's' : ''} • {totalItems} Item{totalItems > 1 ? 's' : ''}
      </span>
    </Link>
  );
};

export default FloatingSelectionCounter;
