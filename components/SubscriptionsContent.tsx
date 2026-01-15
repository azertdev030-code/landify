
import React from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Crown, 
  Rocket, 
  ShieldCheck, 
  ChevronRight, 
  Download,
  Calendar,
  CreditCard,
  Star,
  ArrowUpRight
} from 'lucide-react';

const PlanCard: React.FC<{ 
  name: string; 
  price: string; 
  features: string[]; 
  isCurrent?: boolean; 
  isPopular?: boolean; 
  icon: React.ReactNode;
  color: string;
}> = ({ name, price, features, isCurrent, isPopular, icon, color }) => (
  <div className={`
    relative bg-white p-8 rounded-3xl border transition-all duration-300 flex flex-col h-full
    ${isPopular ? 'border-indigo-600 shadow-2xl shadow-indigo-100 scale-105 z-10' : 'border-slate-200 shadow-sm hover:border-indigo-200'}
    ${isCurrent ? 'bg-indigo-50/20' : ''}
  `}>
    {isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
        <Star size={12} fill="white" /> الأكثر اختياراً
      </div>
    )}

    <div className="mb-8">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900">{name}</h3>
      <div className="mt-4 flex items-end gap-1">
         <span className="text-4xl font-black text-slate-900 tracking-tighter">{price}</span>
         <span className="text-sm font-bold text-slate-400 mb-1.5 uppercase">ر.س / شهر</span>
      </div>
    </div>

    <div className="space-y-4 mb-10 flex-1">
      {features.map((f, i) => (
        <div key={i} className="flex gap-3 text-sm font-bold text-slate-600">
           <CheckCircle2 size={18} className="text-indigo-500 shrink-0" />
           {f}
        </div>
      ))}
    </div>

    {isCurrent ? (
      <div className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black uppercase flex items-center justify-center gap-2 border border-emerald-100">
         <CheckCircle2 size={16} /> خطتك الحالية
      </div>
    ) : (
      <button className={`w-full py-4 rounded-2xl text-xs font-black uppercase transition-all active:scale-95 ${isPopular ? 'bg-indigo-600 text-white shadow-xl hover:bg-indigo-700' : 'bg-slate-900 text-white hover:bg-black'}`}>
         ترقية الآن
      </button>
    )}
  </div>
);

const SubscriptionsContent: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">الاشتراكات والخطط</h1>
          <p className="text-slate-500 font-bold text-sm mt-1">اختر الخطة المناسبة لحجم أعمالك وطموحاتك.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase">شهري</button>
           <button className="px-6 py-2 text-slate-400 hover:text-indigo-600 rounded-lg text-xs font-black uppercase transition-all">سنوي <span className="text-[10px] text-emerald-500 mr-1">-20%</span></button>
        </div>
      </header>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PlanCard 
          name="البداية الذكية"
          price="99"
          color="bg-slate-50 text-slate-600 border-slate-100"
          icon={<Rocket size={28} />}
          features={[
            "عدد منتجات غير محدود",
            "5 صفحات هبوط احترافية",
            "ربط بكسلات (فيسبوك فقط)",
            "دعم فني عبر التذاكر",
            "دومين فرعي مجاني"
          ]}
          isCurrent
        />
        <PlanCard 
          name="تاجر محترف"
          price="249"
          color="bg-indigo-50 text-indigo-600 border-indigo-100"
          icon={<Crown size={28} />}
          isPopular
          features={[
            "كل ما في خطة البداية",
            "صفحات هبوط غير محدودة",
            "ربط كافة البكسلات (CAPI)",
            "ربط دومين مخصص",
            "تحليلات متقدمة للطلبات",
            "دعم فني سريع (واتساب)"
          ]}
        />
        <PlanCard 
          name="مؤسسة نمو"
          price="599"
          color="bg-amber-50 text-amber-600 border-amber-100"
          icon={<ShieldCheck size={28} />}
          features={[
            "كل ما في خطة المحترف",
            "إدارة فرق العمل (5 مستخدمين)",
            "تكاملات API خاصة",
            "مدير حساب مخصص",
            "تقارير ضريبية ومالية",
            "أولوية في تحديثات النظام"
          ]}
        />
      </div>

      {/* Invoices Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><CreditCard size={20} /></div>
              <h2 className="text-lg font-black text-slate-800 tracking-tight">تاريخ الفواتير والمدفوعات</h2>
           </div>
           <button className="text-[11px] font-black text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 transition-all uppercase tracking-widest">تحديث وسيلة الدفع</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم الفاتورة</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">الخطة</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">المبلغ</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'INV-2024-001', plan: 'البداية الذكية', date: '01 مايو 2024', price: '99.00 ر.س', status: 'paid' },
                { id: 'INV-2024-002', plan: 'البداية الذكية', date: '01 أبريل 2024', price: '99.00 ر.س', status: 'paid' },
              ].map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 text-xs font-black text-slate-800">{inv.id}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-600">{inv.plan}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase">
                       <Calendar size={14} /> {inv.date}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-slate-800 tracking-tighter">{inv.price}</td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[10px] font-black uppercase">تم الدفع</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-100 rounded-xl transition-all shadow-sm" title="تحميل فاتورة PDF">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsContent;
