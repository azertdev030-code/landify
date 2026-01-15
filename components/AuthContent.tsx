
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Facebook,
  User,
  CheckCircle2
} from 'lucide-react';

interface AuthContentProps {
  onLogin: () => void;
}

const AuthContent: React.FC<AuthContentProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 pr-12 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-bold shadow-sm";

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      {/* Branding Side - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-4 mb-12 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                <span className="text-white font-black text-2xl">D</span>
             </div>
             <h1 className="text-4xl font-black text-white tracking-tight">لوحتي <span className="text-indigo-400">Dash</span></h1>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white leading-tight animate-in fade-in slide-in-from-right-8 delay-150 duration-700">أطلق متجرك الإلكتروني بأدوات ذكية واحترافية.</h2>
            
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 delay-300 duration-700">
              {[
                { icon: <Zap className="text-indigo-400" />, title: "سرعة في الإطلاق", desc: "أنشئ صفحات هبوط ومنتجات في دقائق معدودة." },
                { icon: <ShieldCheck className="text-emerald-400" />, title: "حماية وتتبع متقدم", desc: "بكسلات تتبع مدمجة وأنظمة حماية للبيانات." },
                { icon: <Globe className="text-blue-400" />, title: "تكامل شامل", desc: "ربط مباشر مع شركات الشحن، بوابات الدفع، والتطبيقات." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <p className="text-slate-400 text-sm font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-white/10 flex items-center gap-6 animate-in fade-in slide-in-from-bottom-8 delay-500 duration-700">
            <div className="flex -space-x-3 space-x-reverse">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" alt="user" />
              ))}
            </div>
            <p className="text-slate-400 text-sm font-bold">انضم لـ <span className="text-white">5,000+</span> تاجر ناجح اليوم.</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <span className="text-white font-black text-xl">D</span>
               </div>
               <h1 className="text-2xl font-black text-slate-900">لوحتي</h1>
            </div>
            <h2 className="text-3xl font-black text-slate-900">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
            <p className="text-slate-500 font-bold text-sm mt-3">
              {mode === 'login' ? 'أهلاً بك مجدداً! أدخل بياناتك للمتابعة.' : 'ابدأ رحلتك في عالم التجارة الإلكترونية اليوم.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" placeholder="مثال: أحمد محمد" className={inputClasses} required />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" placeholder="name@company.com" className={inputClasses} required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mr-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">كلمة المرور</label>
                {mode === 'login' && <button type="button" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest transition-colors">نسيت كلمة المرور؟</button>}
              </div>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className={inputClasses} 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'دخول للمنصة' : 'إنشاء حسابي'}
                  {mode === 'login' ? <ArrowLeft size={18} /> : <ArrowLeft size={18} />}
                </>
              )}
            </button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-slate-200"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">أو عبر</span>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-xs font-bold text-slate-600">
               <Facebook className="text-blue-600" size={18} fill="currentColor" /> فيسبوك
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-xs font-bold text-slate-600">
               <Globe className="text-slate-900" size={18} /> جوجل
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-indigo-600 mr-2 hover:underline decoration-2 underline-offset-4"
              >
                {mode === 'login' ? 'سجل الآن مجاناً' : 'سجل دخولك'}
              </button>
            </p>
          </div>
        </div>
        
        <p className="absolute bottom-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          بشرائك أو اشتراكك فأنت توافق على <span className="text-slate-800">شروط الاستخدام</span> و <span className="text-slate-800">سياسة الخصوصية</span>.
        </p>
      </div>
    </div>
  );
};

export default AuthContent;
