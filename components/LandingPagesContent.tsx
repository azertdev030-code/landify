
import React from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  ExternalLink, 
  MousePointer2, 
  BarChart2,
  Monitor
} from 'lucide-react';

export interface LandingPage {
  id: string;
  name: string;
  productId: string;
  productName: string;
  theme: 'classic' | 'modern' | 'minimal';
  status: 'active' | 'draft';
  views: number;
  conversions: number;
  url: string;
}

interface LandingPagesContentProps {
  pages: LandingPage[];
  onAddClick: () => void;
  onEditClick: (page: LandingPage) => void;
  onDeleteClick: (id: string) => void;
}

const LandingPagesContent: React.FC<LandingPagesContentProps> = ({ pages, onAddClick, onEditClick, onDeleteClick }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">صفحات الهبوط</h1>
          <p className="text-slate-500 font-medium text-sm mt-0.5">أنشئ صفحات بيع مخصصة لمنتجاتك بضغطة زر واحدة.</p>
        </div>
        <button 
          onClick={onAddClick}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 w-fit active:scale-95"
        >
          <Plus size={18} />
          إنشاء صفحة هبوط
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'إجمالي المشاهدات', val: pages.reduce((acc, p) => acc + p.views, 0).toLocaleString(), icon: <Eye size={18} />, color: 'text-indigo-600' },
          { label: 'إجمالي الطلبات', val: pages.reduce((acc, p) => acc + p.conversions, 0).toLocaleString(), icon: <MousePointer2 size={18} />, color: 'text-emerald-600' },
          { label: 'متوسط التحويل', val: '4.2%', icon: <BarChart2 size={18} />, color: 'text-amber-600' },
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className={`text-xl font-black mt-1 ${s.color}`}>{s.val}</p>
            </div>
            <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 ${s.color}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">اسم الصفحة</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">المنتج المرتبط</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الثيم</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">المشاهدات</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">التحويلات</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Monitor size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 leading-none block">{page.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold mt-1 block">/{page.url}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{page.productName}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-black uppercase tracking-tight">
                      {page.theme}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-xs font-black text-slate-600">{page.views}</td>
                  <td className="px-6 py-5 text-center text-xs font-black text-emerald-600">{page.conversions}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${page.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                      {page.status === 'active' ? 'نشط' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="معاينة">
                        <ExternalLink size={16} />
                      </button>
                      <button 
                        onClick={() => onEditClick(page)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="تعديل"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDeleteClick(page.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Monitor size={48} className="text-slate-200" strokeWidth={1.5} />
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">لا توجد صفحات هبوط حالياً</p>
                      <button onClick={onAddClick} className="mt-2 text-xs font-bold text-indigo-600 hover:underline">أنشئ صفحتك الأولى الآن</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LandingPagesContent;
