
import React, { useState } from 'react';
import { Seed } from '../types';
import { Search, Filter, Sprout, Briefcase, Box, Users } from 'lucide-react';

interface SeedBankProps {
  seeds: Seed[];
}

const SeedBank: React.FC<SeedBankProps> = ({ seeds }) => {
  const [filter, setFilter] = useState<string>('All');
  
  const filteredSeeds = filter === 'All' ? seeds : seeds.filter(s => s.category === filter);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-hover:text-blue-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search the Seed Bank..."
            className="w-full pl-12 pr-6 py-4 glass-card rounded-2xl border border-white focus:outline-none focus:ring-4 focus:ring-blue-400/20 text-blue-900 font-medium placeholder-blue-400 shadow-inner"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto px-1">
          {['All', 'Skill', 'Item', 'Help', 'Workshop'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'glass-card text-blue-700 hover:bg-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSeeds.map((seed) => (
          <div key={seed.id} className="glass-card rounded-3xl p-5 hover:scale-[1.02] transition-all cursor-pointer aero-gloss border-blue-100/30">
            <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center shadow-md ${
              seed.category === 'Skill' ? 'bg-orange-100 text-orange-500' :
              seed.category === 'Item' ? 'bg-blue-100 text-blue-500' :
              seed.category === 'Workshop' ? 'bg-green-100 text-green-500' : 'bg-purple-100 text-purple-500'
            }`}>
              {seed.category === 'Skill' && <Briefcase size={24} />}
              {seed.category === 'Item' && <Box size={24} />}
              {seed.category === 'Workshop' && <Users size={24} />}
              {seed.category === 'Help' && <Heart size={24} />}
            </div>
            <h4 className="text-lg font-bold text-blue-900 mb-2 truncate">{seed.title}</h4>
            <p className="text-sm text-blue-800/70 mb-4 line-clamp-2">{seed.description}</p>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-green-600">Impact: +{seed.impactScore}</span>
              <span className="text-blue-400">{seed.location}</span>
            </div>
          </div>
        ))}
        {filteredSeeds.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Sprout size={48} className="mx-auto text-blue-200 mb-4" />
            <p className="text-blue-800/50 font-bold">No seeds found in this area yet. Why not plant one?</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple reusable icon components used above
const Heart: React.FC<{size: number}> = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.04 3 5.5L12 21l7-7z"/></svg>;

export default SeedBank;
