import { useState, useEffect } from 'react';
import { Wand2, Settings, Music, Bookmark, Sparkles, PenTool, Search, Telescope, Crown, X, CheckCircle2, Play, Download, Loader2, Globe, Instagram, Send } from 'lucide-react';

const LOADING_TEXTS = [
  "Analyse de l'algorithme TikTok...",
  "Recherche de signaux viraux...",
  "Compilation des tendances émergentes...",
  "Préparation des recommandations..."
];

const MOCK_PULSE_TRENDS = [
  { id: 1, name: "POV: Corporate Life Hack", potential: "98%" },
  { id: 2, name: "AI Tool Reveal Format", potential: "94%" },
  { id: 3, name: "Silent Review ASMR", potential: "89%" }
];

const TikTokIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function AIGenerator({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [aiModel, setAiModel] = useState('veo');
  const [genMode, setGenMode] = useState<'pulse' | 'manual'>('pulse');
  const [pulseType, setPulseType] = useState<'approfondie' | 'prediction'>('approfondie');
  const [targetPlatform, setTargetPlatform] = useState<'tiktok' | 'insta' | 'both'>('tiktok');
  const [activeCountry, setActiveCountry] = useState('Global');

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchStep, setSearchStep] = useState<'loading' | 'results'>('loading');
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [selectedTrendId, setSelectedTrendId] = useState<number | null>(null);
  const [generationState, setGenerationState] = useState<'idle' | 'generating' | 'ready'>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPosting, setIsPosting] = useState<'tiktok' | 'insta' | null>(null);
  
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [instaConnected, setInstaConnected] = useState(false);

  useEffect(() => {
    const checkConnections = () => {
      setTiktokConnected(localStorage.getItem('tiktok_connected') === 'true');
      setInstaConnected(localStorage.getItem('insta_connected') === 'true');
    };
    
    checkConnections();
    window.addEventListener('storage', checkConnections);
    return () => window.removeEventListener('storage', checkConnections);
  }, []);

  useEffect(() => {
    const savedTrend = sessionStorage.getItem('selectedTrend');
    if (savedTrend) {
      try {
        const trend = JSON.parse(savedTrend);
        setPrompt(`Create a viral video about: ${trend.name}`);
        setGenMode('manual');
        sessionStorage.removeItem('selectedTrend');
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (isSearchModalOpen && searchStep === 'loading') {
      const interval = setInterval(() => {
        setLoadingTextIdx(prev => (prev + 1) % LOADING_TEXTS.length);
      }, 1500);
      const timeout = setTimeout(() => {
        setSearchStep('results');
      }, 4500);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isSearchModalOpen, searchStep]);

  useEffect(() => {
    if (!isSearchModalOpen) {
      setTimeout(() => {
        setSearchStep('loading');
        setLoadingTextIdx(0);
        setSelectedTrendId(null);
      }, 300);
    }
  }, [isSearchModalOpen]);

  const handleGenerate = () => {
    setIsSearchModalOpen(false);
    setGenerationState('generating');
    setTimeout(() => {
      setGenerationState('ready');
    }, 4000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setGenerationState('idle');
      setPrompt('');
      setIsPlaying(false);
    }, 1500);
  };

  const handlePost = (platform: 'tiktok' | 'insta') => {
    if (platform === 'tiktok' && !tiktokConnected) {
      if (onNavigate) onNavigate('settings');
      return;
    }
    if (platform === 'insta' && !instaConnected) {
      if (onNavigate) onNavigate('settings');
      return;
    }

    setIsPosting(platform);
    setTimeout(() => {
      setIsPosting(null);
      setGenerationState('idle');
      setPrompt('');
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <>
      <div 
        className="p-4 md:p-8 max-w-7xl mx-auto transition-all duration-300"
        style={{ filter: isSearchModalOpen ? 'blur(4px)' : 'none' }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">AI Content Studio</h2>
          <p className="text-on-surface-variant">Orchestrate your next viral hit.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Settings & Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30">
              <h3 className="font-bold text-lg mb-8 flex items-center gap-2 text-on-surface">
                <Settings size={20} className="text-primary" />
                Paramètres de Génération
              </h3>
              
              <div className="space-y-8">
                {/* Generation Mode */}
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Mode de génération</label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setGenMode('pulse')}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center gap-2 ${
                        genMode === 'pulse'
                          ? 'bg-primary/10 border border-primary/20 text-primary'
                          : 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                      }`}
                    >
                      <Sparkles size={18} />
                      Pulse Gen
                    </button>
                    <button
                      onClick={() => setGenMode('manual')}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center gap-2 ${
                        genMode === 'manual'
                          ? 'bg-primary/10 border border-primary/20 text-primary'
                          : 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                      }`}
                    >
                      <PenTool size={18} />
                      Prompt
                    </button>
                  </div>

                  {/* Conditional Inputs based on Mode */}
                  <div className="min-h-[160px]">
                    {genMode === 'manual' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Décrivez la vidéo virale que vous souhaitez générer..."
                          className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none h-32 text-on-surface"
                        />
                      </div>
                    )}

                    {genMode === 'pulse' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
                        <button
                          onClick={() => setPulseType('approfondie')}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            pulseType === 'approfondie'
                              ? 'bg-primary/10 border border-primary/20 text-primary'
                              : 'bg-surface-container-highest border border-transparent text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                          }`}
                        >
                          <Telescope size={18} /> Recherche Approfondie
                        </button>
                        <button
                          onClick={() => setPulseType('prediction')}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            pulseType === 'prediction'
                              ? 'bg-primary/10 border border-primary/20 text-primary'
                              : 'bg-surface-container-highest border border-transparent text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Crown size={18} /> Prédiction de Trend
                          </div>
                          <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Pro</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Platform Selector */}
                {genMode === 'pulse' && (
                  <div className="animate-in fade-in duration-300">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Plateforme cible</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTargetPlatform('tiktok')}
                        className={`py-2.5 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center gap-2 ${
                          targetPlatform === 'tiktok' ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                        }`}
                      >
                        <TikTokIcon size={20} />
                        TikTok
                      </button>
                      <button
                        onClick={() => setTargetPlatform('insta')}
                        className={`py-2.5 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center gap-2 ${
                          targetPlatform === 'insta' ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                        }`}
                      >
                        <Instagram size={20} />
                        Reels
                      </button>
                      <button
                        onClick={() => setTargetPlatform('both')}
                        className={`py-2.5 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden ${
                          targetPlatform === 'both' ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <TikTokIcon size={14} />
                          <Instagram size={14} />
                        </div>
                        Les deux
                        <span className="absolute top-0 right-0 bg-primary/20 text-primary text-[9px] px-1.5 py-0.5 rounded-bl font-bold uppercase tracking-wider">Pro</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Country Selector */}
                {genMode === 'pulse' && (
                  <div className="animate-in fade-in duration-300">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Localisation cible</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 pointer-events-none" />
                      <select 
                        value={activeCountry}
                        onChange={(e) => setActiveCountry(e.target.value)}
                        className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer text-on-surface"
                      >
                        <option value="Global">Monde entier</option>
                        <option value="États-Unis">États-Unis</option>
                        <option value="France">France</option>
                        <option value="Royaume-Uni">Royaume-Uni</option>
                        <option value="Allemagne">Allemagne</option>
                        <option value="Espagne">Espagne</option>
                        <option value="Italie">Italie</option>
                        <option value="Japon">Japon</option>
                        <option value="Corée du Sud">Corée du Sud</option>
                        <option value="Brésil">Brésil</option>
                        <option value="Canada">Canada</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/70 text-xs">▼</div>
                    </div>
                  </div>
                )}

                {/* AI Model */}
                {genMode === 'manual' && (
                  <div className="animate-in fade-in duration-300">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Modèle d'IA</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Veo', 'Grok', 'Kling', 'Sora'].map(model => (
                        <button 
                          key={model}
                          onClick={() => setAiModel(model.toLowerCase())}
                          className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            aiModel === model.toLowerCase() 
                              ? 'bg-primary/10 border border-primary/20 text-primary' 
                              : 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button 
                  onClick={() => {
                    if (genMode === 'pulse') {
                      setIsSearchModalOpen(true);
                      setSearchStep('loading');
                    } else {
                      if (!prompt) return;
                      handleGenerate();
                    }
                  }}
                  className="w-full py-4 bg-primary hover:bg-primary-dim rounded-xl font-bold text-lg text-white transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-3 mt-8"
                >
                  {genMode === 'pulse' ? (
                    <>
                      <Search size={24} />
                      <span>Trouver une tendance</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={24} />
                      <span>Générer la vidéo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Output & Editor */}
          <div className="lg:col-span-7 space-y-6">
            {generationState === 'idle' && (
              <div className="h-full min-h-[400px] border border-outline-variant/30 bg-surface-container-low rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
                  <Sparkles className="text-on-surface-variant/70" size={24} />
                </div>
                <h3 className="text-lg font-bold text-on-surface-variant mb-2">Prêt à créer</h3>
                <p className="text-sm text-on-surface-variant/70 max-w-sm">Configurez vos paramètres dans le panneau de gauche et lancez la génération pour voir votre vidéo apparaître ici.</p>
              </div>
            )}

            {generationState === 'generating' && (
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                <Loader2 className="animate-spin text-primary mb-6" size={48} />
                <h3 className="font-bold text-xl text-on-surface">Génération en cours...</h3>
                <p className="text-on-surface-variant text-sm mt-2">Création de la vidéo avec {aiModel.toUpperCase()}...</p>
              </div>
            )}

            {generationState === 'ready' && (
              <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKNy8tjsWsQRtI6sklyihhBV4pZ96_SSEBtfJPHOMuvtUveS8sAU5zZXukYjQKDIsOQaXcq3DKh-2jkhuBg_-kI3gFBaENBlVJUhEyT2Jdy0UEGhaZzvpPn092_8jpLbib6I8sXln9YdHedr-1mlc8XeFac3n8oDEoo4z5CbH-hO0Jn_41n5GpEvfwDuRalohFNy2FzNcFHNOkKZJjxYjgj8PM4EuufasiVPSMroQyNtgqgnyOIntTllsSXhuGKLRG-6XQScPnamq6')] bg-cover bg-center opacity-10 blur-sm"></div>
                <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
                  <div 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors"
                  >
                    {isPlaying ? <div className="w-5 h-5 bg-primary rounded-sm" /> : <Play className="text-primary ml-1" size={24} />}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-on-surface">Vidéo Prête !</h3>
                  <p className="text-on-surface-variant text-sm mb-8 text-center">Votre vidéo générée par {aiModel.toUpperCase()} est prête à être publiée.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <button 
                      onClick={handleDownload}
                      disabled={isDownloading || isPosting !== null}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-on-surface text-background font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                      {isDownloading ? 'Téléchargement...' : 'MP4'}
                    </button>

                    <button 
                      onClick={() => handlePost('tiktok')}
                      disabled={isDownloading || isPosting !== null}
                      className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
                        tiktokConnected 
                          ? 'bg-surface-container-highest text-on-surface hover:bg-on-surface/10 border border-outline-variant/50' 
                          : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/30 hover:bg-on-surface/5'
                      }`}
                    >
                      {isPosting === 'tiktok' ? <Loader2 className="animate-spin" size={18} /> : <TikTokIcon size={18} />}
                      {tiktokConnected ? (isPosting === 'tiktok' ? 'Publication...' : 'Poster') : 'Connecter'}
                    </button>

                    <button 
                      onClick={() => handlePost('insta')}
                      disabled={isDownloading || isPosting !== null}
                      className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
                        instaConnected 
                          ? 'bg-surface-container-highest text-on-surface hover:bg-on-surface/10 border border-outline-variant/50' 
                          : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/30 hover:bg-on-surface/5'
                      }`}
                    >
                      {isPosting === 'insta' ? <Loader2 className="animate-spin" size={18} /> : <Instagram size={18} />}
                      {instaConnected ? (isPosting === 'insta' ? 'Publication...' : 'Poster') : 'Connecter'}
                    </button>
                  </div>

                  {/* Suggestions moved here */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8 pt-8 border-t border-outline-variant/30">
                    <div className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Music className="text-primary" size={18} /></div>
                      <div>
                        <p className="font-medium text-sm text-on-surface">Audio Recommandé</p>
                        <p className="text-xs text-on-surface-variant">"Phonk Drift" (↑ 45%)</p>
                      </div>
                    </div>
                    <div className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Bookmark className="text-primary" size={18} /></div>
                      <div>
                        <p className="font-medium text-sm text-on-surface">Hashtags Optimisés</p>
                        <p className="text-xs text-on-surface-variant">#aitools #growth #tech</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsSearchModalOpen(false)}></div>
          <div className="relative bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-4 right-4 text-on-surface-variant/70 hover:text-on-surface transition-colors">
              <X size={20} />
            </button>
            
            {searchStep === 'loading' && (
              <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-in fade-in duration-500">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <Search size={48} className="text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-2 h-16">
                  <h4 className="font-bold text-lg text-on-surface">Recherche de tendances...</h4>
                  <p className="text-sm text-primary/80 animate-pulse">{LOADING_TEXTS[loadingTextIdx]}</p>
                </div>
              </div>
            )}

            {searchStep === 'results' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <Sparkles size={24} />
                  <h3 className="font-bold text-xl">Tendances Détectées</h3>
                </div>
                
                <div className="space-y-3">
                  {MOCK_PULSE_TRENDS.map((trend) => (
                    <div 
                      key={trend.id} 
                      onClick={() => setSelectedTrendId(trend.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        selectedTrendId === trend.id 
                          ? 'bg-primary/10 border-primary/30' 
                          : 'bg-surface-container-highest border border-outline-variant/30 hover:bg-on-surface/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedTrendId === trend.id ? 'border-primary bg-primary' : 'border-on-surface-variant/70'}`}>
                          {selectedTrendId === trend.id && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-on-surface text-sm">{trend.name}</h4>
                          <p className="text-xs text-on-surface-variant mt-1">Potentiel viral : {trend.potential}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedTrendId && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 mt-6 pt-6 border-t border-outline-variant/50">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Modèle d'IA</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Veo', 'Grok', 'Kling', 'Sora'].map(model => (
                          <button 
                            key={model}
                            onClick={() => setAiModel(model.toLowerCase())}
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              aiModel === model.toLowerCase() 
                                ? 'bg-primary/10 border border-primary/20 text-primary' 
                                : 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                            }`}
                          >
                            {model}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={handleGenerate}
                      className="w-full py-4 bg-primary hover:bg-primary-dim rounded-xl font-bold text-lg text-white transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-3"
                    >
                      <Wand2 size={24} />
                      <span>Générer la vidéo</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
