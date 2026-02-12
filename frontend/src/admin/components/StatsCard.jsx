import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, color, change, prefix = "" }) => {
  const isPositive = change > 0;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mb-2">
            {prefix}{value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1 font-medium">
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="ml-1 text-slate-500 font-normal">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`
          p-4 rounded-2xl transition-all duration-300 group-hover:scale-110
          ${color}
        `}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;