import React from 'react';
import { Cat, ShoppingCart, User as UserIcon, LogOut, Menu } from 'lucide-react';
import { User, ViewState } from '../types';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  cartCount: number;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onLoginClick, 
  onLogoutClick, 
  cartCount,
  currentView,
  onNavigate
}) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-primary-500 p-2 rounded-xl text-white transform group-hover:rotate-12 transition-transform duration-300">
              <Cat size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors">
              Sonu's<span className="text-primary-500">Shop</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-primary-600' : 'text-slate-600 hover:text-primary-500'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('catalog')}
              className={`text-sm font-medium transition-colors ${currentView === 'catalog' ? 'text-primary-600' : 'text-slate-600 hover:text-primary-500'}`}
            >
              Our Cats
            </button>
            <button 
              className="text-sm font-medium text-slate-600 hover:text-primary-500 transition-colors"
            >
              About Us
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-slate-500">Welcome,</p>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                </div>
                <button 
                  onClick={onLogoutClick}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                <UserIcon size={16} />
                <span>Sign In</span>
              </button>
            )}
            
            <button className="md:hidden p-2 text-slate-600">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
