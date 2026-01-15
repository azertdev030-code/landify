
import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  Save, 
  Facebook, 
  Ghost, 
  Video, 
  Globe, 
  ShieldCheck,
  Building,
  Mail,
  Phone,
  Image as ImageIcon,
  Plus,
  Trash2,
  Zap,
  CheckCircle2,
  X,
  Code2,
  ExternalLink,
  Link,
  Instagram,
  Twitter,
  AlertCircle
} from 'lucide-react';

interface Pixel {
  id: string;
  name: string;
  platform: 'facebook' | 'tiktok' | 'snapchat' | 'google';
  pixelId: string;
  type: 'pixel' | 'capi';
  status: 'active' | 'inactive';
}

interface SettingsContentProps {
  activeTab: 'general' | 'pixels';
}

const SettingsContent: React.FC<SettingsContentProps> = ({ activeTab }) => {
  const [pixels, setPixels] = useState<Pixel[]>([
    { id: '1', name: 'بكسل الفيسبوك الرئيسي', platform: 'facebook', pixelId: '123456789', type: 'pixel', status: 'active' },
    { id: '2', name: 'تيك توك - Conversion', platform: 'tiktok', pixelId: 'TT-998877', type: 'capi', status: 'active' },
  ]);

  const addPixel = () => {
    const newPixel: Pixel = {
      id: Date.now().toString(),
      name: 'بكسل جديد',
      platform: 'facebook',
      pixelId: '',
      type: 'pixel',
      status: 'active'
    };
    setPixels([...pixels, newPixel]);
  };

  const removePixel = (id: string) => {
    setPixels(pixels.filter(p => p.id !== id));
  };

  const updatePixel = (id: string, field: keyof Pixel, value: string) => {
    setPixels(pixels.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const getPlatformIcon = (platform: Pixel['platform']) => {
    switch (platform) {
      case 'facebook': return <Facebook size={18} className="text-blue-600" />;
      case 'tiktok': return <Video size={18} className="text-black" />;
      case 'snapchat': return <Ghost size={18} className="text-yellow-500" />;
      case 'google': return <Globe size={18} className="text-emerald-600" />;
    }
  };

  // Unified Input Classes
  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold shadow-sm";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">إعدادات المنصة</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">تحكم في هوية متجرك، الدومين المخصص، وأدوات التتبع.</p>
        </div>
        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 flex items-center gap-2">
          <Save size={18} /> حفظ التغييرات
        </button>
      </header>

      {activeTab === 'general' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shadow-inner border border-indigo-100"><Building size={20} /></div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">هوية المتجر</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">بيانات الظهور للعملاء</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">اسم المتجر</label>
                  <input type="text" placeholder="مثال: متجر لوحتي" className={inputClasses} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">بريد التواصل</label>
                  <input type="email" placeholder="support@lohati.com" className={inputClasses + " font-mono"} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">وصف المتجر (SEO)</label>
                  <textarea rows={3} placeholder="اكتب وصفاً مختصراً يظهر في محركات البحث..." className={inputClasses + " resize-none"} />
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shadow-inner border border-emerald-100"><Link size={20} /></div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800">الدومين المخصص</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">اربط نطاقك الخاص بمتجرك</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase border border-amber-100 flex items-center gap-1.5 shadow-sm">
                  <AlertCircle size={12} /> بانتظار الربط
                </div>
               </div>

               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input type="text" placeholder="example.com" className={inputClasses + " font-mono pr-12"} />
                    </div>
                    <button className="px-8 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all shadow-lg active:scale-95">تحقق</button>
                 </div>

                 <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 border-dashed space-y-4">
                    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">إعدادات DNS المطلوبة:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center group shadow-sm transition-all hover:border-indigo-100">
                        <div className="text-right">
                          <p className="text-[8px] font-black text-slate-300 uppercase">النوع</p>
                          <p className="text-[11px] font-black text-indigo-600">CNAME</p>
                        </div>
                        <div className="text-left">
                          <p className="text-[8px] font-black text-slate-300 uppercase">القيمة</p>
                          <p className="text-[11px] font-black text-slate-800 font-mono">shops.lohati.com</p>
                        </div>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center group shadow-sm transition-all hover:border-indigo-100">
                        <div className="text-right">
                          <p className="text-[8px] font-black text-slate-300 uppercase">النوع</p>
                          <p className="text-[11px] font-black text-indigo-600">A Record</p>
                        </div>
                        <div className="text-left">
                          <p className="text-[8px] font-black text-slate-300 uppercase">القيمة</p>
                          <p className="text-[11px] font-black text-slate-800 font-mono">151.101.1.195</p>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">شعار المتجر</h3>
              <div className="relative group mx-auto w-32 h-32">
                <div className="w-full h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-300 hover:border-indigo-300 cursor-pointer transition-all hover:bg-white group">
                  <ImageIcon size={32} className="mb-2 opacity-50 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase">اضغط للرفع</span>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">التواصل الاجتماعي</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Instagram className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="text" placeholder="رابط إنستجرام" className={inputClasses + " py-2.5 text-[11px] pr-12 font-mono"} />
                </div>
                <div className="relative">
                  <Twitter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="text" placeholder="رابط تويتر" className={inputClasses + " py-2.5 text-[11px] pr-12 font-mono"} />
                </div>
                <div className="relative">
                  <Video className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="text" placeholder="رابط تيك توك" className={inputClasses + " py-2.5 text-[11px] pr-12 font-mono"} />
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex items-center justify-between bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100 shadow-inner"><Cpu size={24} /></div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">إدارة البكسلات</h2>
                  <p className="text-xs text-slate-400 font-bold">اربط أدوات التتبع (Facebook, TikTok, Snap) في مكان واحد.</p>
                </div>
             </div>
             <button onClick={addPixel} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95 shadow-lg">
               <Plus size={18} /> إضافة بكسل جديد
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pixels.map(pixel => (
              <div key={pixel.id} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm group hover:border-indigo-300 transition-all relative">
                <button onClick={() => removePixel(pixel.id)} className="absolute top-6 left-6 p-2 text-slate-200 hover:text-rose-500 transition-all hover:bg-rose-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
                
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                     {getPlatformIcon(pixel.platform)}
                   </div>
                   <input 
                      type="text" 
                      value={pixel.name} 
                      onChange={(e) => updatePixel(pixel.id, 'name', e.target.value)}
                      className="bg-transparent border-none outline-none text-sm font-black text-slate-800 p-0 focus:ring-0 w-full"
                    />
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <select 
                      value={pixel.platform}
                      onChange={(e) => updatePixel(pixel.id, 'platform', e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-[10px] font-black outline-none cursor-pointer hover:border-indigo-200 transition-all"
                    >
                      <option value="facebook">Facebook</option>
                      <option value="tiktok">TikTok</option>
                      <option value="snapchat">Snapchat</option>
                      <option value="google">Google Tag</option>
                    </select>

                    <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
                      <button 
                        onClick={() => updatePixel(pixel.id, 'type', 'pixel')}
                        className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${pixel.type === 'pixel' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                      >
                        بكسل
                      </button>
                      <button 
                        onClick={() => updatePixel(pixel.id, 'type', 'capi')}
                        className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${pixel.type === 'capi' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                      >
                        CAPI
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <Code2 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      type="text" 
                      placeholder="Pixel ID" 
                      value={pixel.pixelId}
                      onChange={(e) => updatePixel(pixel.id, 'pixelId', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-[10px] font-bold font-mono outline-none shadow-inner"
                    />
                  </div>

                  {pixel.type === 'capi' && (
                    <textarea 
                      placeholder="Access Token (CAPI)" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-[9px] font-mono outline-none h-24 resize-none shadow-inner"
                    />
                  )}
                  
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black text-emerald-600 uppercase">نشط ومتصل</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Instagram = ({ className, size }: { className?: string, size?: number }) => <Link className={className} size={size} />;

export default SettingsContent;
