import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { Package, Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    setError(null);
    fetch('/api/stats')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(setStats)
      .catch(err => {
        console.error('Error fetching stats:', err);
        setError(err.message || 'Failed to fetch stats');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="p-8">Жүктелуде...</div>;
  if (error) return (
    <div className="p-8 flex flex-col items-center justify-center gap-4">
      <div className="text-red-500">Қате: {error}</div>
      <button onClick={fetchStats} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
        Қайта көру
      </button>
    </div>
  );

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Админ панелі</h1>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-slate-500">Жүйе жұмыс істеп тұр</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Жалпы табыс', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600' },
            { label: 'Барлық тапсырыстар', value: stats.orders, icon: Package, color: 'text-blue-600' },
            { label: 'Белсенді сатушылар', value: stats.vendors, icon: Users, color: 'text-purple-600' },
            { label: 'Өсім', value: '+12.5%', icon: TrendingUp, color: 'text-orange-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Сатылым шолуы</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.sales}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    cursor={{fill: '#f1f5f9'}}
                  />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Табыс тренді</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.sales}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Moderation Queue */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-900">Сатушыларды модерациялау кезегі</h3>
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">3 Күтілуде</span>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Сатушы аты</th>
                <th className="px-6 py-4 font-medium">Өтініш күні</th>
                <th className="px-6 py-4 font-medium">Мәртебесі</th>
                <th className="px-6 py-4 font-medium text-right">Әрекет</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'TechGiant Solutions', date: '2023-10-24', status: 'Тексеруді күтуде' },
                { name: 'ElectroWorld', date: '2023-10-23', status: 'Құжаттарды күтуде' },
                { name: 'FastChips Inc.', date: '2023-10-22', status: 'Белгіленген' },
              ].map((vendor, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{vendor.name}</td>
                  <td className="px-6 py-4 text-slate-500">{vendor.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      <AlertCircle className="h-3 w-3" />
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium mr-3">Растау</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Қабылдамау</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
