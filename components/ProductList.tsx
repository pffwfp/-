import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { Search, Filter, Trash2, Droplet, Pill, Apple, Box } from 'lucide-react';
import { getExpiryAdvice } from '../services/geminiService';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onSelectProduct }) => {
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => filterCategory === 'All' || p.category === filterCategory)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
  }, [products, filterCategory, searchQuery]);

  const getDaysRemaining = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(dateStr);
    const diffTime = exp.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (days: number) => {
    if (days < 0) return 'bg-red-100 text-red-700 border-red-200';
    if (days <= 30) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  const getStatusText = (days: number) => {
    if (days < 0) return `Expired ${Math.abs(days)} days ago`;
    if (days === 0) return 'Expires Today';
    if (days <= 30) return `${days} days left`;
    return 'Valid';
  };

  const getIcon = (cat: Category) => {
      switch(cat) {
          case Category.MEDICINE: return <Pill size={16} />;
          case Category.COSMETICS: return <Droplet size={16} />;
          case Category.FOOD: return <Apple size={16} />;
          default: return <Box size={16} />;
      }
  };

  return (
    <div className="h-full bg-gray-50 pb-24">
      {/* Header & Filter */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold mb-4">My Items</h1>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
          {['All', ...Object.values(Category)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat as Category | 'All')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <Box className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500">No items found.</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const days = getDaysRemaining(product.expiryDate);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all"
              >
                <div className="flex items-center space-x-4 flex-1" onClick={() => onSelectProduct(product)}>
                   <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                       <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                       <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                       <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-2">
                            <span className="flex items-center gap-1">{getIcon(product.category)} {product.category}</span>
                            <span>•</span>
                            <span>{product.location}</span>
                       </div>
                   </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(days)}`}>
                        {getStatusText(days)}
                    </span>
                    <div className="text-xs text-gray-400">{product.expiryDate}</div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
                        className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
