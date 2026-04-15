import { useState, useEffect } from 'react';
import { TrendingUp, Activity, Globe, Zap, Search, Filter, ArrowUpRight, Wand2, Radar, Sparkles, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_TRENDS = [
  { id: 1, name: 'Wes Anderson Style', type: 'Format Trend', date: 'Il y a 2 semaines', competition: 'High', category: 'Lifestyle', volume: '14.2M' },
  { id: 2, name: 'Roman Empire', type: 'Concept', date: 'Il y a 1 semaine', competition: 'Medium', category: 'Entertainment', volume: '8.4M' },
  { id: 3, name: 'Girl Math', type: 'Format Trend', date: 'Il y a 2 semaines', competition: 'High', category: 'Finance', volume: '21.1M' },
  { id: 4, name: 'Tube Girl', type: 'Dance/Vlog', date: 'Il y a 1 semaine', competition: 'Low', category: 'Lifestyle', volume: '5.5M' },
  { id: 5, name: 'AI Yearbook', type: 'Filter Trend', date: 'Il y a 2 semaines', competition: 'High', category: 'Tech', volume: '34.4M' },
  { id: 6, name: 'Quiet Quitting', type: 'Concept', date: 'Il y a 1 semaine', competition: 'Medium', category: 'Business', volume: '9.2M' },
];

const VELOCITY_DATA = [
  { time: '00:00', volume: 40 },
  { time: '02:00', volume: 60 },
  { time: '04:00', volume: 45 },
  { time: '06:00', volume: 80 },
  { time: '08:00', volume: 55 },
  { time: '10:00', volume: 90 },
  { time: '12:00', volume: 70 },
  { time: '14:00', volume: 100 },
  { time: '16:00', volume: 85 },
  { time: '18:00', volume: 110 },
  { time: '20:00', volume: 95 },
  { time: '22:00', volume: 120 },
];

const CATEGORIES = ['All', 'Tech', 'Business', 'Lifestyle', 'Entertainment', 'Finance'];

const LOADING_TEXTS = [
  "Infiltration des algorithmes TikTok...",
  "Analyse des ondes cérébrales de la Gen Z...",
  "Décodage des signaux viraux souterrains...",
  "Préparation de votre prochain million de vues..."
];

const PREDICTED_TRENDS = [
  { name: "Neo-Y2K Fashion Transition", potential: "98%", timeframe: "48h" },
  { name: "AI Voice Clone Pranks", potential: "94%", timeframe: "72h" },
  { name: "Micro-learning: Finance Hacks", potential: "89%", timeframe: "5 days" }
];

export function VelocityDashboard({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [activeCountry, setActiveCountry] = useState('Global');

  const [isPredictModalOpen, setIsPredictModalOpen] = useState(false);
  const [predictStep, setPredictStep] = useState<'form' | 'loading' | 'results'>('form');
  const [predictLocation, setPredictLocation] = useState('Monde entier');
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);

  useEffect(() => {
    if (predictStep === 'loading') {
      const interval = setInterval(() => {
        setLoadingTextIdx(prev => (prev + 1) % LOADING_TEXTS.length);
      }, 2000);
      const timeout = setTimeout(() => {
        setPredictStep('results');
      }, 8000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [predictStep]);

  useEffect(() => {
    if (!isPredictModalOpen) {
      setTimeout(() => {
        setPredictStep('form');
        setLoadingTextIdx(0);
      }, 300);
    }
  }, [isPredictModalOpen]);

  const filteredTrends = MOCK_TRENDS.filter(trend => {
    const matchesCategory = activeCategory === 'All' || trend.category === activeCategory;
    const matchesSearch = trend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          trend.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleGenerate = (trend: typeof MOCK_TRENDS[0]) => {
    setGeneratingId(trend.id);
    setTimeout(() => {
      setGeneratingId(null);
      sessionStorage.setItem('selectedTrend', JSON.stringify(trend));
      if (onNavigate) {
        onNavigate('ai');
      }
    }, 800);
  };

  return (
    <>
      <div 
        className="p-4 md:p-8 max-w-7xl mx-auto transition-all duration-300"
        style={{ filter: isPredictModalOpen ? 'blur(4px)' : 'none' }}
      >
        <div className="mb-8 flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Creator Velocity</h2>
            <p className="text-on-surface-variant">Real-time algorithmic pulse and trend analysis.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsPredictModalOpen(true)}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dim rounded-lg font-medium text-sm text-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Radar size={18} />
              <span>Détecter les futures tendances</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden min-h-[240px] flex flex-col">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-bold text-base flex items-center gap-2 text-on-surface">
                <Activity size={18} className="text-primary" />
                Algorithm Sync
              </h3>
              <div className="flex items-center gap-3">
                <select className="bg-surface-container-highest border border-outline-variant/50 rounded-lg px-3 py-1 text-xs font-bold text-on-surface focus:outline-none focus:border-secondary transition-colors appearance-none cursor-pointer">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  LIVE
                </span>
              </div>
            </div>
            
            {/* Recharts Dynamic Chart */}
            <div className="flex-1 w-full h-full min-h-[200px] z-10 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VELOCITY_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e2128', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#3b82f6', fontWeight: '500' }}
                    cursor={{ stroke: 'rgba(59,130,246,0.2)', strokeWidth: 2, strokeDasharray: '4 4' }}
                    formatter={(value: number) => [`${value}K`, 'Volume']}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/30">
              <h4 className="text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-2">Peak Velocity Time</h4>
              <div className="text-2xl font-bold text-on-surface">18:00 - 21:00</div>
              <p className="text-xs text-emerald-400 mt-2 font-medium flex items-center gap-1">
                <ArrowUpRight size={14} /> +42% engagement predicted
              </p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
              <h4 className="text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-2">Top Format</h4>
              <div className="text-lg font-bold text-on-surface mb-1">Storytime + B-Roll</div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-primary h-full w-[78%]"></div>
              </div>
              <p className="text-xs text-on-surface-variant/70 mt-2">Dominating 78% of FYP</p>
            </div>
          </div>
        </div>

        {/* Interactive Trends Table */}
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-bold text-base flex items-center gap-2 text-on-surface">
              <TrendingUp size={18} className="text-primary" />
              Tendances récentes
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70" />
                <input 
                  type="text" 
                  placeholder="Search trends..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface"
                />
              </div>
              
              {/* Country Selector */}
              <div className="relative w-full sm:w-auto">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                <select 
                  value={activeCountry}
                  onChange={(e) => setActiveCountry(e.target.value)}
                  className="w-full sm:w-auto pl-9 pr-8 py-2 bg-surface-container-highest border border-outline-variant/50 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface hover:border-outline-variant/70 transition-colors appearance-none cursor-pointer focus:outline-none"
                >
                  <option value="Global">Global</option>
                  <option value="United States">United States</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Japan">Japan</option>
                  <option value="Brazil">Brazil</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/70 text-[10px]">▼</div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="px-6 py-4 border-b border-outline-variant/30 flex gap-2 overflow-x-auto hide-scrollbar">
            <Filter size={16} className="text-on-surface-variant/70 shrink-0 mt-1 mr-2" />
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface hover:bg-on-surface/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-on-surface-variant uppercase tracking-widest bg-surface-container-highest/30">
                  <th className="p-4 font-medium">Trend / Audio</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Competition</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-sm">
                {filteredTrends.length > 0 ? (
                  filteredTrends.map((trend) => (
                    <tr key={trend.id} className="hover:bg-on-surface/5 transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{trend.name}</div>
                        <div className="text-xs text-on-surface-variant/70 flex items-center gap-2 mt-1">
                          <span>{trend.type}</span>
                          <span className="w-1 h-1 rounded-full bg-on-surface-variant/50"></span>
                          <span>Vol: {trend.volume}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-surface-container-highest rounded text-xs font-medium text-on-surface-variant">
                          {trend.category}
                        </span>
                      </td>
                      <td className="p-4 text-on-surface-variant font-medium">
                        {trend.date}
                      </td>
                      <td className="p-4">
                        <span className={`font-bold ${
                          trend.competition === 'Low' ? 'text-primary' : 
                          trend.competition === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {trend.competition}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleGenerate(trend)}
                          disabled={generatingId === trend.id}
                          className={`px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2 ${
                            generatingId === trend.id 
                              ? 'bg-primary/20 text-primary cursor-not-allowed'
                              : 'bg-on-surface/10 hover:bg-on-surface/20 text-on-surface'
                          }`}
                        >
                          {generatingId === trend.id ? (
                            <>
                              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                              Loading...
                            </>
                          ) : (
                            <>
                              <Zap size={14} /> Generate
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                      No trends found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Prediction Modal */}
      {isPredictModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsPredictModalOpen(false)}></div>
          <div className="relative bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsPredictModalOpen(false)} className="absolute top-4 right-4 text-on-surface-variant/70 hover:text-on-surface transition-colors">
              <X size={20} />
            </button>
            
            {predictStep === 'form' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Radar size={24} />
                  <h3 className="font-bold text-xl text-on-surface">Radar de Tendances</h3>
                </div>
                <p className="text-on-surface-variant text-sm">Détectez les prochaines tendances avant qu'elles n'explosent.</p>
                
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Localisation cible</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 pointer-events-none" />
                    <select 
                      value={predictLocation}
                      onChange={(e) => setPredictLocation(e.target.value)}
                      className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer text-on-surface"
                    >
                      <option value="Monde entier">Monde entier</option>
                      <option value="États-Unis">États-Unis</option>
                      <option value="France">France</option>
                      <option value="Royaume-Uni">Royaume-Uni</option>
                      <option value="Japon">Japon</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/70 text-xs">▼</div>
                  </div>
                </div>

                <button 
                  onClick={() => setPredictStep('loading')}
                  className="w-full py-2.5 bg-primary hover:bg-primary-dim rounded-lg font-medium text-sm text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  <span>Lancer l'analyse</span>
                </button>
              </div>
            )}

            {predictStep === 'loading' && (
              <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-in fade-in duration-500">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <Radar size={48} className="text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-2 h-16">
                  <h4 className="font-medium text-lg text-on-surface">Analyse en cours...</h4>
                  <p className="text-sm text-primary/80 animate-pulse">{LOADING_TEXTS[loadingTextIdx]}</p>
                </div>
              </div>
            )}

            {predictStep === 'results' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <Sparkles size={24} />
                  <h3 className="font-bold text-xl text-on-surface">Résultats du Radar</h3>
                </div>
                
                <div className="space-y-3">
                  {PREDICTED_TRENDS.map((trend, idx) => (
                    <div key={idx} className="bg-surface-container-highest p-4 rounded-lg border border-outline-variant/30 flex items-center justify-between hover:bg-on-surface/5 transition-colors">
                      <div>
                        <h4 className="font-medium text-on-surface text-sm">{trend.name}</h4>
                        <p className="text-xs text-on-surface-variant mt-1">Explosion estimée : {trend.timeframe}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-primary font-bold text-lg">{trend.potential}</div>
                        <div className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">Potentiel</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    sessionStorage.setItem('selectedTrend', JSON.stringify({ name: PREDICTED_TRENDS[0].name }));
                    setIsPredictModalOpen(false);
                    if (onNavigate) onNavigate('ai');
                  }}
                  className="w-full py-2.5 bg-primary hover:bg-primary-dim rounded-lg font-medium text-sm text-white transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  <Wand2 size={18} />
                  <span>Générer une vidéo pour le Top 1</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
