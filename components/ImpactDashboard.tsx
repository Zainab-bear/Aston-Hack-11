
import React from 'react';
import { ImpactStats } from '../types';
import { 
  XAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { Clock, Recycle, Wind, TrendingUp, Sun, Droplets } from 'lucide-react';

interface ImpactDashboardProps {
  stats: ImpactStats;
}

const data = [
  { name: 'Mon', impact: 12 },
  { name: 'Tue', impact: 19 },
  { name: 'Wed', impact: 15 },
  { name: 'Thu', impact: 28 },
  { name: 'Fri', impact: 22 },
  { name: 'Sat', impact: 35 },
  { name: 'Sun', impact: 42 },
];

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ stats }) => {
  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-blue-900 text-shadow-aero">Community Vitals</h2>
        <p className="text-blue-700/70 font-bold">Tracking the pulse of our shared ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Hours Shared', value: stats.hoursShared, icon: Clock, color: 'from-blue-400 to-blue-600', sub: 'Social energy' },
          { label: 'Items Saved', value: stats.itemsSaved, icon: Recycle, color: 'from-green-400 to-green-600', sub: 'Waste reduction' },
          { label: 'CO2 Offset', value: stats.co2SavedKg.toFixed(1) + 'kg', icon: Wind, color: 'from-cyan-400 to-cyan-600', sub: 'Air quality' },
          { label: 'Growth rate', value: `+${stats.communityGrowth}%`, icon: TrendingUp, color: 'from-emerald-400 to-emerald-600', sub: 'Expanding roots' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-6 flex flex-col items-center text-center aero-shine border-white/60 shadow-xl hover:scale-105 transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-lg flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-blue-900 mb-1">{stat.value}</p>
            <p className="text-[10px] font-bold text-blue-400/60 uppercase">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 h-96 flex flex-col shadow-2xl aero-shine">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-blue-900">Ecosystem Activity</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#1e40af" fontSize={11} fontWeight="800" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '20px', border: 'none', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: '800', color: '#1e40af' }}
                />
                <Area type="monotone" dataKey="impact" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorImpact)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-10 h-96 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-xl group-hover:scale-150 transition-all duration-1000"></div>
          
          <div className="relative mb-8">
            <div className="w-40 h-40 bg-gradient-to-tr from-green-300 to-blue-300 rounded-full shadow-inner flex items-center justify-center aero-shine border-4 border-white/50">
              <Wind className="text-white w-20 h-20 drop-shadow-lg animate-spin-slow" />
            </div>
            <Sun className="absolute -top-4 -right-4 text-yellow-400 w-12 h-12 animate-pulse" />
            <Droplets className="absolute -bottom-4 -left-4 text-blue-400 w-12 h-12 animate-bounce" />
          </div>
          
          <h3 className="text-3xl font-black text-blue-900 mb-2">Neighborhood Vitality</h3>
          <p className="text-lg font-bold text-green-600 mb-4">OPTIMAL CONDITION</p>
          <div className="w-full h-4 bg-white/40 rounded-full overflow-hidden shadow-inner max-w-xs">
            <div className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 w-[92%] shadow-lg"></div>
          </div>
          <p className="text-xs font-bold text-blue-800/60 mt-4 uppercase tracking-widest">Efficiency: 92.4%</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
