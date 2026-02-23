import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { items } = useCart();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('userRole'));

  // Listen for storage changes to update UI when login state changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener('auth-change', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.dispatchEvent(new Event('auth-change'));
    setUserRole(null);
    navigate('/');
  };

  const handleUserClick = () => {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      handleLogout();
    }
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 font-bold text-2xl tracking-tighter text-emerald-400">
              DATA SOUL
            </Link>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium">Басты бет</Link>
                <Link to="/categories" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium">Категориялар</Link>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-slate-800 text-slate-300 placeholder-slate-400 focus:outline-none focus:bg-white focus:text-slate-900 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Тауарларды іздеу..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="p-2 rounded-full hover:bg-slate-800 relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
            
            {userRole ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleUserClick}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium text-emerald-400">
                    {userRole === 'admin' ? 'Admin' : 'User'}
                  </span>
                </button>
                <button 
                  onClick={handleLogout} 
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Шығу"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 rounded-full hover:bg-slate-800">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
