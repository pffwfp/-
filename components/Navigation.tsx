import React from 'react';
import { Home, List, PlusCircle, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'list', icon: List, label: 'My Items' },
    { id: 'add', icon: PlusCircle, label: 'Add', isSpecial: true },
    { id: 'advisor', icon: Sparkles, label: 'Advisor' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe pt-2 z-50">
      <div className="flex justify-around items-end h-16 pb-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          if (item.isSpecial) {
             return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg transform transition-transform active:scale-95">
                  <Icon size={32} />
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
             );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center w-16"
            >
              <Icon 
                size={24} 
                className={`mb-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
