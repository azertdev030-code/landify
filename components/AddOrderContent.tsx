
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Save, 
  User, 
  ShoppingCart, 
  DollarSign, 
  Globe, 
  Video, 
  Ghost, 
  Facebook, 
  MousePointer2, 
  Info,
  Plus,
  Trash2,
  ChevronDown,
  Search,
  X,
  Package,
  Check,
  ChevronRight,
  MapPin,
  FileText
} from 'lucide-react';
import { Order, OrderSource } from './OrdersContent';
import { Product, Variant } from './ProductsContent';

interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: Variant;
}

interface AddOrderContentProps {
  onBack: () => void;
  initialData?: Order;
  availableProducts: Product[];
}

const AddOrderContent: React.FC<AddOrderContentProps> = ({ onBack, initialData, availableProducts }) => {
  const [source, setSource] = useState<OrderSource>(initialData?.source || 'manual');
  const [customer, setCustomer] = useState(initialData?.customer || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [state, setState] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<Order['status']>(initialData?.status || 'pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [selectedProductToPickVariant, setSelectedProductToPickVariant] = useState<Product | null>(null);

  const sources: { id: OrderSource, label: string, icon: React.ReactNode }[] = [
    { id: 'tiktok', label: 'تيك توك', icon: <Video size={16} /> },
    { id: 'snapchat', label: 'سناب شات', icon: <Ghost size={16} /> },
    { id: 'meta', label: 'ميتا', icon: <Facebook size={16} /> },
    { id: 'manual', label: 'يدوي', icon: <MousePointer2 size={16} /> },
    { id: 'other', label: 'مصدر آخر', icon: <Globe size={16} /> },
  ];

  const filteredProducts = useMemo(() => {
    return availableProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [availableProducts, searchQuery]);

  const handleProductSelect = (product: Product) => {
    if (product.variants && product.variants.length > 0) {
      setSelectedProductToPickVariant(product);
    } else {
      addToCart(product);
    }
  };

  const addToCart = (product: Product, variant?: Variant) => {
    const cartId = variant ? `${product.id}-${variant.id}` : product.id;
    const existing = cartItems.find(item => item.cartId === cartId);
    
    if (existing) {
      setCartItems(cartItems.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, {
        cartId,
        productId: product.id,
        name: product.name,
        price: variant ? parseFloat(variant.price) : parseFloat(product.price),
        quantity: 1,
        variant: variant
      }]);
    }
    setIsProductListOpen(false);
    setSelectedProductToPickVariant(null);
    setSearchQuery('');
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, q: number) => {
    if (q < 1) return;
    setCartItems(cartItems.map(item => item.cartId === cartId ? { ...item, quantity: q } : item));
  };

  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const shipping = 25.00;
  const total = subTotal + shipping;

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-all shadow-sm active:scale-95">
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{initialData ? 'تعديل طلب' : 'إضافة طلب جديد'}</h1>
            <p className="text-slate-500 font-medium text-sm mt-0.5">أدخل بيانات العميل التفصيلية واختر المنتجات المطلوبة.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 active:scale-95 flex items-center gap-2">
          <Save size={18} />
          {initialData ? 'حفظ التغييرات' : 'اعتماد الطلب'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User size={18} className="text-indigo-600" />
              <h2 className="text-base font-bold text-slate-800">بيانات العميل والشحن</h2>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest mr-1">الاسم الكامل</label>
                  <input 
                    type="text" 
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="مثال: محمد عبدالله" 
                    className={inputClasses} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest mr-1">رقم الهاتف</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XXXXXXXX" 
                    className={inputClasses + " font-mono"} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest mr-1">الولاية / المحافظة</label>
                  <input 
                    type="text" 
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="أدخل الولاية" 
                    className={inputClasses} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest mr-1">البلدية / المدينة</label>
                  <input 
                    type="text" 
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    placeholder="أدخل البلدية" 
                    className={inputClasses} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest mr-1">العنوان التفصيلي</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="مثال: حي الرمال، شارع التجارة، منزل رقم 4" 
                    className={inputClasses + " pl-10"} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest mr-1">ملاحظات إضافية</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-4 text-slate-300" />
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="ملاحظات حول التوصيل أو الطلب..." 
                    className={inputClasses + " pl-10 pt-3 resize-none"} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-indigo-600" />
                <h2 className="text-base font-bold text-slate-800">سلة المشتريات</h2>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setIsProductListOpen(!isProductListOpen)}
                  className="text-xs font-black text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 flex items-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  {isProductListOpen ? <X size={14} /> : <Plus size={14} />}
                  إضافة منتج للسلة
                </button>
                
                {isProductListOpen && (
                  <div className="absolute left-0 top-full mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95">
                    {!selectedProductToPickVariant ? (
                      <>
                        <div className="relative mb-4">
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                            type="text" 
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ابحث باسم المنتج..." 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-xs font-bold outline-none focus:border-indigo-400 focus:bg-white transition-all" 
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto space-y-2 no-scrollbar">
                          {filteredProducts.map(p => (
                            <button 
                              key={p.id}
                              onClick={() => handleProductSelect(p)}
                              className="w-full text-right p-3 hover:bg-indigo-50/50 rounded-xl flex items-center justify-between group transition-all border border-transparent hover:border-indigo-100"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:border-indigo-200 transition-all">
                                   <Package size={16} />
                                </div>
                                <div>
                                  <p className="text-[11px] font-black text-slate-800 leading-none">{p.name}</p>
                                  {p.variants.length > 0 && (
                                    <p className="text-[9px] font-bold text-indigo-400 mt-1 uppercase">يتوفر {p.variants.length} متغيرات</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400">{p.price} ر.س</span>
                                <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 rotate-180" />
                              </div>
                            </button>
                          ))}
                          {filteredProducts.length === 0 && (
                             <div className="py-8 text-center opacity-30">
                                <Search size={24} className="mx-auto mb-2" />
                                <p className="text-[10px] font-bold uppercase">لا توجد نتائج</p>
                             </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="animate-in slide-in-from-right-4">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                          <button onClick={() => setSelectedProductToPickVariant(null)} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                             <ChevronRight size={12} /> رجوع
                          </button>
                          <span className="text-[10px] font-black text-slate-800 uppercase">اختر المتغير</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 mb-3">{selectedProductToPickVariant.name}</p>
                        <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                          {selectedProductToPickVariant.variants.map(v => (
                            <button 
                              key={v.id}
                              onClick={() => addToCart(selectedProductToPickVariant, v)}
                              className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-right group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {v.combination.map((c, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-black text-slate-600 group-hover:border-indigo-200">{c}</span>
                                  ))}
                                </div>
                                <span className="text-[10px] font-black text-indigo-600">{v.price} ر.س</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50/50 border border-slate-200 rounded-2xl group hover:bg-white hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-4 mb-3 md:mb-0">
                    <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 group-hover:border-indigo-100 group-hover:text-indigo-500 transition-all">
                      <Package size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-tight">{item.name}</p>
                      {item.variant && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.variant.combination.map((c, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded text-[8px] font-black uppercase">{c}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-[9px] text-slate-400 font-black uppercase mt-1.5 tracking-tighter">سعر القطعة: {item.price.toFixed(2)} ر.س</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-sm">
                      <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="p-1 hover:text-indigo-600 transition-colors text-slate-400 hover:bg-slate-50 rounded-md">
                        <X size={12} strokeWidth={3} />
                      </button>
                      <span className="text-sm font-black text-slate-800 min-w-[24px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="p-1 hover:text-indigo-600 transition-colors text-slate-400 hover:bg-slate-50 rounded-md">
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                    <div className="text-left min-w-[100px]">
                      <span className="text-sm font-black text-indigo-600">{(item.price * item.quantity).toFixed(2)}</span>
                      <span className="text-[9px] font-bold text-indigo-400 mr-1 uppercase">ر.س</span>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-slate-300 hover:text-rose-500 transition-all p-2 hover:bg-rose-50 rounded-xl">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              
              {cartItems.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/20">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                    <ShoppingCart size={32} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">السلة فارغة حالياً</h4>
                  <p className="text-[10px] text-slate-400 font-medium">ابدأ بإضافة المنتجات للطلب من خلال زر "إضافة منتج"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel: Order Metadata */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Info size={18} className="text-indigo-600" />
              <h2 className="text-base font-bold text-slate-800">تفاصيل القناة والحالة</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest mr-1">قناة البيع (المصدر)</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {sources.map((s) => (
                    <button 
                      key={s.id}
                      onClick={() => setSource(s.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
                        source === s.id 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-indigo-200'
                      }`}
                    >
                      <span className={`${source === s.id ? 'text-white' : 'text-slate-400'}`}>{s.icon}</span>
                      {s.label}
                      {source === s.id && <Check size={14} className="mr-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest mr-1">حالة الطلبية الحالية</label>
                <div className="relative">
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Order['status'])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 appearance-none text-xs font-bold cursor-pointer"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="processing">جاري التجهيز</option>
                    <option value="completed">تم التوصيل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
            <h2 className="text-base font-black mb-8 flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={20} className="text-indigo-400" /></div>
              ملخص الفاتورة
            </h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center text-xs font-bold opacity-60">
                <span>المجموع الفرعي</span>
                <span className="tracking-tight">{subTotal.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold opacity-60">
                <span>تكاليف الشحن</span>
                <span className="tracking-tight">{shipping.toFixed(2)} ر.س</span>
              </div>
              <div className="border-t border-white/5 pt-6 mt-4 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">المجموع النهائي</p>
                  <span className="text-3xl font-black tracking-tighter">{total.toFixed(2)}</span>
                </div>
                <span className="text-xs font-bold opacity-40 mb-1.5 uppercase">ريال سعودي</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderContent;
