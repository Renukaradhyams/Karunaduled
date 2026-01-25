import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, Send, CheckCircle, User, Mail, Building, CalendarDays, Wrench, Package } from 'lucide-react';
import { useProductSelection } from '@/context/ProductSelectionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address').max(255),
  address: z.string().max(500).optional(),
  customerType: z.enum(['Individual', 'Electrician', 'Contractor', 'Business']),
  expectedDelivery: z.string().optional(),
  installationRequired: z.boolean(),
  isBulkOrder: z.boolean(),
  message: z.string().max(1000).optional(),
});

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProducts, clearSelection, getTotalCount } = useProductSelection();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    customerType: 'Individual' as const,
    expectedDelivery: '',
    installationRequired: false,
    isBulkOrder: false,
    message: '',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      toast({
        title: 'Please fix the errors',
        description: 'Some required fields are missing or invalid.',
        variant: 'destructive',
      });
      return;
    }

    // Log form data to console (prepared for API)
    const enquiryData = {
      ...formData,
      selectedProducts,
      totalItems: getTotalCount(),
      submittedAt: new Date().toISOString(),
    };
    console.log('Enquiry Submitted:', enquiryData);

    setIsSubmitted(true);
    clearSelection();
    
    toast({
      title: 'Enquiry Submitted Successfully!',
      description: 'We will contact you within 24 hours.',
    });
  };

  if (isSubmitted) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20 space-y-6 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Thank You!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your enquiry has been submitted successfully. Our team will review your requirements 
              and contact you within 24 hours.
            </p>
            <div className="pt-4 space-y-4">
              <p className="text-muted-foreground">For immediate assistance, call us:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:9986293448">
                  <Button variant="outline" className="gap-2 border-primary/30">
                    <Phone className="w-4 h-4" />
                    9986293448
                  </Button>
                </a>
                <a href="https://wa.me/919986293448" target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 glow-primary-sm">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-8"
              onClick={() => {
                setIsSubmitted(false);
                navigate('/');
              }}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* Header */}
      <section className="py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              {selectedProducts.length > 0 ? (
                <>Submit <span className="text-gradient">Enquiry</span></>
              ) : (
                <>Contact <span className="text-gradient">Us</span></>
              )}
            </h1>
            <p className="text-lg text-muted-foreground">
              {selectedProducts.length > 0
                ? 'Fill in your details to receive a quote for your selected products'
                : 'Get in touch with us for any queries or quotation requests'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card-glow p-6 rounded-xl space-y-6">
                <h3 className="font-heading font-semibold text-lg text-foreground">Contact Information</h3>
                
                <div className="space-y-4">
                  <a
                    href="tel:9986293448"
                    className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">9986293448</p>
                      <p className="text-sm">Primary Contact</p>
                    </div>
                  </a>
                  <a
                    href="tel:8073685049"
                    className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">8073685049</p>
                      <p className="text-sm">Alternate Contact</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Visit Us</p>
                      <p className="text-sm">
                        #2, 2nd Main Road, 3rd Cross,<br />
                        Gandhinagar, Vijayanagar Layout,<br />
                        Harihara – 577601
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <a href="https://wa.me/919986293448" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2 glow-primary-sm">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Us
                    </Button>
                  </a>
                </div>
              </div>

              {/* Selected Products Summary */}
              {selectedProducts.length > 0 && (
                <div className="card-glow p-6 rounded-xl space-y-4">
                  <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Selected Products
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedProducts.map((item) => (
                      <div key={item.selectionId} className="p-3 bg-secondary rounded-lg">
                        <p className="font-medium text-foreground text-sm">{item.productName}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">{item.wattage}W</Badge>
                          <Badge variant="outline" className="text-xs">Qty: {item.quantity}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total: {selectedProducts.length} product(s), {getTotalCount()} item(s)
                  </p>
                </div>
              )}
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="card-glow p-6 md:p-8 rounded-xl space-y-6">
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  {selectedProducts.length > 0 ? 'Enquiry Details' : 'Send us a Message'}
                </h3>

                {/* Customer Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`input-glow ${errors.fullName ? 'border-destructive' : ''}`}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobile Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="mobileNumber"
                      placeholder="10-digit mobile number"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      className={`input-glow ${errors.mobileNumber ? 'border-destructive' : ''}`}
                    />
                    {errors.mobileNumber && <p className="text-xs text-destructive">{errors.mobileNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`input-glow ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerType" className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Customer Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.customerType}
                      onValueChange={(val) => handleInputChange('customerType', val)}
                    >
                      <SelectTrigger className="input-glow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Electrician">Electrician</SelectItem>
                        <SelectItem value="Contractor">Contractor</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address / Project Location
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your address or project location"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="input-glow resize-none"
                    rows={2}
                  />
                </div>

                {/* Additional Options */}
                {selectedProducts.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground">Additional Requirements</h4>

                    <div className="space-y-2">
                      <Label htmlFor="expectedDelivery" className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        Expected Delivery Timeline
                      </Label>
                      <Select
                        value={formData.expectedDelivery}
                        onValueChange={(val) => handleInputChange('expectedDelivery', val)}
                      >
                        <SelectTrigger className="input-glow">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (1-3 days)</SelectItem>
                          <SelectItem value="week">Within a week</SelectItem>
                          <SelectItem value="two-weeks">Within 2 weeks</SelectItem>
                          <SelectItem value="month">Within a month</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="installationRequired"
                          checked={formData.installationRequired}
                          onCheckedChange={(checked) => handleInputChange('installationRequired', !!checked)}
                        />
                        <Label htmlFor="installationRequired" className="flex items-center gap-2 cursor-pointer">
                          <Wrench className="w-4 h-4" />
                          Installation Required
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isBulkOrder"
                          checked={formData.isBulkOrder}
                          onCheckedChange={(checked) => handleInputChange('isBulkOrder', !!checked)}
                        />
                        <Label htmlFor="isBulkOrder" className="flex items-center gap-2 cursor-pointer">
                          <Package className="w-4 h-4" />
                          Bulk Order
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Message / Special Notes</Label>
                  <Textarea
                    id="message"
                    placeholder="Any specific requirements or questions..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="input-glow resize-none"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2 glow-primary-sm">
                  <Send className="w-4 h-4" />
                  Submit Enquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
