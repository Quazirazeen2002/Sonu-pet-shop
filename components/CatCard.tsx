import React from 'react';
import { Cat } from '../types';
import { Heart, ShoppingBag, Info } from 'lucide-react';
import { Button } from './Button';

interface CatCardProps {
  cat: Cat;
  onAdopt: (cat: Cat) => void;
  onViewDetails: (cat: Cat) => void;
  isAdopted?: boolean;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onAdopt, onViewDetails, isAdopted }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full relative">
      {isAdopted && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold transform -rotate-12 shadow-lg text-lg">
            Adopted
          </span>
        </div>
      )}
      
      <div className="relative h-64 overflow-hidden">
        <img 
          src={cat.image} 
          alt={cat.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
            <Heart size={20} />
          </button>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
          <p className="text-white font-medium text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Available Now
          </p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{cat.name}</h3>
            <p className="text-slate-500 text-sm">{cat.breed}</p>
          </div>
          <span className="bg-primary-50 text-primary-600 font-bold px-3 py-1 rounded-lg text-sm">
            ${cat.price}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {cat.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 rounded-lg"
            onClick={() => onViewDetails(cat)}
          >
            <Info size={16} className="mr-2" /> Details
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1 rounded-lg"
            onClick={() => onAdopt(cat)}
            disabled={isAdopted}
          >
            <ShoppingBag size={16} className="mr-2" /> Adopt
          </Button>
        </div>
      </div>
    </div>
  );
};
