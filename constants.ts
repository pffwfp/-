import { Product, Category, StorageLocation } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ibuprofen Tablets',
    category: Category.MEDICINE,
    expiryDate: '2023-10-15', // Expired
    location: Category.MEDICINE ? StorageLocation.CABINET : StorageLocation.BATHROOM,
    image: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    name: 'Vitamin C Serum',
    category: Category.COSMETICS,
    expiryDate: '2024-06-01', // Expiring soon (assuming current date is roughly around this)
    location: StorageLocation.BATHROOM,
    image: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: '3',
    name: 'Antibiotic Ointment',
    category: Category.MEDICINE,
    expiryDate: '2025-12-31', // Valid
    location: StorageLocation.FRIDGE,
    image: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: '4',
    name: 'Sunscreen SPF 50',
    category: Category.COSMETICS,
    expiryDate: '2023-12-01', // Expired recently
    location: StorageLocation.BEDROOM,
    image: 'https://picsum.photos/100/100?random=4'
  },
  {
    id: '5',
    name: 'Cough Syrup',
    category: Category.MEDICINE,
    expiryDate: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0], // Expiring in 15 days
    location: StorageLocation.CABINET,
    image: 'https://picsum.photos/100/100?random=5'
  }
];

export const MOCK_SCANNED_ITEMS = [
  { name: 'Aspirin 500mg', category: Category.MEDICINE },
  { name: 'Moisturizing Cream', category: Category.COSMETICS },
  { name: 'Eye Drops', category: Category.MEDICINE },
];
