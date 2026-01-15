
import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  Globe, 
  Facebook, 
  Ghost, 
  Video, 
  MousePointer2, 
  Calendar, 
  ShoppingBag,
  Phone,
  Hash
} from 'lucide-react';

export type OrderSource = 'tiktok' | 'snapchat' | 'meta' | 'manual' | 'other';

export interface Order {
  id: string;
  customer: string;
  phone?: string;
  total: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  payment: 'paid' | 'unpaid';
  source: OrderSource;
}

const SourceBadge: React.FC<{ source: OrderSource }> = ({ source }) => {
  const configs: Record<OrderSource, { label: string, color: string, icon: React.ReactNode }> = {
    tiktok: { label: 'تيك توك', color: 'bg-[#000000] text-white', icon: <Video size={10} fill="currentColor" /> },
    snapchat: { label: 'سناب شات', color: 'bg-[#FFFC00] text-black', icon: <Ghost size={10} fill="currentColor" /> },
    meta: { label: 'ميتا', color: 'bg-[#0668E1] text-white', icon: <Facebook size={10} fill="currentColor" /> },
    manual: { label: 'يدوي', color: 'bg-slate-800 text-white', icon: <MousePointer2 size={10} fill="currentColor" /> },
    other: { label: 'أخرى', color: 'bg-indigo-600 text-white', icon: <Globe size={10} fill="currentColor" /> },
  };
  const config = configs[source];
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm transition-transform hover:scale-105 cursor-default ${config.color}`}>
      <span className="shrink-0">{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

const OrderStatusBadge: React.FC<{ status: Order['status'], isAbandoned?: boolean }> = ({ status, isAbandoned }) => {
  if (isAbandoned) {
    return (
      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold border bg-rose-50 text-rose-600 border-rose-100 ring-2 ring-rose-500/10">
        سلة متروكة
      </span>
    );
  }
  const configs = {
    pending: { text: 'قيد الانتظار', classes: 'bg-amber-50 text-amber-600 border-amber-100 ring-2 ring-amber-500/10' },
    processing: { text: 'قيد التنفيذ', classes: 'bg-blue-50 text-blue-600 border-blue-100 ring-2 ring-blue-500/10' },
    completed: { text: 'مكتمل', classes: 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-2 ring-emerald-500/10' },
    cancelled: { text: 'ملغي', classes: 'bg-rose-50 text-rose-600 border-rose-100 ring-2 ring-rose-500/10' },
  };
  const config = configs[status];
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${config.classes}`}>
      {config.text}
    </span>
  );
};

interface OrdersContentProps {
  title: string;
  orders: Order[];
  onAddClick: () => void;
  onEditClick: (order: Order) => void;
  onDeleteClick: (id: string) => void;
  isAbandoned?: boolean;
}

const OrdersContent: React.FC<OrdersContentProps> = ({ title, orders, onAddClick, onEditClick, onDeleteClick, isAbandoned }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${isAbandoned ? 'bg-rose-500' : 'bg-indigo-600'}`}>
            {isAbandoned ? <ShoppingBag size={24} /> : <Hash size={24} />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
            <p className="text-slate-500 font-medium text-sm mt-0.5">
              {isAbandoned ? 'إدارة السلال التي لم يكمل أصحابها عملية الشراء.' : 'تتبع وإدارة طلبات عملائك من جميع المصادر.'}
            </p>
          </div>
        </div>
        {!isAbandoned && (
          <button 
            onClick={onAddClick}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 active:scale-95 flex items-center gap-2 w-fit"
          >
            <Plus size={18} />
            إضافة طلب جديد
          </button>
        )}
      </header>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isAbandoned ? 'إجمالي المتروكة' : 'الطلبات اليوم', val: orders.length.toString(), color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
          { label: 'قيمة السلال', val: '5,420 ر.س', color: 'text-blue-600', bg: 'bg-blue-50/50' },
          { label: 'أكثر مصدر', val: 'تيك توك', color: 'text-rose-600', bg: 'bg-rose-50/50' },
          { label: 'نسبة الاسترداد', val: '15%', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-indigo-200 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-400">{s.label}</p>
            <p className={`text-xl font-black mt-2 ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="البحث برقم الطلب، اسم العميل، أو رقم الجوال..." 
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-xl py-2.5 pr-11 pl-4 transition-all text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
            <Filter size={16} />
            تصفية النتائج
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden border-separate">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">المعرف</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">العميل</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم الجوال</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">المجموع</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">المصدر</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5 text-xs font-black text-indigo-600">#{order.id}</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-800 leading-none block">{order.customer}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Phone size={12} className="text-slate-300" />
                      {order.phone || '05XXXXXXXX'}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-slate-800 tracking-tight">{order.total} <span className="text-[10px] font-bold text-slate-400">ر.س</span></td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <Calendar size={12} />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <OrderStatusBadge status={order.status} isAbandoned={isAbandoned} />
                  </td>
                  <td className="px-6 py-5">
                    <SourceBadge source={order.source} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEditClick(order)}
                        className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                        title="تعديل"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDeleteClick(order.id)}
                        className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all border border-transparent hover:border-rose-100"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <ShoppingBag size={32} strokeWidth={1.5} />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">لا توجد سجلات حالياً</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">عرض {orders.length} من السجلات</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 transition-colors shadow-sm"><ChevronRight size={18} /></button>
            <button className="w-9 h-9 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-lg shadow-indigo-200">1</button>
            <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 transition-colors shadow-sm"><ChevronLeft size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersContent;
