import { useState } from 'react';
import { Zap, TrendingUp, Wand2, BarChart2, Settings, Plus, Menu, X, Globe, UserPlus, LogOut, CreditCard, Shield, UserMinus } from 'lucide-react';

export function DashboardLayout({ children, activeTab, setActiveTab }: { children: React.ReactNode, activeTab: string, setActiveTab: (tab: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);

  const navItems = [
    { id: 'feed', label: 'Pulse', icon: Zap },
    { id: 'trends', label: 'Viral Trends', icon: TrendingUp },
    { id: 'ai', label: 'AI Generator', icon: Wand2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/30">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/90 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Zap className="text-primary" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-on-surface cursor-pointer" onClick={() => setActiveTab('feed')}>
            PULSE
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div 
            className="w-8 h-8 rounded-full border-2 border-primary overflow-hidden cursor-pointer md:cursor-default"
            onClick={() => setIsMobileSettingsOpen(!isMobileSettingsOpen)}
          >
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGwcQ8zrcDnRVtmR1CtVZLp0lGjaKyqtb_z6Chfmjma3D0t2wfqKNOiiGn95kYPXs_J4YuWWZjFiRxC5_r4zu0kzcUKZZkXb7MU_uGC-Q55yiZJ3uZhlMQfCAGRrH_8paxi7ok1asKl3nBM-sF6WVzY4tQ94i-pMyPQudbGd0UD5HbGByctzqbEh9_66fjhXjM2ogQvpdrl2KXiSbpIAMjzz-ZXI9_fA8-3k9v06b8CeFraKLNNrZJYwIBLbP05Tdrr8p83RHL-gOw" alt="User Profile" />
          </div>
        </div>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="fixed left-0 top-0 h-full flex-col p-4 z-40 bg-surface-container-low border-r border-outline-variant/30 w-64 hidden md:flex pt-24">
        <div className="mb-10 px-2">
          <span className="text-lg font-bold text-on-surface">Pulse Dash</span>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mt-1">The Algorithm Unmasked</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pb-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-outline-variant/30">
            <p className="px-4 text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">Réglages</p>
            <div className="space-y-1">
              <button onClick={() => setActiveTab('settings')} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface transition-colors text-sm">
                <Settings size={18} /> <span>Réglages</span>
              </button>
            </div>
          </div>
        </nav>
        <div className="mt-auto p-4 bg-surface-container border border-outline-variant/30 rounded-xl">
          <p className="text-xs text-on-surface-variant mb-3">Earn more by sharing</p>
          <button onClick={() => setActiveTab('ai')} className="w-full py-2 bg-primary hover:bg-primary-dim rounded-lg font-medium text-sm text-white transition-colors flex items-center justify-center gap-2">
            <Plus size={16} /> New Analysis
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 pt-24 pb-32 min-h-screen relative">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-surface-container-low border-t border-outline-variant/30 flex md:hidden justify-around items-center px-4 pb-safe z-50">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center transition-colors duration-200 ${
              activeTab === item.id
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium mt-1">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>

      {/* Mobile Settings Overlay */}
      {isMobileSettingsOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileSettingsOpen(false)}></div>
          <div className="absolute top-20 right-4 w-64 bg-surface-container-high border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4">
            <div className="p-4 border-b border-outline-variant/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-primary overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGwcQ8zrcDnRVtmR1CtVZLp0lGjaKyqtb_z6Chfmjma3D0t2wfqKNOiiGn95kYPXs_J4YuWWZjFiRxC5_r4zu0kzcUKZZkXb7MU_uGC-Q55yiZJ3uZhlMQfCAGRrH_8paxi7ok1asKl3nBM-sF6WVzY4tQ94i-pMyPQudbGd0UD5HbGByctzqbEh9_66fjhXjM2ogQvpdrl2KXiSbpIAMjzz-ZXI9_fA8-3k9v06b8CeFraKLNNrZJYwIBLbP05Tdrr8p83RHL-gOw" alt="User Profile" />
              </div>
              <div>
                <p className="font-bold text-sm text-on-surface">Créateur Pro</p>
                <p className="text-xs text-on-surface-variant">Plan Premium</p>
              </div>
            </div>
            <div className="p-2 flex items-center gap-1">
              <button onClick={() => { setActiveTab('settings'); setIsMobileSettingsOpen(false); }} className="flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface transition-colors text-sm">
                <Settings size={16} /> <span>Réglages</span>
              </button>
              <button onClick={() => { setActiveTab('settings'); setIsMobileSettingsOpen(false); }} className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors" title="Se déconnecter">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
