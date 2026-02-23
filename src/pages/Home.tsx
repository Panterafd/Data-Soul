import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { ArrowRight, Laptop, Smartphone, Monitor } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(setProducts)
      .catch(err => {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Жүктелуде...</div>;
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-red-500">Қате: {error}</div>
      <button onClick={fetchProducts} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
        Қайта көру
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-6">
                Кәсіби мамандарға арналған <br />
                <span className="text-emerald-400">Жаңа буын техникасы</span>
              </h1>
              <p className="text-slate-400 text-lg mb-8 max-w-md">
                Data Soul үздік сатушылардан жоғары өнімді электрониканы ұсынады. 
                Сапа кепілдігі, жылдам жеткізу.
              </p>
              <button className="bg-emerald-500 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-emerald-400 transition-colors flex items-center gap-2">
                Қазір сатып алу <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <img 
                src="https://picsum.photos/seed/tech/600/400" 
                alt="Hero Tech" 
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Категориялар</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ноутбуктер', icon: Laptop, color: 'bg-blue-50 text-blue-600' },
            { name: 'Смартфондар', icon: Smartphone, color: 'bg-purple-50 text-purple-600' },
            { name: 'Компьютерлер', icon: Monitor, color: 'bg-orange-50 text-orange-600' },
          ].map((cat) => (
            <div key={cat.name} className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
              <div className={`p-3 rounded-lg ${cat.color}`}>
                <cat.icon className="h-6 w-6" />
              </div>
              <span className="font-semibold text-slate-900">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Таңдаулы тауарлар</h2>
          <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700">Барлығын көру</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
