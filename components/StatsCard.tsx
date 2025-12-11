import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, color = "bg-white" }) => {
  return (
    <div className={`${color} rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        {trend && <p className="text-xs text-green-600 mt-1 font-bold">{trend}</p>}
      </div>
      <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;