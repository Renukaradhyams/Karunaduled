import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, formatProductsForEmail, generateEmailSummary } from '@/config/emailConfig';

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  products: Array<{
    productId: string;
    productName: string;
    wattage: number;
    colorTemperature: string;
    applicationType: string;
    quantity: number;
    notes?: string;
  }>;
  additionalNotes?: string;
}

// Send contact form email
export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATES.CONTACT,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        message: data.message,
        to_name: 'Karunadu LED Team',
      }
    );
    
    console.log('Contact email sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    throw error;
  }
};

// Send product enquiry email
export const sendEnquiryEmail = async (data: EnquiryFormData): Promise<boolean> => {
  try {
    const summary = generateEmailSummary(data.products);
    const productsFormatted = formatProductsForEmail(data.products);
    
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATES.ENQUIRY,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        company: data.company || 'Not provided',
        total_products: summary.totalProducts,
        total_items: summary.totalItems,
        products_list: productsFormatted,
        products_summary: summary.productList,
        additional_notes: data.additionalNotes || 'None',
        to_name: 'Karunadu LED Sales Team',
      }
    );
    
    console.log('Enquiry email sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    throw error;
  }
};

// Validate EmailJS configuration
export const isEmailConfigured = (): boolean => {
  return (
    EMAIL_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
    EMAIL_CONFIG.TEMPLATES.CONTACT !== 'YOUR_CONTACT_TEMPLATE_ID'
  );
};

export default {
  sendContactEmail,
  sendEnquiryEmail,
  isEmailConfigured,
};
