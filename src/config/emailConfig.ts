// ============================================
// CENTRALIZED EMAILJS CONFIGURATION
// Update values here to change across all forms
// ============================================

export const EMAIL_CONFIG = {
  // EmailJS Service ID - Get from EmailJS Dashboard
  SERVICE_ID: 'karunaduled',
  
  // EmailJS Template IDs
  TEMPLATES: {
    // Contact form template
    CONTACT: 'karunadu',
    // Product enquiry template
    ENQUIRY: 'karunadu',
    // General template (can be used as fallback)
    GENERAL: 'karunadu',
  },
  
  // EmailJS Public Key - Get from EmailJS Dashboard > Account > API Keys
  PUBLIC_KEY: 'KFb0LvmNUrGsiqu0H',
};

// Helper function to format product selection for email
export const formatProductsForEmail = (products: Array<{
  productId: string;
  productName: string;
  wattage: number;
  colorTemperature: string;
  applicationType: string;
  quantity: number;
  notes?: string;
}>) => {
  if (!products || products.length === 0) return 'No products selected';
  
  return products.map((item, index) => 
    `${index + 1}. ${item.productName}
   - Wattage: ${item.wattage}W
   - Color: ${item.colorTemperature}
   - Application: ${item.applicationType}
   - Quantity: ${item.quantity}
   ${item.notes ? `- Notes: ${item.notes}` : ''}`
  ).join('\n\n');
};

// Helper function to generate email summary
export const generateEmailSummary = (products: Array<{
  productId: string;
  productName: string;
  quantity: number;
}>) => {
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalProducts = products.length;
  
  return {
    totalProducts,
    totalItems,
    productList: products.map(p => `${p.productName} (Qty: ${p.quantity})`).join(', '),
  };
};
