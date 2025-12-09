import React, { useState, useEffect } from 'react';
import { Cat, User, ViewState, CartItem } from './types';
import { MOCK_CATS, CAT_BREEDS } from './constants';
import { Navbar } from './components/Navbar';
import { CatCard } from './components/CatCard';
import { AuthModal } from './components/AuthModal';
import { AIChat } from './components/AIChat';
import { Button } from './components/Button';
import { Filter, ArrowRight, Heart, Star, ShieldCheck, CheckCircle, Search, Cat as CatIcon } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<string>('All');
  
  // Persist user
  useEffect(() => {
    const storedUser = localStorage.getItem('sonu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (name: string, email: string) => {
    const newUser: User = { id: 'u1', name, email };
    setUser(newUser);
    localStorage.setItem('sonu_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sonu_user');
    setView('home');
  };

  const addToCart = (cat: Cat) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (cart.find(item => item.cat.id === cat.id)) return;
    setCart([...cart, { cat, addedAt: Date.now() }]);
  };

  const removeFromCart = (catId: string) => {
    setCart(cart.filter(item => item.cat.id !== catId));
  };

  const filteredCats = MOCK_CATS.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBreed = selectedBreed === 'All' || cat.breed === selectedBreed;
    return matchesSearch && matchesBreed;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        user={user} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={handleLogout}
        cartCount={cart.length}
        currentView={view}
        onNavigate={setView}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <main className="pb-20">
        {/* HOME VIEW */}
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2043&q=80"
                  alt="Hero Cat" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white">
                  <div className="inline-block bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 rounded-full px-4 py-1 mb-6">
                    <span className="text-primary-300 font-medium text-sm">✨ #1 Cat Shop in Town</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
                    Find Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-300">Purrfect</span> Match
                  </h1>
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
                    Welcome to Sonu's. We connect loving families with adorable felines. 
                    Every adoption includes a starter kit and a lifetime of love.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => setView('catalog')}
                      className="group"
                    >
                      Browse Cats
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-white border-white/30 hover:bg-white/10 hover:border-white"
                      onClick={() => {
                        const element = document.getElementById('features');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      How it Works
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Sonu's?</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">We take pride in ethical breeding and adoption. Our cats are healthy, socialized, and ready to love.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: Heart, title: 'Health Guarantee', desc: 'Every cat comes with a full health checkup and vaccination records.' },
                    { icon: Star, title: 'Premium Bloodlines', desc: 'We source from reputable breeders ensuring excellent temperament.' },
                    { icon: ShieldCheck, title: 'Lifetime Support', desc: 'Our team is here to help you through every stage of pet parenthood.' }
                  ].map((feature, idx) => (
                    <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 text-center group">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-primary-500">
                        <feature.icon size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Cats Preview */}
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">New Arrivals</h2>
                    <p className="text-slate-600">Meet the latest additions to our family.</p>
                  </div>
                  <Button variant="ghost" onClick={() => setView('catalog')}>View All</Button>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MOCK_CATS.slice(0, 4).map(cat => (
                    <CatCard 
                      key={cat.id} 
                      cat={cat} 
                      onAdopt={addToCart}
                      onViewDetails={setSelectedCat}
                      isAdopted={cart.some(c => c.cat.id === cat.id)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* CATALOG VIEW */}
        {view === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Our Cats</h1>
                <p className="text-slate-500 mt-1">{filteredCats.length} lovely felines waiting for you</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none w-full sm:w-64"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    className="pl-10 pr-8 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none appearance-none bg-white w-full sm:w-48 cursor-pointer"
                    value={selectedBreed}
                    onChange={(e) => setSelectedBreed(e.target.value)}
                  >
                    <option value="All">All Breeds</option>
                    {CAT_BREEDS.map(breed => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {filteredCats.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCats.map(cat => (
                  <CatCard 
                    key={cat.id} 
                    cat={cat} 
                    onAdopt={addToCart} 
                    onViewDetails={setSelectedCat}
                    isAdopted={cart.some(c => c.cat.id === cat.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Search className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No cats found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        )}

        {/* CART VIEW */}
        {view === 'cart' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Adoption Request</h1>
            
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <div className="bg-slate-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <CatIcon className="text-slate-300" size={48} />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-2">Your basket is empty</h3>
                <p className="text-slate-500 mb-8">Ready to meet your new best friend?</p>
                <Button onClick={() => setView('catalog')}>Browse Cats</Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.cat.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <img src={item.cat.image} alt={item.cat.name} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-slate-900">{item.cat.name}</h3>
                          <span className="font-semibold text-primary-600">${item.cat.price}</span>
                        </div>
                        <p className="text-slate-500 text-sm">{item.cat.breed}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Added just now</span>
                          <button 
                            onClick={() => removeFromCart(item.cat.id)}
                            className="text-red-500 text-sm font-medium hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg sticky top-24">
                    <h3 className="font-bold text-lg mb-4">Summary</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-slate-600">
                        <span>Adoption Fee ({cart.length} cats)</span>
                        <span>${cart.reduce((sum, item) => sum + item.cat.price, 0)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Starter Kit</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="h-px bg-slate-100 my-2"></div>
                      <div className="flex justify-between font-bold text-lg text-slate-900">
                        <span>Total</span>
                        <span>${cart.reduce((sum, item) => sum + item.cat.price, 0)}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">Proceed to Checkout</Button>
                    <p className="text-xs text-slate-400 text-center mt-4">
                      By proceeding, you agree to our adoption terms.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CAT DETAILS MODAL */}
      {selectedCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedCat(null)}
          ></div>
          <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
             <button 
              onClick={() => setSelectedCat(null)}
              className="absolute top-4 right-4 z-10 bg-black/20 text-white hover:bg-black/40 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <ArrowRight size={24} className="rotate-45" /> {/* Using arrow as close X style */}
            </button>
            
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedCat.image} 
                alt={selectedCat.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h2 className="text-3xl font-bold text-white">{selectedCat.name}</h2>
                <p className="text-white/80">{selectedCat.breed}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 overflow-y-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary-50 px-4 py-2 rounded-xl text-center">
                  <span className="block text-xs text-primary-600 uppercase font-bold tracking-wider">Age</span>
                  <span className="font-semibold text-slate-900">{selectedCat.age} mo</span>
                </div>
                <div className="bg-secondary-50 px-4 py-2 rounded-xl text-center">
                  <span className="block text-xs text-secondary-600 uppercase font-bold tracking-wider">Gender</span>
                  <span className="font-semibold text-slate-900">{selectedCat.gender}</span>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-xl text-center">
                  <span className="block text-xs text-green-600 uppercase font-bold tracking-wider">Price</span>
                  <span className="font-semibold text-slate-900">${selectedCat.price}</span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-2">About {selectedCat.name}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {selectedCat.description}
              </p>

              <h3 className="font-bold text-lg mb-2">Personality</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedCat.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-slate-600">Vaccinated & Dewormed</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-slate-600">Microchipped</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-slate-600">30-Day Health Insurance</p>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={() => {
                    addToCart(selectedCat);
                    setSelectedCat(null);
                  }}
                  disabled={cart.some(c => c.cat.id === selectedCat.id)}
                >
                  {cart.some(c => c.cat.id === selectedCat.id) ? 'In Cart' : 'Adopt Me'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <CatIcon size={24} />
              <span className="font-bold text-xl">Sonu's<span className="text-primary-500">Shop</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting hearts and paws since 2023. We believe every cat deserves a loving home.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-500">Available Cats</a></li>
              <li><a href="#" className="hover:text-primary-500">Success Stories</a></li>
              <li><a href="#" className="hover:text-primary-500">Adoption Process</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Purr Street, Cat City</li>
              <li>hello@sonuspetshop.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full" 
                placeholder="Email address"
              />
              <button className="bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
};

export default App;