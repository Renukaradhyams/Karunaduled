export interface ProductSpecifications {
  lumenOutput: string;
  voltage: string;
  frequency: string;
  powerFactor: string;
  lifeHours: string;
  beamAngle: string;
  bodyMaterial: string;
  warranty: string;
  ipRating?: string;
  cri?: string;
  batteryBackup?: string;
  solarPanel?: string;
  battery?: string;
  length?: string;
  connectivity?: string;
  tiltAngle?: string;
  control?: string;
  height?: string;
  bendRadius?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  images: string[];
  wattageOptions: number[];
  colorTemperatures: string[];
  applicationTypes: string[];
  bisCertified: boolean;
  specifications: ProductSpecifications;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
}

export interface SelectedProduct {
  productId: string;
  productName: string;
  wattage: number;
  colorTemperature: string;
  applicationType: string;
  quantity: number;
  notes?: string;
  selectionId: string;
}

export interface EnquiryFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  customerType: 'Individual' | 'Electrician' | 'Contractor' | 'Business';
  expectedDelivery: string;
  installationRequired: boolean;
  isBulkOrder: boolean;
  message: string;
  selectedProducts: SelectedProduct[];
}
