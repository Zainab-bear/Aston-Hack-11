
import React from 'react';
import { Leaf, Award, Sun, Droplets, ArrowUpRight } from 'lucide-react';

const MyGarden: React.FC = () => {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="glass-card rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 aero-gloss">
        <div className="relative group">
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-400 to-green-300 border-[8px] border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
             <img src="https://picsum.photos/seed/community/400/400" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 border border-blue-50">
             <Award size={32} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-black text-blue-900 mb-2">Alex Gardner</h2>
          <p className="text-xl font-bold text-green-600 mb-6 flex items-center justify-center md:justify-start gap-2">
            Master Gardener • Level 8 <ArrowUpRight size={20} />
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Seeds Planted', val: '24', icon: Sun },
              { label: 'Seeds Grown', val: '18', icon: Droplets },
              { label: 'Endorsements', val: '42', icon: Leaf },
            ].map((i, idx) => (
              <div key={idx} className="bg-white/40 rounded-3xl p-4 text-center">
                <p className="text-2xl font-black text-blue-900">{i.val}</p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{i.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-[2.5rem] p-8 aero-gloss">
          <h3 className="text-2xl font-black text-blue-900 mb-6">Active Growing</h3>
          <div className="space-y-4">
            {[
              { title: 'Learn Basic Coding', progress: 75, status: 'Growing' },
              { title: 'Neighborhood Tool Swap', progress: 40, status: 'Nurturing' },
              { title: 'Community Compost Workshop', progress: 100, status: 'Bloomed' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/30 rounded-2xl p-4 border border-white/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-900">{item.title}</span>
                  <span className="text-xs font-black text-blue-600 uppercase">{item.status}</span>
                </div>
                <div className="h-3 bg-blue-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full shadow-lg"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 aero-gloss overflow-hidden relative">
          <h3 className="text-2xl font-black text-blue-900 mb-6">Recent Badges</h3>
          <div className="flex flex-wrap gap-4">
            {['Zero Waste Hero', 'Skill Sharer', 'Early Sprouter', 'Social Butterfly', 'Helper Hand'].map((badge, idx) => (
              <div key={idx} className="px-5 py-3 bg-white/60 rounded-full text-sm font-bold text-blue-600 shadow-sm border border-blue-50 hover:scale-110 transition-transform cursor-pointer">
                ✨ {badge}
              </div>
            ))}
          </div>
          {/* Aero Watermark */}
          <Droplets className="absolute -bottom-10 -right-10 text-blue-200/20 w-48 h-48 -rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default MyGarden;
