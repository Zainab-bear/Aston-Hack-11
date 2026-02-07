
import React, { useState, useMemo } from 'react';
import { 
  Sprout, 
  Leaf, 
  Plus, 
  Activity, 
  Droplets, 
  User, 
  Search,
  Globe,
  Wind
} from 'lucide-react';
import { ViewMode, Seed, ImpactStats } from './types';
import Ecosystem from './components/Ecosystem';
import SeedBank from './components/SeedBank';
import MyGarden from './components/MyGarden';
import ImpactDashboard from './components/ImpactDashboard';
import CreateSeedModal from './components/CreateSeedModal';

const INITIAL_SEEDS: Seed[] = [
  {
    id: '1',
    title: 'Beginner Yoga in the Park',
    description: 'Hosting a small session for beginners at Central Meadow. Everyone is welcome to join and breathe together!',
    category: 'Workshop',
    author: 'Elena Green',
    location: 'Central Park Meadow',
    impactScore: 12,
    type: 'Offer',
    timestamp: new Date(),
    tags: ['Health', 'Community', 'Yoga']
  },
  {
    id: '2',
    title: 'Leftover Artisan Bread',
    description: 'Baked too much sourdough this morning. Three loaves available for neighbors to pick up instead of waste.',
    category: 'Item',
    author: 'Mark Baker',
    location: 'Elm Street',
    impactScore: 5,
    type: 'Offer',
    timestamp: new Date(),
    tags: ['Food', 'ZeroWaste']
  },
  {
    id: '3',
    title: 'Need help fixing a flat tire',
    description: 'Bicycle tire is flat and I don\'t have a pump or patch kit. Would appreciate any help!',
    category: 'Help',
    author: 'Sarah Jenkins',
    location: 'Oak Avenue',
    impactScore: 2,
    type: 'Request',
    timestamp: new Date(),
    tags: ['Bicycle', 'Repair']
  }
];

const BackgroundBubbles = () => {
  const bubbles = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 15
  })), []);

  return (
    <>
      {bubbles.map(b => (
        <div 
          key={b.id} 
          className="bubble" 
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: '-100px',
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`
          }}
        />
      ))}
    </>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Ecosystem);
  const [seeds, setSeeds] = useState<Seed[]>(INITIAL_SEEDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<ImpactStats>({
    hoursShared: 428,
    itemsSaved: 156,
    co2SavedKg: 890.5,
    communityGrowth: 15
  });

  const addNewSeed = (newSeed: Seed) => {
    setSeeds([newSeed, ...seeds]);
    setStats(prev => ({
      ...prev,
      hoursShared: prev.hoursShared + (newSeed.category === 'Help' ? 1 : 0),
      itemsSaved: prev.itemsSaved + (newSeed.category === 'Item' ? 1 : 0),
      co2SavedKg: prev.co2SavedKg + newSeed.impactScore
    }));
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundBubbles />
      
      {/* Glossy Header */}
      <header className="sticky top-4 z-50 px-4">
        <div className="max-w-7xl mx-auto glass-card p-4 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView(ViewMode.Ecosystem)}>
            <div className="p-2.5 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl shadow-lg shadow-green-200 group-hover:rotate-12 transition-transform">
              <Sprout className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black text-blue-900 leading-tight text-shadow-aero">Skill Sprout</h1>
              <p className="text-[10px] font-bold text-green-700 tracking-widest uppercase">Ecosystem of Kindness</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: ViewMode.Ecosystem, label: 'Ecosystem', icon: Globe },
              { id: ViewMode.SeedBank, label: 'Seed Bank', icon: Droplets },
              { id: ViewMode.MyGarden, label: 'My Garden', icon: Leaf },
              { id: ViewMode.Impact, label: 'Impact', icon: Activity },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-sm ${
                  view === item.id 
                    ? 'bg-gradient-to-b from-blue-400 to-blue-600 text-white shadow-lg scale-105' 
                    : 'text-blue-800 hover:bg-white/40'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2.5 text-blue-600 hover:bg-white/50 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-200 to-green-200 border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform aero-shine">
              <User size={20} className="text-blue-800" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-6 md:p-10 border border-white/30 shadow-2xl">
          {view === ViewMode.Ecosystem && <Ecosystem seeds={seeds} />}
          {view === ViewMode.SeedBank && <SeedBank seeds={seeds} />}
          {view === ViewMode.MyGarden && <MyGarden />}
          {view === ViewMode.Impact && <ImpactDashboard stats={stats} />}
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-18 h-18 bg-gradient-to-b from-green-400 to-blue-500 text-white rounded-full shadow-[0_10px_40px_rgba(0,168,255,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60] group border-4 border-white/50 aero-shine"
        style={{ width: '72px', height: '72px' }}
      >
        <Plus size={36} className="group-hover:rotate-180 transition-transform duration-500" />
      </button>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 glass-card px-8 py-3 flex justify-between items-center z-50 shadow-2xl">
        <button onClick={() => setView(ViewMode.Ecosystem)} className={`p-2 rounded-xl transition-all ${view === ViewMode.Ecosystem ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-600'}`}><Globe /></button>
        <button onClick={() => setView(ViewMode.SeedBank)} className={`p-2 rounded-xl transition-all ${view === ViewMode.SeedBank ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-600'}`}><Droplets /></button>
        <button onClick={() => setView(ViewMode.MyGarden)} className={`p-2 rounded-xl transition-all ${view === ViewMode.MyGarden ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-600'}`}><Leaf /></button>
        <button onClick={() => setView(ViewMode.Impact)} className={`p-2 rounded-xl transition-all ${view === ViewMode.Impact ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-600'}`}><Activity /></button>
      </nav>

      {isModalOpen && (
        <CreateSeedModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addNewSeed} 
        />
      )}
    </div>
  );
};

export default App;
