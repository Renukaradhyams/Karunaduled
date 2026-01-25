import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SelectedProduct } from '@/types/product';

interface ProductSelectionContextType {
  selectedProducts: SelectedProduct[];
  addProduct: (product: SelectedProduct) => void;
  removeProduct: (selectionId: string) => void;
  updateProduct: (selectionId: string, updates: Partial<SelectedProduct>) => void;
  clearSelection: () => void;
  getTotalCount: () => number;
}

const ProductSelectionContext = createContext<ProductSelectionContextType | undefined>(undefined);

export const ProductSelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const addProduct = (product: SelectedProduct) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  const removeProduct = (selectionId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.selectionId !== selectionId));
  };

  const updateProduct = (selectionId: string, updates: Partial<SelectedProduct>) => {
    setSelectedProducts(prev =>
      prev.map(p => (p.selectionId === selectionId ? { ...p, ...updates } : p))
    );
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  const getTotalCount = () => {
    return selectedProducts.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <ProductSelectionContext.Provider
      value={{
        selectedProducts,
        addProduct,
        removeProduct,
        updateProduct,
        clearSelection,
        getTotalCount,
      }}
    >
      {children}
    </ProductSelectionContext.Provider>
  );
};

export const useProductSelection = () => {
  const context = useContext(ProductSelectionContext);
  if (context === undefined) {
    throw new Error('useProductSelection must be used within a ProductSelectionProvider');
  }
  return context;
};
