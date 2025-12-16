import React, { useState } from 'react';
import { Category, Product, StorageLocation } from '../types';
import { MOCK_SCANNED_ITEMS } from '../constants';
import { Scan, Save, Loader2, Calendar, MapPin, Tag, X } from 'lucide-react';

interface AddProductProps {
  onAdd: (product: Product) => void;
  onCancel: () => void;
}

export const AddProduct: React.FC<AddProductProps> = ({ onAdd, onCancel }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: Category.MEDICINE,
    expiryDate: '',
    location: StorageLocation.CABINET
  });

  const handleScan = () => {
    setIsScanning(true);
    // Simulate API call/Camera scan
    setTimeout(() => {
      const randomItem = MOCK_SCANNED_ITEMS[Math.floor(Math.random() * MOCK_SCANNED_ITEMS.length)];
      setFormData(prev => ({
        ...prev,
        name: randomItem.name,
        category: randomItem.category
      }));
      setIsScanning(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.expiryDate) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      expiryDate: formData.expiryDate,
      location: formData.location,
      image: `https://picsum.photos/100/100?random=${Date.now()}`
    };
    onAdd(newProduct);
  };

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      <div className="bg-white p-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold">Add Item</h2>
        <button onClick={onCancel} className="p-2 bg-gray-100 rounded-full">
            <X size={20} className="text-gray-600"/>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Scan Button */}
        <button
          type="button"
          onClick={handleScan}
          disabled={isScanning}
          className="w-full bg-gray-900 text-white py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-transform"
        >
          {isScanning ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Scan />
          )}
          <span className="font-medium">Scan Barcode</span>
        </button>
        <p className="text-center text-xs text-gray-400">
           Simulates identifying a product via camera
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Tag size={16} /> Product Name
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Ibuprofen"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Tag size={16} /> Category
                </label>
                <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                {Object.values(Category).map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={16} /> Location
                </label>
                <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value as StorageLocation })}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                {Object.values(StorageLocation).map((l) => (
                    <option key={l} value={l}>{l}</option>
                ))}
                </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> Expiry Date
            </label>
            <input
              required
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
