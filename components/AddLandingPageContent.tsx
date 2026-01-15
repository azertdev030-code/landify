
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Save, 
  Palette, 
  Settings, 
  Package, 
  ChevronDown, 
  Plus, 
  Info,
  Check,
  Type,
  Smartphone,
  CheckCircle2,
  Trash2,
  AlignCenter,
  AlignLeft,
  Columns,
  CreditCard,
  MapPin,
  ChevronLeft,
  Sparkles,
  Zap,
  Layout as LayoutIcon,
  Star,
  ShieldCheck,
  X,
  Search,
  ShoppingCart,
  RefreshCw,
  Monitor
} from 'lucide-react';
import { LandingPage } from './LandingPagesContent';
import { Product } from './ProductsContent';

interface AddLandingPageContentProps {
  onBack: () => void;
  initialData?: LandingPage;
  products: Product[];
}

const AddLandingPageContent: React.FC<AddLandingPageContentProps> = ({ onBack, initialData, products }) => {
  const [pageName, setPageName] = useState(initialData?.name || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [selectedProductId, setSelectedProductId] = useState(initialData?.productId || '');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5'); 
  const [bgColor, setBgColor] = useState('#ffffff'); 
  const [headerBg, setHeaderBg] = useState('#ffffff'); 
  const [textColor, setTextColor] = useState('#1e293b'); 
  const [btnTextColor, setBtnTextColor] = useState('#ffffff'); 
  const [headline, setHeadline] = useState('أفضل ساعة ذكية في عام 2024');
  const [ctaText, setCtaText] = useState('أرسل الطلب الآن');
  const [description, setDescription] = useState('استمتع بمميزات غير محدودة مع تصميم عصري وأداء جبار يدوم طويلاً.');

  const [formFields, setFormFields] = useState({
    name: true,
    phone: true,
    city: true,
    address: false,
    email: false,
    notes: false
  });

  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId), [products, selectedProductId]);

  const toggleField = (field: keyof typeof formFields) => {
    setFormFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Unified Input Classes
  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold shadow-sm";

  const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 shadow-sm transition-all">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-7 h-7 rounded-lg border-0 p-0 cursor-pointer bg-transparent" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent border-0 outline-none text-[10px] font-black font-mono" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-in fade-in duration-500 overflow-hidden">
      {/* Header Bar */}
      <header className="flex items-center justify-between mb-4 shrink-0 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:text-indigo-600 transition-all active:scale-95 shadow-sm">
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">باني صفحات الهبوط</h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">تصميم متجاوب • معاينة حية</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 flex items-center gap-2">
            <Save size={16} /> حفظ الصفحة
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Controls Panel */}
        <div className="w-full lg:w-[320px] xl:w-[360px] overflow-y-auto no-scrollbar space-y-6 pb-20 px-1 shrink-0">
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Search size={16} className="text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800">المنتج الأساسي</h2>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                <select 
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className={inputClasses + " appearance-none cursor-pointer"}
                >
                  <option value="">اختر المنتج...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              {selectedProduct && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl animate-in zoom-in-95">
                  <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 overflow-hidden shrink-0">
                    {selectedProduct.image ? <img src={selectedProduct.image} className="w-full h-full object-cover" /> : <Package size={20} className="text-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-slate-800 leading-tight">{selectedProduct.name}</p>
                    <p className="text-[10px] font-black text-indigo-600 mt-1">{selectedProduct.price} ر.س</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Palette size={16} className="text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800">الألوان والهوية</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ColorInput label="اللون الأساسي" value={primaryColor} onChange={setPrimaryColor} />
              <ColorInput label="الخلفية" value={bgColor} onChange={setBgColor} />
              <ColorInput label="الهيدر" value={headerBg} onChange={setHeaderBg} />
              <ColorInput label="النصوص" value={textColor} onChange={setTextColor} />
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Type size={16} className="text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800">المحتوى</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">العنوان الجذاب</label>
                <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">الوصف التسويقي</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={inputClasses + " h-24 resize-none leading-relaxed"} />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">نص زر الطلب</label>
                <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} className={inputClasses} />
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <LayoutIcon size={16} className="text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800">حقول النموذج</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(formFields) as Array<keyof typeof formFields>).map((field) => (
                <button 
                  key={field}
                  onClick={() => toggleField(field)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    formFields[field] ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold">
                    {field === 'name' && 'الاسم'}
                    {field === 'phone' && 'الجوال'}
                    {field === 'city' && 'المدينة'}
                    {field === 'address' && 'العنوان'}
                    {field === 'email' && 'البريد'}
                    {field === 'notes' && 'ملاحظات'}
                  </span>
                  {formFields[field] ? <Check size={12} strokeWidth={4} /> : <Plus size={12} />}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* PREVIEW AREA */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-start bg-slate-200/20 border border-slate-200 rounded-xl overflow-hidden relative shadow-inner p-4">
          
          <div className="w-full max-w-[450px] flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-xl border border-slate-100 mb-6 animate-in slide-in-from-top-4">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-slate-900 text-white rounded-lg"><Smartphone size={16} /></div>
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">معاينة الجوال</span>
             </div>
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black uppercase tracking-tighter">تحديث مباشر</span>
               </div>
               <RefreshCw size={14} className="text-slate-300" />
             </div>
          </div>

          <div className="w-full max-w-[450px] flex-1 bg-white rounded-xl shadow-2xl relative flex flex-col overflow-hidden border border-black/[0.02]">
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth" dir="rtl" style={{ backgroundColor: bgColor, color: textColor }}>
              <div className="h-16 sticky top-0 z-40 flex items-center justify-between px-8 border-b border-black/[0.01] shadow-sm backdrop-blur-md" style={{ backgroundColor: headerBg }}>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div>
                   <span className="font-black text-base tracking-tight" style={{ color: textColor }}>Lohati Store</span>
                 </div>
                 <ShoppingCart size={20} className="opacity-30" />
              </div>

              <div className="p-6 pb-20">
                <div className="aspect-square bg-white rounded-xl overflow-hidden border border-black/[0.03] mb-10 shadow-lg relative group">
                  {selectedProduct?.image ? (
                    <img src={selectedProduct.image} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-200 bg-slate-50">
                      <Package size={80} strokeWidth={0.5} className="opacity-10" />
                    </div>
                  )}
                  <div className="absolute top-6 right-6 bg-rose-600 text-white px-4 py-2 rounded-lg text-[10px] font-black">خصم 50%</div>
                </div>

                <div className="text-center mb-12 space-y-4">
                  <h2 className="text-3xl font-black leading-tight tracking-tight" style={{ color: textColor }}>
                    {selectedProduct?.name || headline}
                  </h2>
                  <p className="text-sm opacity-50 leading-relaxed max-w-[340px] mx-auto font-medium">
                    {description}
                  </p>
                  <div className="flex flex-col items-center pt-4">
                    <span className="text-base opacity-20 line-through font-bold mb-1">499.00 ر.س</span>
                    <div className="flex items-end gap-1.5">
                        <span className="text-5xl font-black tracking-tighter" style={{ color: primaryColor }}>{selectedProduct?.price || '299'}</span>
                        <span className="text-sm font-bold mb-1.5">ر.س</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-black/[0.02] rounded-xl p-8 shadow-md mb-12 relative overflow-hidden">
                   <div className="flex flex-col items-center mb-10 text-center">
                      <CreditCard size={32} className="mb-4" style={{ color: primaryColor }} />
                      <h3 className="text-xl font-black tracking-tight" style={{ color: textColor }}>أكد طلبك الآن</h3>
                      <p className="text-[9px] font-bold opacity-30 mt-2 uppercase tracking-widest">الدفع عند الاستلام كاش</p>
                   </div>

                   <div className="space-y-4">
                      {formFields.name && <input type="text" placeholder="الاسم الكامل" className="w-full bg-slate-50 border border-transparent rounded-lg py-4 px-6 text-sm font-bold outline-none shadow-inner" />}
                      {formFields.phone && <input type="text" placeholder="رقم الجوال" className="w-full bg-slate-50 border border-transparent rounded-lg py-4 px-6 text-sm font-bold outline-none shadow-inner" />}
                      {formFields.city && <input type="text" placeholder="المدينة" className="w-full bg-slate-50 border border-transparent rounded-lg py-4 px-6 text-sm font-bold outline-none shadow-inner" />}
                      
                      <button 
                        className="w-full py-5 rounded-lg font-black text-lg shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all mt-6"
                        style={{ backgroundColor: primaryColor, color: btnTextColor }}
                      >
                         {ctaText} <ChevronLeft size={20} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLandingPageContent;
