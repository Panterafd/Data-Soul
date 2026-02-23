import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Себет бос</h2>
        <p className="text-slate-500 mb-8">Сіз әлі ешқандай тауар таңдамадыңыз.</p>
        <Link to="/" className="bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors">
          Сауда жасау
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Себет</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.category}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="font-bold text-emerald-600">${item.price}</span>
                    <span className="text-sm text-slate-400">x {item.quantity}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Тапсырыс сомасы</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-slate-500">
                <span>Тауарлар құны</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Жеткізу</span>
                <span className="text-emerald-600">Тегін</span>
              </div>
              <div className="border-t border-slate-100 pt-2 mt-2 flex justify-between font-bold text-slate-900 text-lg">
                <span>Барлығы</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              Төлеуге өту <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
