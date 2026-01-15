
import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingBag,
  BarChart3,
  User,
  Plus,
  Zap
} from 'lucide-react';

const StatCard: React.FC<{ label: string; value: string; trend: number; icon: React.ReactNode; color: string }> = ({ label, value, trend, icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all duration-200 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg border transition-colors duration-200 ${color}`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${trend >= 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
        {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{label}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

interface MainContentProps {
  onUpgrade?: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onUpgrade }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">مرحباً بك مجدداً، أحمد! 👋</h1>
          <p className="text-slate-500 font-medium text-sm mt-0.5">نظرة سريعة على أداء متجرك اليوم.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            تصدير البيانات
          </button>
          <button onClick={onUpgrade} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2">
            <Zap size={16} fill="white" />
            ترقية الخطة
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="إجمالي المبيعات" 
          value="$124,500" 
          trend={12.5} 
          color="bg-indigo-50 border-indigo-100 text-indigo-600"
          icon={<DollarSign size={20} />}
        />
        <StatCard 
          label="العملاء الجدد" 
          value="+1,240" 
          trend={8.2} 
          color="bg-violet-50 border-violet-100 text-violet-600"
          icon={<Users size={20} />}
        />
        <StatCard 
          label="الطلبات" 
          value="452" 
          trend={-2.4} 
          color="bg-rose-50 border-rose-100 text-rose-600"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard 
          label="النمو" 
          value="24.8%" 
          trend={4.1} 
          color="bg-amber-50 border-amber-100 text-amber-600"
          icon={<TrendingUp size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">مخطط الإيرادات</h2>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">مقارنة الأداء الشهري</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer">
              <option>آخر 30 يوم</option>
              <option>آخر سنة</option>
            </select>
          </div>
          <div className="w-full h-64 flex flex-col items-center justify-center text-slate-300 bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-200">
            <BarChart3 size={48} className="mb-2 opacity-30" />
            <p className="text-xs font-bold uppercase tracking-widest">جاري تحميل البيانات...</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">آخر النشاطات</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">طلب جديد #4592{i}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">منذ {i * 12} دقيقة • $120.00</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-lg transition-all">
            مشاهدة كل السجل
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
