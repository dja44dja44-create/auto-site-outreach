import { useState, useEffect } from 'react';
import { Zap, TrendingUp, Eye, ArrowUpRight, Sparkles, Crown, CheckCircle2, Wand2, Link2, Instagram } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const VIEWS_DATA = [
  { day: 'Mon', views: 120 },
  { day: 'Tue', views: 180 },
  { day: 'Wed', views: 250 },
  { day: 'Thu', views: 210 },
  { day: 'Fri', views: 380 },
  { day: 'Sat', views: 450 },
  { day: 'Sun', views: 620 },
];

const TikTokIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Feed({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [tiktokConnected, setTiktokConnected] = useState(true);
  const [instaConnected, setInstaConnected] = useState(true);

  useEffect(() => {
    const checkConnections = () => {
      setTiktokConnected(localStorage.getItem('tiktok_connected') === 'true');
      setInstaConnected(localStorage.getItem('insta_connected') === 'true');
    };
    
    checkConnections();
    window.addEventListener('storage', checkConnections);
    return () => window.removeEventListener('storage', checkConnections);
  }, []);

  const showConnectionBanner = !tiktokConnected || !instaConnected;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Pulse</h2>
          <p className="text-on-surface-variant">Your high-level overview of trends and performance.</p>
        </div>
      </div>

      {/* Connection Banner */}
      {showConnectionBanner && (
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {!tiktokConnected && (
                <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-background flex items-center justify-center text-on-surface">
                  <TikTokIcon size={18} />
                </div>
              )}
              {!instaConnected && (
                <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-background flex items-center justify-center text-on-surface">
                  <Instagram size={18} />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-base">Connectez vos comptes sociaux</h3>
              <p className="text-sm text-on-surface-variant">Publiez vos vidéos virales directement depuis l'IA Generator.</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('settings')}
            className="px-5 py-2.5 rounded-lg bg-on-surface/10 hover:bg-on-surface/20 text-on-surface font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Link2 size={16} />
            Connecter maintenant
          </button>
        </div>
      )}

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: User Stats + Action Button */}
        <div className="flex flex-col gap-6 h-full">
          {/* User Stats */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-on-surface-variant text-sm">Your Total Views</h3>
                <p className="text-xs text-on-surface-variant/70">Across all platforms</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-on-surface mb-2">2.4M</div>
            <div className="flex items-center gap-2 text-sm text-emerald-500 font-medium">
              <TrendingUp size={16} />
              <span>+12.5% vs last week</span>
            </div>
          </div>

          {/* Action Button moved here */}
          <button 
            onClick={() => onNavigate && onNavigate('trends')} 
            className="w-full py-2.5 bg-primary hover:bg-primary-dim rounded-lg font-medium text-sm text-white transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            <span>Trouver une tendance virale</span>
          </button>
        </div>

        {/* Trending Types */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden h-full flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-on-surface-variant text-sm">Trending Formats</h3>
              <p className="text-xs text-on-surface-variant/70">What's working right now</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Storytime / GRWM', trend: '+45%', hot: true },
              { name: 'Educational Carousels', trend: '+28%', hot: false },
              { name: 'POV Humor', trend: '+15%', hot: false },
            ].map((format, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-highest border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-on-surface/5 flex items-center justify-center text-xs font-medium text-on-surface-variant">
                    #{i + 1}
                  </div>
                  <span className="font-medium text-sm text-on-surface">{format.name}</span>
                  {format.hot && <Sparkles size={14} className="text-primary" />}
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
                  <ArrowUpRight size={14} />
                  {format.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Views Chart */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden h-[220px] flex flex-col">
        <div className="flex justify-between items-center mb-4 relative z-10">
          <h3 className="font-bold text-base flex items-center gap-2 text-on-surface">
            <Eye size={18} className="text-primary" />
            Views Momentum
          </h3>
        </div>
        <div className="flex-1 w-full h-full z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={VIEWS_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViewsPulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1e2128', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#3b82f6', fontWeight: '500' }}
                cursor={{ stroke: 'rgba(59,130,246,0.2)', strokeWidth: 2, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorViewsPulse)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upgrade Section */}
      <div className="mt-12 relative rounded-2xl overflow-hidden border border-primary/20 bg-primary/5">
        <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Crown size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Upgrade to PRO</h3>
            </div>
            <p className="text-on-surface-variant mb-6 max-w-md text-sm">
              Unlock the full potential of Pulse. Get unlimited AI generations, deep analytics, and priority support to skyrocket your growth.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 md:mb-0">
              {[
                'Unlimited AI Video Scripts',
                'Deep Competitor Analysis',
                'Auto-posting to TikTok/IG',
                'Priority 24/7 Support'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <CheckCircle2 size={16} className="text-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-auto bg-surface-container-highest p-6 rounded-xl border border-outline-variant/30 text-center min-w-[250px]">
            <div className="text-xs text-on-surface-variant font-medium uppercase tracking-widest mb-2">Pro Plan</div>
            <div className="flex items-end justify-center gap-1 mb-4">
              <span className="text-3xl font-bold text-on-surface">$29</span>
              <span className="text-on-surface-variant mb-1 text-sm">/month</span>
            </div>
            <button onClick={() => onNavigate && onNavigate('settings')} className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-dim font-medium text-sm text-white transition-colors">
              Upgrade Now
            </button>
            <p className="text-xs text-on-surface-variant mt-4">Cancel anytime. No hidden fees.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
