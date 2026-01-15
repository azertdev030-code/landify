
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus,
  Table,
  Eye,
  Box,
  RefreshCcw,
  ArrowUpRight,
  Sparkles,
  Link2,
  Settings,
  X,
  Database
} from 'lucide-react';

const AppsContent: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [apps, setApps] = useState([
    { 
      id: 'gsheets', 
      name: 'Google Sheets', 
      icon: <Table size={32} />, 
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100', 
      desc: 'مزامنة الطلبات مع جداول بيانات جوجل فور وصولها.', 
      status: 'connected',
      category: 'productivity'
    },
    { 
      id: 'clarity', 
      name: 'Microsoft Clarity', 
      icon: <Eye size={32} />, 
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100', 
      desc: 'تحليل سلوك الزوار وتسجيل الجلسات بدقة عالية.', 
      status: 'not_connected',
      category: 'analytics'
    }
  ]);

  const activeApp = apps.find(a => a.id === selectedApp);

  // Unified Input Classes
  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold shadow-sm";

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20 relative">
      
      {/* Settings Modal */}
      {selectedApp && activeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 ${activeApp.color} rounded-xl flex items-center justify-center border shadow-sm`}>
                      {activeApp.icon}
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-slate-800">{activeApp.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">إعدادات الربط والتحكم</p>
                   </div>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mr-2">معرف الربط (API Key / ID)</label>
                    <input type="text" placeholder="أدخل المعرف الخاص بالتطبيق..." className={inputClasses + " font-mono"} />
                 </div>
                 <div className="pt-6 border-t border-slate-100 flex gap-3">
                    <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95">حفظ التغييرات</button>
                    <button className="px-6 py-3 bg-rose-50 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all">قطع الاتصال</button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-right">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 text-[10px] font-black uppercase tracking-widest mb-4">
             <Sparkles size={12} fill="currentColor" /> تطبيقات المتجر
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">مركز التطبيقات</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">اربط متجرك بالأدوات العالمية لنمو مبيعاتك.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
          <Link2 size={16} /> طلب ربط مخصص
        </button>
      </header>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map(app => (
          <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col group hover:border-indigo-200 transition-all hover:shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform duration-500`}>
                {app.icon}
              </div>
              {app.status === 'connected' ? (
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl border border-emerald-100 shadow-sm">
                  <CheckCircle2 size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase">متصل</span>
                </div>
              ) : (
                <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                  ربط الآن
                </button>
              )}
            </div>
            
            <h3 className="text-lg font-black text-slate-800 mb-2 relative z-10">{app.name}</h3>
            <p className="text-xs font-bold text-slate-400 leading-relaxed mb-8 flex-1 relative z-10">{app.desc}</p>
            
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
               <button 
                onClick={() => setSelectedApp(app.id)}
                className="text-[11px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest flex items-center gap-2 transition-all group/btn"
               >
                 إعدادات الربط <Settings size={16} />
               </button>
               {app.status === 'connected' && (
                 <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all shadow-sm active:scale-95">
                    <ArrowUpRight size={20} />
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Banner */}
      <div className="bg-slate-900 rounded-xl p-10 text-white text-center relative overflow-hidden shadow-2xl mt-6">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full"></div>
         <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
           <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/10 shadow-2xl backdrop-blur-md">
              <Box size={32} className="text-indigo-400" />
           </div>
           <h3 className="text-xl font-black mb-4">تطبيقات قادمة قريباً</h3>
           <p className="text-xs font-bold opacity-50 mb-8 leading-relaxed">نحن بصدد إطلاق تكاملات مع Zapier و WhatsApp وشركات الشحن العالمية.</p>
           <button className="px-10 py-3 bg-white text-slate-900 rounded-xl text-xs font-black hover:bg-indigo-50 transition-all active:scale-95">اطلب تطبيقاً خاصاً</button>
         </div>
      </div>
    </div>
  );
};

export default AppsContent;
