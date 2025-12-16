import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { AddProduct } from './components/AddProduct';
import { Navigation } from './components/Navigation';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { INITIAL_PRODUCTS } from './constants';
import { Product } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load products from local storage (Simulated persistence)
  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    setActiveTab('list');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSelectForAdvice = (product: Product) => {
      setSelectedProduct(product);
      setActiveTab('advisor');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard products={products} onNavigateToList={() => setActiveTab('list')} />;
      case 'list':
        return (
            <ProductList 
                products={products} 
                onDelete={handleDeleteProduct} 
                onSelectProduct={handleSelectForAdvice}
            />
        );
      case 'add':
        return <AddProduct onAdd={handleAddProduct} onCancel={() => setActiveTab('dashboard')} />;
      case 'advisor':
        return <GeminiAdvisor selectedProduct={selectedProduct} />;
      default:
        return <Dashboard products={products} onNavigateToList={() => setActiveTab('list')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      <main className="h-screen overflow-y-auto no-scrollbar scroll-smooth">
        {renderContent()}
      </main>
      
      {activeTab !== 'add' && (
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}
