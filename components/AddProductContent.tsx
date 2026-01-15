
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Layers, 
  Info,
  DollarSign,
  X,
  Check,
  Bold,
  Italic,
  List,
  Link,
  ChevronDown,
  Zap,
  UploadCloud,
  Palette,
  Type,
  Maximize2,
  Strikethrough,
  Underline,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Search,
  CheckCircle2
} from 'lucide-react';
import { Product, Variant } from './ProductsContent';

interface OptionValue {
  id: string;
  value: string;
  meta?: string; // For hex colors
}

interface ProductOption {
  id: string;
  name: string;
  type: 'text' | 'color';
  values: OptionValue[];
}

interface AddProductContentProps {
  onBack: () => void;
  initialData?: Product;
}

// Mock image library for the gallery
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
];

const AddProductContent: React.FC<AddProductContentProps> = ({ onBack, initialData }) => {
  const [productName, setProductName] = useState(initialData?.name || '');
  const [sku, setSku] = useState(initialData?.id ? `SKU-${initialData.id}` : '');
  const [basePrice, setBasePrice] = useState(initialData?.price || '');
  const [salePrice, setSalePrice] = useState('');
  const [totalStock, setTotalStock] = useState(initialData?.stock.toString() || '0');
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [variants, setVariants] = useState<Variant[]>(initialData?.variants || []);
  const [selectedImages, setSelectedImages] = useState<string[]>(initialData?.image ? [initialData.image] : []);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [pickerTab, setPickerTab] = useState<'gallery' | 'upload'>('gallery');

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold shadow-sm";

  // Cartesian Product Generator
  const generateCombinations = (opts: ProductOption[]) => {
    if (opts.length === 0 || opts.some(o => o.values.length === 0)) return [];
    
    let result: string[][] = [[]];
    opts.forEach(opt => {
      const nextResult: string[][] = [];
      opt.values.forEach(val => {
        result.forEach(res => {
          nextResult.push([...res, val.value]);
        });
      });
      result = nextResult;
    });

    return result.map((combo, idx) => {
      // Check if variant already exists to preserve values
      const comboKey = combo.join('-');
      const existing = variants.find(v => v.combination.join('-') === comboKey);
      
      return existing || {
        id: Math.random().toString(36).substr(2, 9),
        combination: combo,
        price: basePrice || '0.00',
        salePrice: salePrice || '',
        stock: '0',
        isEnabled: true,
        sku: `SKU-${Math.floor(Math.random() * 10000)}`
      };
    });
  };

  useEffect(() => {
    if (options.length > 0) {
      setVariants(generateCombinations(options));
    } else {
      setVariants([]);
    }
  }, [options, basePrice, salePrice]);

  const addOption = () => {
    setOptions([...options, { id: Date.now().toString(), name: '', type: 'text', values: [] }]);
  };

  const addValueToOption = (optionId: string, val: string) => {
    if (!val.trim()) return;
    setOptions(options.map(opt => opt.id === optionId ? { ...opt, values: [...opt.values, { id: Date.now().toString(), value: val }] } : opt));
  };

  const removeValue = (optionId: string, valId: string) => {
    setOptions(options.map(opt => opt.id === optionId ? { ...opt, values: opt.values.filter(v => v.id !== valId) } : opt));
  };

  const applyBulk = (field: 'price' | 'salePrice' | 'stock', value: string) => {
    setVariants(variants.map(v => v.isEnabled ? { ...v, [field]: value } : v));
  };

  const toggleImageSelection = (url: string) => {
    setSelectedImages(prev => prev.includes(url) ? prev.filter(i => i !== url) : [...prev, url]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      {/* Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-slate-100 animate-in zoom-in-95">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">إدارة صور المنتج</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">اختر صوراً من المعرض أو قم بالرفع من جهازك</p>
              </div>
              <button onClick={() => setShowImagePicker(false)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-all"><X size={20} /></button>
            </div>
            
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => setPickerTab('gallery')}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${pickerTab === 'gallery' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                معرض الصور
              </button>
              <button 
                onClick={() => setPickerTab('upload')}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${pickerTab === 'upload' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                رفع من الكمبيوتر
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {pickerTab === 'gallery' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {GALLERY_IMAGES.map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => toggleImageSelection(url)}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImages.includes(url) ? 'border-indigo-600 ring-4 ring-indigo-500/10' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                      <img src={url} className="w-full h-full object-cover" />
                      {selectedImages.includes(url) && (
                        <div className="absolute top-2 left-2 bg-indigo-600 text-white rounded-full p-1 shadow-lg">
                          <CheckCircle2 size={16} fill="white" className="text-indigo-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:shadow-indigo-50 transition-all mb-4">
                    <UploadCloud size={32} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">اسحب الصور هنا أو اضغط للاختيار</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">يدعم JPG, PNG (بحد أقصى 5MB)</p>
                  <input type="file" className="hidden" multiple />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800 tracking-tighter">تم تحديد {selectedImages.length} صور</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">الصور المختارة ستظهر في واجهة المنتج</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelectedImages([])} className="px-5 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all">إلغاء التحديد</button>
                <button onClick={() => setShowImagePicker(false)} className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-lg active:scale-95 transition-all">تأكيد واختيار</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-all shadow-sm active:scale-95">
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{initialData ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h1>
            <p className="text-slate-500 font-medium text-xs mt-0.5">تحكم في تفاصيل منتجك، خياراته، وصوره الاحترافية.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 flex items-center gap-2">
          <Save size={18} /> حفظ المنتج ونشره
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Content */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Info size={16} /></div>
              <h2 className="text-sm font-bold text-slate-800">المعلومات والوصف التفصيلي</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">اسم المنتج التسويقي</label>
                  <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="مثال: ساعة برو مكس 2024" className={inputClasses} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">كود المنتج الفريد (SKU)</label>
                  <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="PROD-500" className={inputClasses + " font-mono"} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">وصف المنتج (Rich Text Editor)</label>
                <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-all shadow-sm">
                  <div className="bg-slate-50 border-b border-slate-200 p-2.5 flex flex-wrap items-center gap-2">
                    <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors border-l border-slate-100"><Bold size={14} /></button>
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors border-l border-slate-100"><Italic size={14} /></button>
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors border-l border-slate-100"><Underline size={14} /></button>
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors"><Strikethrough size={14} /></button>
                    </div>
                    <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors border-l border-slate-100"><AlignRight size={14} /></button>
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors border-l border-slate-100"><AlignCenter size={14} /></button>
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors"><AlignLeft size={14} /></button>
                    </div>
                    <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors border-l border-slate-100"><List size={14} /></button>
                       <button className="p-1.5 hover:bg-slate-50 text-slate-500 transition-colors"><Link size={14} /></button>
                    </div>
                  </div>
                  <textarea rows={8} placeholder="أدخل تفاصيل ومميزات المنتج بأسلوب تسويقي جذاب..." className="w-full bg-white py-4 px-6 outline-none text-sm font-bold resize-none leading-relaxed" />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Variants Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Layers size={16} /></div>
                <h2 className="text-sm font-bold text-slate-800">خيارات المنتج المتعددة</h2>
              </div>
              <button onClick={addOption} className="text-[10px] font-black text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 flex items-center gap-2 transition-all shadow-sm active:scale-95">
                <Plus size={14} /> أضف خيار جديد (مثل: اللون)
              </button>
            </div>

            <div className="space-y-4">
              {options.map((opt) => (
                <div key={opt.id} className="p-5 bg-slate-50/50 border border-slate-200 rounded-xl animate-in slide-in-from-right-2">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-1">عنوان الخيار</label>
                       <input type="text" placeholder="مثال: اللون، المقاس، الخامة" value={opt.name} onChange={(e) => setOptions(options.map(o => o.id === opt.id ? {...o, name: e.target.value} : o))} className={inputClasses + " bg-white"} />
                    </div>
                    <div className="md:w-40 space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-1">نوع العرض</label>
                       <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                          <button onClick={() => setOptions(options.map(o => o.id === opt.id ? {...o, type: 'text'} : o))} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-black transition-all ${opt.type === 'text' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}>
                             <Type size={12} /> نص
                          </button>
                          <button onClick={() => setOptions(options.map(o => o.id === opt.id ? {...o, type: 'color'} : o))} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-black transition-all ${opt.type === 'color' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}>
                             <Palette size={12} /> لون
                          </button>
                       </div>
                    </div>
                    <button onClick={() => setOptions(options.filter(o => o.id !== opt.id))} className="mt-6 p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"><Trash2 size={20} /></button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-1">القيم المدخلة</label>
                    <div className="flex flex-wrap gap-2 items-center">
                      {opt.values.map(v => (
                        <span key={v.id} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-indigo-200">
                          {opt.type === 'color' && <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: v.value }} /> }
                          {v.value}
                          <button onClick={() => removeValue(opt.id, v.id)} className="text-slate-300 hover:text-rose-500 transition-colors"><X size={14} /></button>
                        </span>
                      ))}
                      <div className="relative">
                        <input 
                          type={opt.type === 'color' ? 'text' : 'text'} 
                          placeholder={opt.type === 'color' ? "أدخل كود اللون #..." : "أضف قيمة ثم Enter"} 
                          className={inputClasses + " py-2 text-xs w-56 bg-white"} 
                          onKeyDown={(e) => { 
                            if (e.key === 'Enter') { 
                              e.preventDefault();
                              addValueToOption(opt.id, e.currentTarget.value); 
                              e.currentTarget.value = ''; 
                            } 
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {variants.length > 0 && (
                <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden shadow-md animate-in zoom-in-95">
                  <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <Zap size={14} className="text-indigo-600" />
                       <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">تطبيق جماعي ذكي على كافة المتغيرات</h3>
                     </div>
                     <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-indigo-600 uppercase shadow-sm">{variants.length} احتمال مولد</span>
                  </div>
                  
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="bg-indigo-50/20 border-b border-slate-100">
                           <th colSpan={2} className="px-4 py-3 text-[10px] font-black text-indigo-700 text-center">أدخل القيمة للتطبيق على الكل ↪</th>
                           <th className="px-2 py-2"><input type="text" placeholder="السعر" onBlur={(e) => applyBulk('price', e.target.value)} className="w-full bg-white border border-indigo-200 rounded-lg py-2 px-2 text-center text-[10px] font-bold outline-none focus:ring-2 focus:ring-indigo-100" /></th>
                           <th className="px-2 py-2"><input type="text" placeholder="التخفيض" onBlur={(e) => applyBulk('salePrice', e.target.value)} className="w-full bg-white border border-indigo-200 rounded-lg py-2 px-2 text-center text-[10px] font-bold outline-none focus:ring-2 focus:ring-indigo-100" /></th>
                           <th className="px-2 py-2"><input type="text" placeholder="الكمية" onBlur={(e) => applyBulk('stock', e.target.value)} className="w-full bg-white border border-indigo-200 rounded-lg py-2 px-2 text-center text-[10px] font-bold outline-none focus:ring-2 focus:ring-indigo-100" /></th>
                           <th className="w-12"></th>
                        </tr>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-4 py-4 font-black text-slate-400 uppercase w-12 text-center tracking-tighter">نشط</th>
                          <th className="px-4 py-4 font-black text-slate-400 uppercase tracking-widest">المتغير</th>
                          <th className="px-4 py-4 font-black text-slate-400 uppercase text-center w-28 tracking-tighter">السعر</th>
                          <th className="px-4 py-4 font-black text-slate-400 uppercase text-center w-28 tracking-tighter">تخفيض</th>
                          <th className="px-4 py-4 font-black text-slate-400 uppercase text-center w-20 tracking-tighter">الكمية</th>
                          <th className="w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {variants.map(v => (
                          <tr key={v.id} className={`${v.isEnabled ? 'hover:bg-indigo-50/20 transition-colors' : 'bg-slate-50/40 opacity-40 grayscale'} transition-all`}>
                            <td className="px-4 py-3 text-center">
                               <input 
                                 type="checkbox" 
                                 checked={v.isEnabled} 
                                 onChange={(e) => setVariants(variants.map(vi => vi.id === v.id ? {...vi, isEnabled: e.target.checked} : vi))} 
                                 className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" 
                               />
                            </td>
                            <td className="px-4 py-3">
                               <div className="flex flex-wrap gap-1.5">
                                 {v.combination.map((c, idx) => (
                                    <span key={idx} className="bg-white border border-slate-100 text-slate-800 px-2 py-0.5 rounded-lg text-[10px] font-black shadow-sm">{c}</span>
                                 ))}
                               </div>
                            </td>
                            <td className="px-2 py-2">
                               <input type="text" value={v.price} onChange={(e) => setVariants(variants.map(vi => vi.id === v.id ? {...vi, price: e.target.value} : vi))} className="w-full bg-slate-50/50 border border-transparent rounded-lg py-2 px-2 text-center text-xs font-bold outline-none focus:bg-white focus:border-indigo-200" />
                            </td>
                            <td className="px-2 py-2">
                               <input type="text" value={v.salePrice} placeholder="---" onChange={(e) => setVariants(variants.map(vi => vi.id === v.id ? {...vi, salePrice: e.target.value} : vi))} className="w-full bg-slate-50/50 border border-transparent rounded-lg py-2 px-2 text-center text-xs font-bold outline-none focus:bg-white focus:border-indigo-200 text-emerald-600" />
                            </td>
                            <td className="px-2 py-2">
                               <input type="text" value={v.stock} onChange={(e) => setVariants(variants.map(vi => vi.id === v.id ? {...vi, stock: e.target.value} : vi))} className="w-full bg-slate-50/50 border border-transparent rounded-lg py-2 px-2 text-center text-xs font-bold outline-none focus:bg-white focus:border-indigo-200" />
                            </td>
                            <td className="px-4 py-3 text-center">
                               <button className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pricing Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><DollarSign size={16} /></div>
              <h2 className="text-sm font-bold text-slate-800">التسعير والمخزون الأساسي</h2>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">السعر الرسمي (ر.س)</label>
                <div className="relative">
                   <input type="text" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} placeholder="0.00" className={inputClasses + " pl-10 font-black"} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">السعر بعد التخفيض (ر.س)</label>
                <div className="relative">
                   <input type="text" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="0.00" className={inputClasses + " pl-10 text-emerald-600 font-black"} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">الكمية الإجمالية المتاحة</label>
                <input type="number" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} className={inputClasses + " font-black"} />
              </div>
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><ImageIcon size={16} /></div>
                <h2 className="text-sm font-bold text-slate-800">صور المنتج ({selectedImages.length})</h2>
              </div>
              <button onClick={() => setShowImagePicker(true)} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all shadow-sm"><Plus size={16} /></button>
            </div>
            
            {selectedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {selectedImages.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group shadow-sm">
                    <img src={url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button onClick={() => setSelectedImages(selectedImages.filter(img => img !== url))} className="p-2.5 bg-rose-500 text-white rounded-xl shadow-xl active:scale-90 transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                <div onClick={() => setShowImagePicker(true)} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-300 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer group">
                  <Plus size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase mt-2">إضافة المزيد</span>
                </div>
              </div>
            ) : (
              <div onClick={() => setShowImagePicker(true)} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer group p-6 text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-200 group-hover:text-indigo-500 group-hover:shadow-indigo-50 transition-all mb-4">
                  <ImageIcon size={24} />
                </div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">لم ترفع أي صور لهذا المنتج بعد</h4>
                <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100">اختر من المعرض</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductContent;
