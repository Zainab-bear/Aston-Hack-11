
import React, { useState } from 'react';
import { X, Sprout, Loader2, Sparkles } from 'lucide-react';
import { Category, Seed } from '../types';
import { getImpactEstimation } from '../services/geminiService';

interface CreateSeedModalProps {
  onClose: () => void;
  onSubmit: (seed: Seed) => void;
}

const CreateSeedModal: React.FC<CreateSeedModalProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Skill');
  const [type, setType] = useState<'Offer' | 'Request'>('Offer');
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimatedImpact, setEstimatedImpact] = useState<number | null>(null);

  const handleEstimate = async () => {
    if (!description || description.length < 10) return;
    setIsEstimating(true);
    try {
      const impact = await getImpactEstimation(description);
      setEstimatedImpact(impact);
    } catch (error) {
      console.error(error);
      setEstimatedImpact(5); // fallback
    } finally {
      setIsEstimating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSeed: Seed = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      category,
      type,
      author: 'You',
      location: 'Your Neighborhood',
      impactScore: estimatedImpact || 5,
      timestamp: new Date(),
      tags: [category]
    };
    onSubmit(newSeed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg glass-card rounded-[2.5rem] p-8 aero-gloss shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl text-white shadow-lg">
            <Sprout size={28} />
          </div>
          <h2 className="text-3xl font-black text-blue-900 tracking-tight">Plant a Seed</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 p-1 bg-blue-50 rounded-2xl">
            {(['Offer', 'Request'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                  type === t ? 'bg-white text-blue-600 shadow-md' : 'text-blue-400 hover:text-blue-500'
                }`}
              >
                {t} Help
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-1">What's your seed?</label>
            <input 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Garden Tool Lending"
              className="w-full px-5 py-4 bg-white/50 border border-blue-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/20 text-blue-900 font-semibold placeholder-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-1">Tell us more...</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give some details for your neighbors..."
              rows={4}
              className="w-full px-5 py-4 bg-white/50 border border-blue-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/20 text-blue-900 font-medium placeholder-blue-300 resize-none"
            />
            {description.length >= 10 && (
              <button 
                type="button"
                onClick={handleEstimate}
                disabled={isEstimating}
                className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-700 mt-2 ml-1 transition-colors group"
              >
                {isEstimating ? <Loader2 className="animate-spin" size={14} /> : <Sparkles className="group-hover:scale-110 transition-transform" size={14} />}
                {isEstimating ? 'AI is estimating impact...' : (estimatedImpact ? `Impact: ${estimatedImpact}kg CO2 saved` : 'Estimate Community Impact')}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-5 py-3 bg-white/50 border border-blue-100 rounded-2xl focus:outline-none text-blue-900 font-bold appearance-none cursor-pointer"
              >
                <option value="Skill">Skill</option>
                <option value="Item">Item</option>
                <option value="Help">Help</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-br from-green-500 to-blue-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-200 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Share Seed
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSeedModal;
