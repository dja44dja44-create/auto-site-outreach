import { useState } from 'react';
import { BarChart2, TrendingUp, Eye, Heart, MessageCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_VIDEOS = [
  { id: 1, title: 'AI Tools you need in 2024', platform: 'TikTok', views: '1.2M', likes: '145K', comments: '4.2K', date: '2 days ago' },
  { id: 2, title: 'Behind the scenes setup', platform: 'Instagram', views: '840K', likes: '92K', comments: '1.1K', date: '4 days ago' },
  { id: 3, title: 'How to edit like a pro', platform: 'TikTok', views: '2.1M', likes: '320K', comments: '8.9K', date: '1 week ago' },
  { id: 4, title: 'My freelance journey', platform: 'Facebook', views: '150K', likes: '12K', comments: '450', date: '2 weeks ago' },
  { id: 5, title: 'Viral hook formula', platform: 'Instagram', views: '3.4M', likes: '520K', comments: '12.4K', date: '3 weeks ago' },
];

const CHART_DATA = [
  { name: 'Lun', views: 120000, likes: 15000 },
  { name: 'Mar', views: 180000, likes: 22000 },
  { name: 'Mer', views: 150000, likes: 18000 },
  { name: 'Jeu', views: 280000, likes: 35000 },
  { name: 'Ven', views: 450000, likes: 58000 },
  { name: 'Sam', views: 380000, likes: 45000 },
  { name: 'Dim', views: 650000, likes: 82000 },
];

const formatYAxis = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

export function AnalyticsDashboard() {
  const [platform, setPlatform] = useState('All');

  const filteredVideos = platform === 'All' ? MOCK_VIDEOS : MOCK_VIDEOS.filter(v => v.platform === platform);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Performance</h2>
          <p className="text-on-surface-variant">Track your cross-platform growth and engagement.</p>
        </div>
        <div className="flex gap-2 bg-surface-container-highest p-1 rounded-lg border border-outline-variant/30 overflow-x-auto max-w-full hide-scrollbar">
          {['All', 'TikTok', 'Instagram', 'Facebook'].map(p => (
            <button 
              key={p}
              onClick={() => setPlatform(p)} 
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors whitespace-nowrap ${platform === p ? 'bg-surface-container-low text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="text-primary" size={20} />
              </div>
              <span className="font-medium text-on-surface-variant text-sm">Total Views</span>
            </div>
            <div className="text-3xl font-bold text-on-surface mb-2">7.6M</div>
            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium mb-4">
              <TrendingUp size={14} />
              <span>+24.5% this month</span>
            </div>
          </div>
          {/* Mini Sparkline */}
          <div className="h-12 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA.slice(0, 7)}>
                <defs>
                  <linearGradient id="sparkViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#sparkViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Heart className="text-secondary" size={20} />
              </div>
              <span className="font-medium text-on-surface-variant text-sm">Total Likes</span>
            </div>
            <div className="text-3xl font-bold text-on-surface mb-2">1.08M</div>
            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium mb-4">
              <TrendingUp size={14} />
              <span>+18.2% this month</span>
            </div>
          </div>
          {/* Mini Sparkline */}
          <div className="h-12 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA.slice(0, 7)}>
                <defs>
                  <linearGradient id="sparkLikes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="likes" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#sparkLikes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
                <BarChart2 className="text-tertiary" size={20} />
              </div>
              <span className="font-medium text-on-surface-variant text-sm">Avg. Engagement</span>
            </div>
            <div className="text-3xl font-bold text-on-surface mb-2">14.2%</div>
            <div className="flex items-center gap-2 text-sm text-on-surface-variant/70 mb-4">
              <span>Industry avg: 4.2%</span>
            </div>
          </div>
          {/* Mini Sparkline */}
          <div className="h-12 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { val: 10 }, { val: 12 }, { val: 11 }, { val: 13 }, { val: 14.2 }, { val: 13.8 }, { val: 14.2 }
              ]}>
                <defs>
                  <linearGradient id="sparkEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#sparkEng)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 mb-8 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="font-bold text-base flex items-center gap-2 text-on-surface">
            <TrendingUp size={18} className="text-primary" />
            Growth Evolution
          </h3>
          <div className="flex gap-4 text-sm font-medium text-on-surface-variant">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-primary"></div>Views</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>Likes</div>
          </div>
        </div>
        
        {/* Recharts Chart */}
        <div className="w-full h-[220px] z-10 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e2128', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ fontWeight: '500' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: '4 4' }}
                formatter={(value: number, name: string) => [formatYAxis(value), name]}
              />
              <Area type="monotone" dataKey="views" name="Views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="likes" name="Likes" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#colorLikes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Videos Table */}
      <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30">
          <h3 className="font-bold text-base text-on-surface">Recent Posts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-on-surface-variant uppercase tracking-widest bg-surface-container-highest/30">
                <th className="p-4 font-medium">Video</th>
                <th className="p-4 font-medium">Platform</th>
                <th className="p-4 font-medium">Views</th>
                <th className="p-4 font-medium">Likes</th>
                <th className="p-4 font-medium">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {filteredVideos.map((video) => (
                <tr key={video.id} className="hover:bg-on-surface/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-on-surface">{video.title}</div>
                    <div className="text-xs text-on-surface-variant/70">{video.date}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      video.platform === 'TikTok' ? 'bg-[#00f2fe]/10 text-[#00f2fe]' :
                      video.platform === 'Instagram' ? 'bg-[#ff0844]/10 text-[#ff0844]' :
                      'bg-[#1877f2]/10 text-[#1877f2]'
                    }`}>
                      {video.platform}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-on-surface"><div className="flex items-center gap-2"><Eye size={14} className="text-on-surface-variant/70"/> {video.views}</div></td>
                  <td className="p-4 font-medium text-on-surface"><div className="flex items-center gap-2"><Heart size={14} className="text-on-surface-variant/70"/> {video.likes}</div></td>
                  <td className="p-4 font-medium text-on-surface"><div className="flex items-center gap-2"><MessageCircle size={14} className="text-on-surface-variant/70"/> {video.comments}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
