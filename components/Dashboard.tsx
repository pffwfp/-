import React, { useMemo } from 'react';
import { Product, ProductStats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  onNavigateToList: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ products, onNavigateToList }) => {
  const stats: ProductStats = useMemo(() => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    let expired = 0;
    let expiringSoon = 0;
    let valid = 0;

    products.forEach(p => {
      const expDate = new Date(p.expiryDate);
      if (expDate < today) {
        expired++;
      } else if (expDate <= thirtyDaysFromNow) {
        expiringSoon++;
      } else {
        valid++;
      }
    });

    return { total: products.length, expired, expiringSoon, valid };
  }, [products]);

  const chartData = [
    { name: 'Expired', value: stats.expired, color: '#EF4444' }, // Red-500
    { name: 'Expiring Soon', value: stats.expiringSoon, color: '#F59E0B' }, // Amber-500
    { name: 'Valid', value: stats.valid, color: '#10B981' }, // Emerald-500
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <header className="px-6 pt-8 pb-4 bg-white shadow-sm sticky top-0 z-40">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Hello, manage your inventory health.</p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-4">
        <div 
            onClick={onNavigateToList}
            className="bg-red-50 p-4 rounded-2xl border border-red-100 shadow-sm active:scale-95 transition-transform cursor-pointer"
        >
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <AlertTriangle size={20} />
            <span className="font-semibold text-sm">Expired</span>
          </div>
          <span className="text-3xl font-bold text-gray-900">{stats.expired}</span>
          <p className="text-xs text-red-400 mt-1">Action needed</p>
        </div>

        <div 
            onClick={onNavigateToList}
            className="bg-amber-50 p-4 rounded-2xl border border-amber-100 shadow-sm active:scale-95 transition-transform cursor-pointer"
        >
          <div className="flex items-center space-x-2 text-amber-600 mb-2">
            <Clock size={20} />
            <span className="font-semibold text-sm">Soon</span>
          </div>
          <span className="text-3xl font-bold text-gray-900">{stats.expiringSoon}</span>
          <p className="text-xs text-amber-400 mt-1">Next 30 days</p>
        </div>
      </div>

      <div className="px-4">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Status</h2>
            <div className="h-48 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  No data available
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
                {chartData.map(d => (
                    <div key={d.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                        <span className="text-xs text-gray-600">{d.name}</span>
                    </div>
                ))}
            </div>
         </div>
      </div>

      <div className="px-4">
        <div className="bg-emerald-50 p-4 rounded-2xl flex items-center justify-between border border-emerald-100">
           <div>
               <h3 className="text-emerald-800 font-semibold">Good to go</h3>
               <p className="text-emerald-600 text-xs mt-1">{stats.valid} items in good condition</p>
           </div>
           <CheckCircle className="text-emerald-500" size={28} />
        </div>
      </div>
    </div>
  );
};
