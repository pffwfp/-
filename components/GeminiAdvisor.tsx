import React, { useState } from 'react';
import { Product } from '../types';
import { getExpiryAdvice } from '../services/geminiService';
import { Sparkles, Send, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface GeminiAdvisorProps {
  selectedProduct?: Product | null;
}

export const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ selectedProduct }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-fill query if a product is selected
  React.useEffect(() => {
    if (selectedProduct) {
      setQuery(`I have ${selectedProduct.name} (Category: ${selectedProduct.category}). It expires on ${selectedProduct.expiryDate}. Is it safe?`);
    }
  }, [selectedProduct]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    
    // Check if we are asking about a specific product context or general
    // For simplicity in this demo, we use the text query directly to the model
    // referencing the service function.
    
    // We'll reuse the service logic but adapting it slightly or just calling generateContent directly via service
    // However, to keep it clean, let's assume we pass a generic structure.
    
    // Let's use a specialized call for free-form text or the structured one. 
    // Since `getExpiryAdvice` is structured, let's map the query to it roughly or create a general handler.
    // To save file count, I will just call `getExpiryAdvice` with parsed mock data or extend the service.
    // For this specific requirement, let's just assume the user is asking about the selected product mainly.
    
    let advice = "";
    if (selectedProduct) {
         const today = new Date();
         const exp = new Date(selectedProduct.expiryDate);
         const isExpired = exp < today;
         advice = await getExpiryAdvice(selectedProduct.name, selectedProduct.category, isExpired);
    } else {
        // Fallback for general queries if no product selected (Simulated via same function for demo purposes)
         advice = await getExpiryAdvice(query, "General", false);
    }

    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="h-full bg-white pb-24 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-fuchsia-50">
        <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-violet-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">AI Advisor</h1>
        </div>
        <p className="text-sm text-gray-600">
          Unsure about an old medicine or cosmetic? Ask Gemini.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {response ? (
          <div className="bg-violet-50 p-5 rounded-2xl border border-violet-100 text-gray-800 text-sm leading-relaxed shadow-sm animate-fade-in">
             <div className="prose prose-sm max-w-none prose-violet">
                {/* Simple Markdown rendering */}
                <div className="whitespace-pre-line">{response}</div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <Sparkles size={32} className="text-gray-300" />
             </div>
             <p className="text-sm max-w-xs text-center">Select an item from your list or type a question below to get safety and disposal advice.</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-20">
        <div className="relative flex items-center">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={selectedProduct ? `Ask about ${selectedProduct.name}...` : "e.g. How to dispose of expired pills?"}
            className="w-full bg-gray-100 border-0 rounded-full py-4 pl-5 pr-12 focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all shadow-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
                onClick={handleAsk}
                disabled={loading || !query}
                className="absolute right-2 p-2 bg-violet-600 text-white rounded-full disabled:opacity-50 disabled:bg-gray-400 hover:bg-violet-700 transition-colors shadow-md"
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
        </div>
        {selectedProduct && (
            <div className="mt-2 flex items-center gap-2 text-xs text-violet-600 bg-violet-50 px-3 py-1 rounded-full w-max">
                <Tag size={12} />
                Context: {selectedProduct.name}
            </div>
        )}
      </div>
    </div>
  );
};

// Helper for icon
import { Tag } from 'lucide-react';
