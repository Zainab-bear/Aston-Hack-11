
import React from 'react';
import { Seed } from '../types';
import { MapPin, Clock, Sprout, Heart, ArrowRight, Zap } from 'lucide-react';

interface EcosystemProps {
  seeds: Seed[];
}

const Ecosystem: React.FC<EcosystemProps> = ({ seeds }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <section className="text-center py-6">
        <h2 className="text-5xl md:text-6xl font-black text-blue-900 mb-4 tracking-tight text-shadow-aero">
          Your Vibrant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-emerald-400">Ecosystem</span>
        </h2>
        <p className="text-xl text-blue-800/80 max-w-2xl mx-auto font-bold leading-relaxed">
          The future we were promised is built on connection. 🌿
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {seeds.map((seed) => (
          <div key={seed.id} className="glass-card p-0 hover:translate-y-[-8px] transition-all duration-500 group cursor-pointer flex flex-col h-full aero-shine shadow-[0_15px_35px_rgba(0,0,0,0.05)] border-white/80">
            <div className={`h-2 w-full rounded-t-3xl bg-gradient-to-r ${seed.type === 'Offer' ? 'from-green-400 to-emerald-500' : 'from-blue-400 to-cyan-500'}`}></div>
            
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-5">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-inner ${
                  seed.type === 'Offer' ? 'bg-green-100/80 text-green-700' : 'bg-blue-100/80 text-blue-700'
                }`}>
                  {seed.type}: {seed.category}
                </span>
                <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1.5 bg-white/40 px-3 py-1 rounded-full">
                  <Clock size={12} />
                  ACTUAL TIME
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-blue-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{seed.title}</h3>
              <p className="text-blue-800/70 text-sm mb-8 flex-grow font-medium leading-relaxed">
                {seed.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-300 to-white border-2 border-white flex items-center justify-center text-xs font-black text-blue-800 shadow-lg">
                    {seed.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-xs">
                    <p className="font-black text-blue-900">{seed.author}</p>
                    <p className="text-blue-500 font-bold flex items-center gap-0.5"><MapPin size={10} /> {seed.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2.5 bg-white/60 hover:bg-white rounded-full text-blue-500 transition-all hover:scale-125 shadow-md border border-white">
                    <Heart size={20} fill={seed.id === '1' ? 'currentColor' : 'none'} />
                  </button>
                  <button className="px-5 py-2.5 bg-gradient-to-b from-blue-400 to-blue-600 text-white text-xs font-black rounded-full flex items-center gap-2 shadow-[0_5px_15px_rgba(37,99,235,0.3)] hover:scale-105 transition-all aero-shine uppercase tracking-wider">
                    Connect <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 glass-card p-10 bg-gradient-to-br from-blue-50/50 via-white/40 to-green-50/50 border-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -ml-48 -mb-48 transition-all group-hover:scale-110"></div>

        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest mb-4">
              <Zap size={14} /> Impact Insight
            </div>
            <h3 className="text-4xl font-black text-blue-900 mb-4 leading-tight">Grow Your Local Roots</h3>
            <p className="text-lg text-blue-800/80 mb-8 font-bold">
              Every "seed" shared strengthens our community bond. This neighborhood has offset over <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-lg">200kg of CO2</span> this week!
            </p>
            <button className="px-10 py-4 bg-white text-blue-600 font-black text-lg rounded-full shadow-2xl hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto lg:mx-0 aero-shine border border-blue-50">
              Explore Map View <MapPin size={22} className="text-green-500" />
            </button>
          </div>
          <div className="relative w-72 h-72 flex-shrink-0">
             <div className="absolute inset-0 bg-blue-400/10 rounded-full animate-pulse blur-3xl"></div>
             <Sprout className="w-full h-full text-green-500 drop-shadow-[0_20px_40px_rgba(34,197,94,0.3)] animate-bounce duration-[4000ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecosystem;
