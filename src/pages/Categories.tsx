import { Laptop, Smartphone, Monitor, Headphones, Camera, Watch } from 'lucide-react';

export default function Categories() {
  const categories = [
    { name: 'Ноутбуктер', icon: Laptop, color: 'bg-blue-50 text-blue-600', description: 'Жұмыс және ойынға арналған қуатты ноутбуктер' },
    { name: 'Смартфондар', icon: Smartphone, color: 'bg-purple-50 text-purple-600', description: 'Соңғы үлгідегі смартфондар мен аксессуарлар' },
    { name: 'Компьютерлер', icon: Monitor, color: 'bg-orange-50 text-orange-600', description: 'Үйге және кеңсеге арналған дербес компьютерлер' },
    { name: 'Аудио', icon: Headphones, color: 'bg-pink-50 text-pink-600', description: 'Құлаққаптар, колонкалар және аудио жүйелер' },
    { name: 'Фото және Видео', icon: Camera, color: 'bg-green-50 text-green-600', description: 'Кәсіби камералар мен объективтер' },
    { name: 'Смарт сағаттар', icon: Watch, color: 'bg-indigo-50 text-indigo-600', description: 'Фитнес білезіктер мен смарт сағаттар' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Барлық категориялар</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all cursor-pointer flex items-start gap-4 group">
              <div className={`p-4 rounded-lg ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-slate-500 text-sm">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
