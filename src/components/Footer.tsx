import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">DATA SOUL</h3>
            <p className="text-sm text-slate-400">
              Жоғары сапалы электроникаға арналған сенімді дүкен. 
              Сатып алушыларды әлемдік деңгейдегі үздік сатушылармен байланыстырамыз.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Жылдам сілтемелер</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Біз туралы</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Дүкен</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Сатушылар</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Байланыс</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Байланыс</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                123 Tech Blvd, Silicon Valley
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500" />
                support@datasoul.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Бізді бақылаңыз</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-400 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Data Soul. Барлық құқықтар қорғалған.
        </div>
      </div>
    </footer>
  );
}
