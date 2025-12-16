export enum Category {
  MEDICINE = 'Medicine',
  COSMETICS = 'Cosmetics',
  FOOD = 'Food',
  OTHER = 'Other'
}

export enum StorageLocation {
  FRIDGE = 'Fridge',
  CABINET = 'Medicine Cabinet',
  BATHROOM = 'Bathroom',
  BEDROOM = 'Bedroom'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  expiryDate: string; // ISO Date string YYYY-MM-DD
  location: StorageLocation;
  openedDate?: string;
  image?: string; // URL placeholder
}

export interface ProductStats {
  total: number;
  expired: number;
  expiringSoon: number; // Within 30 days
  valid: number;
}
