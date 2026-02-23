import React from 'react';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      <div className="aspect-square relative overflow-hidden bg-slate-100">
        <img 
          src={product.image_url} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      
      <div className="p-4">
        <div className="text-xs font-medium text-emerald-600 mb-1 uppercase tracking-wider">
          {product.category}
        </div>
        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">{product.title}</h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
            <span key={key} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
              {key}: {value}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-slate-900">${product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
