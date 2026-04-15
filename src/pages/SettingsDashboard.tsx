import { useState, useEffect } from 'react';
import { Globe, UserPlus, LogOut, CreditCard, Shield, UserMinus, Check, Instagram, Link2, Unlink, Crown, Moon, Sun, Monitor, Palette } from 'lucide-react';

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Gratuit',
    description: 'Pour découvrir la plateforme',
    isCurrent: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '29€/mois',
    description: 'Pour les créateurs réguliers',
    isCurrent: false,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '99€/mois',
    description: 'Pour les agences et équipes',
    isCurrent: false,
  }
];

const TikTokIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function SettingsDashboard() {
  const [activeLang, setActiveLang] = useState('fr');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [toast, setToast] = useState<string | null>(null);
  
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [instaConnected, setInstaConnected] = useState(false);
  const [disconnectPrompt, setDisconnectPrompt] = useState<'tiktok' | 'insta' | null>(null);

  useEffect(() => {
    setTiktokConnected(localStorage.getItem('tiktok_connected') === 'true');
    setInstaConnected(localStorage.getItem('insta_connected') === 'true');
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleAction = (action: string) => {
    setToast(`${action} - Fonctionnalité en cours de développement`);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleSocial = (platform: 'tiktok' | 'insta') => {
    if (platform === 'tiktok') {
      if (tiktokConnected) {
        setDisconnectPrompt('tiktok');
      } else {
        setTiktokConnected(true);
        localStorage.setItem('tiktok_connected', 'true');
        setToast('Compte TikTok connecté avec succès');
        setTimeout(() => setToast(null), 3000);
        window.dispatchEvent(new Event('storage'));
      }
    } else {
      if (instaConnected) {
        setDisconnectPrompt('insta');
      } else {
        setInstaConnected(true);
        localStorage.setItem('insta_connected', 'true');
        setToast('Compte Instagram connecté avec succès');
        setTimeout(() => setToast(null), 3000);
        window.dispatchEvent(new Event('storage'));
      }
    }
  };

  const confirmDisconnect = () => {
    if (disconnectPrompt === 'tiktok') {
      setTiktokConnected(false);
      localStorage.setItem('tiktok_connected', 'false');
      setToast('Compte TikTok déconnecté');
    } else if (disconnectPrompt === 'insta') {
      setInstaConnected(false);
      localStorage.setItem('insta_connected', 'false');
      setToast('Compte Instagram déconnecté');
    }
    setDisconnectPrompt(null);
    setTimeout(() => setToast(null), 3000);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-surface-container-highest border border-outline-variant/30 text-on-surface px-6 py-3 rounded-full shadow-2xl z-50 animate-in slide-in-from-bottom-4 fade-in">
          {toast}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Réglages</h2>
        <p className="text-on-surface-variant">Gérez vos préférences et votre compte.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Social Accounts */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center gap-3 text-on-surface mb-4">
              <div className="p-2 bg-on-surface/10 rounded-lg">
                <Link2 size={20} />
              </div>
              <h3 className="font-bold text-lg">Comptes Sociaux</h3>
            </div>
            
            <p className="text-sm text-on-surface-variant mb-4">Connectez vos comptes pour publier directement vos vidéos générées.</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-highest border border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${tiktokConnected ? 'bg-[#00f2fe]/20 text-[#00f2fe]' : 'bg-on-surface/5 text-on-surface-variant'}`}>
                    <TikTokIcon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-on-surface">TikTok</div>
                    <div className="text-xs text-on-surface-variant">{tiktokConnected ? '@mon_compte_tiktok' : 'Non connecté'}</div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSocial('tiktok')}
                  className={`h-9 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    tiktokConnected 
                      ? 'bg-on-surface/10 text-on-surface hover:bg-on-surface/20' 
                      : 'bg-[#00f2fe]/20 text-[#00f2fe] hover:bg-[#00f2fe]/30'
                  }`}
                >
                  {tiktokConnected ? (
                    <><Unlink size={16} /> <span className="hidden sm:inline">Déconnecter</span></>
                  ) : (
                    <><Link2 size={16} /> <span className="hidden sm:inline">Connecter</span></>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-highest border border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${instaConnected ? 'bg-[#ff0844]/20 text-[#ff0844]' : 'bg-on-surface/5 text-on-surface-variant'}`}>
                    <Instagram size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-on-surface">Instagram</div>
                    <div className="text-xs text-on-surface-variant">{instaConnected ? '@mon_compte_insta' : 'Non connecté'}</div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSocial('insta')}
                  className={`h-9 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    instaConnected 
                      ? 'bg-on-surface/10 text-on-surface hover:bg-on-surface/20' 
                      : 'bg-[#ff0844]/20 text-[#ff0844] hover:bg-[#ff0844]/30'
                  }`}
                >
                  {instaConnected ? (
                    <><Unlink size={16} /> <span className="hidden sm:inline">Déconnecter</span></>
                  ) : (
                    <><Link2 size={16} /> <span className="hidden sm:inline">Connecter</span></>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-6">
            <div className="flex items-center gap-3 text-on-surface mb-4">
              <div className="p-2 bg-on-surface/10 rounded-lg">
                <Palette size={20} />
              </div>
              <h3 className="font-bold text-lg">Apparence</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === 'light'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container-highest border-transparent text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                }`}
              >
                <Sun size={24} />
                <span className="text-sm font-medium">Clair</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === 'dark'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container-highest border-transparent text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                }`}
              >
                <Moon size={24} />
                <span className="text-sm font-medium">Sombre</span>
              </button>
              <button
                onClick={() => handleThemeChange('system')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === 'system'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container-highest border-transparent text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                }`}
              >
                <Monitor size={24} />
                <span className="text-sm font-medium">Système</span>
              </button>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-6">
            <div className="flex items-center gap-3 text-on-surface mb-4">
              <div className="p-2 bg-on-surface/10 rounded-lg">
                <Globe size={20} />
              </div>
              <h3 className="font-bold text-lg">Langue</h3>
            </div>
            
            <div className="space-y-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    activeLang === lang.code
                      ? 'bg-primary/10 border-primary text-on-surface'
                      : 'bg-surface-container-highest border-transparent text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-bold">{lang.name}</span>
                  </div>
                  {activeLang === lang.code && <Check size={18} className="text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Account Settings */}
        <div className="space-y-6">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center gap-3 text-on-surface mb-4">
              <div className="p-2 bg-on-surface/10 rounded-lg">
                <UserPlus size={20} />
              </div>
              <h3 className="font-bold text-lg">Compte</h3>
            </div>
            
            <button onClick={() => handleAction('Ajouter un compte')} className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-container-highest border border-outline-variant/30 hover:bg-on-surface/10 transition-colors text-on-surface group">
              <div className="flex items-center gap-3">
                <UserPlus size={18} className="text-on-surface-variant group-hover:text-on-surface transition-colors" />
                <span className="font-medium">Ajouter un autre compte</span>
              </div>
            </button>
            
            <button onClick={() => handleAction('Confidentialité')} className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-container-highest border border-outline-variant/30 hover:bg-on-surface/10 transition-colors text-on-surface group">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-on-surface-variant group-hover:text-on-surface transition-colors" />
                <span className="font-medium">Confidentialité & Sécurité</span>
              </div>
            </button>
          </div>

          {/* Subscription & Plans */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-6">
            <div className="flex items-center gap-3 text-on-surface mb-4">
              <div className="p-2 bg-on-surface/10 rounded-lg">
                <Crown size={20} />
              </div>
              <h3 className="font-bold text-lg">Abonnement & Plans</h3>
            </div>

            <div className="space-y-4">
              {PLANS.map((plan) => (
                <div 
                  key={plan.id}
                  className={`relative p-5 rounded-xl border transition-colors ${
                    plan.isCurrent 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-surface-container-highest border-outline-variant/30 hover:border-outline-variant'
                  }`}
                >
                  {plan.isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      Plan Actuel
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`font-bold text-lg ${plan.isCurrent ? 'text-primary' : 'text-on-surface'}`}>{plan.name}</h4>
                    <span className="font-bold text-on-surface">{plan.price}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">{plan.description}</p>
                  
                  {!plan.isCurrent && (
                    <button 
                      onClick={() => handleAction(`Souscrire au plan ${plan.name}`)}
                      className="w-full py-2.5 rounded-lg font-medium text-sm transition-colors bg-on-surface/10 text-on-surface hover:bg-on-surface/20"
                    >
                      Mettre à niveau
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10 space-y-4">
            <h3 className="font-bold text-lg text-red-500 mb-4">Zone de danger</h3>
            
            <button onClick={() => handleAction('Déconnexion')} className="w-full flex items-center gap-3 p-4 rounded-lg bg-surface-container-highest border border-outline-variant/30 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-colors text-on-surface-variant">
              <LogOut size={18} />
              <span className="font-medium">Se déconnecter</span>
            </button>
            
            <button onClick={() => handleAction('Désabonnement')} className="w-full flex items-center gap-3 p-4 rounded-lg bg-surface-container-highest border border-outline-variant/30 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 transition-colors text-on-surface-variant">
              <UserMinus size={18} />
              <span className="font-medium">Se désabonner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Disconnect Modal */}
      {disconnectPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDisconnectPrompt(null)}></div>
          <div className="relative bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-lg text-on-surface mb-2">Déconnexion</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              Êtes-vous sûr de vouloir déconnecter votre compte {disconnectPrompt === 'tiktok' ? 'TikTok' : 'Instagram'} ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDisconnectPrompt(null)}
                className="flex-1 py-2.5 rounded-lg font-medium text-on-surface bg-on-surface/5 hover:bg-on-surface/10 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDisconnect}
                className="flex-1 py-2.5 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
