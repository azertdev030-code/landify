
import React from 'react';
import { 
  Menu, 
  Bell, 
  Search, 
  Settings, 
  ChevronDown,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, onLogout }) => {
  return (
    <nav className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 sticky top-0 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-50 rounded-lg transition-all duration-200 text-slate-500 active:scale-95 border border-transparent hover:border-slate-100"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">لوحتي</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative group">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="ابحث عن المنتجات، الطلبات، العملاء..." 
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500/50 focus:bg-white rounded-lg py-1.5 pr-10 pl-4 transition-all text-xs outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
          <HelpCircle size={18} />
          <span className="text-xs font-semibold hidden md:block text-slate-600">مركز المساعدة</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>

        <button className="p-2 hover:bg-slate-50 rounded-lg relative text-slate-500 transition-all hover:text-indigo-600 border border-transparent hover:border-slate-100">
          <Bell size={18} />
          <span className="absolute top-2.5 left-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
        </button>

        <div className="relative group mr-2">
          <button className="flex items-center gap-3 p-1 hover:bg-slate-50 rounded-lg transition-all border border-transparent hover:border-slate-100">
            <div className="hidden text-right sm:block px-1">
              <p className="text-[11px] font-bold text-slate-800 leading-none">أحمد محمد</p>
              <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">مسؤول النظام</p>
            </div>
            <div className="w-8 h-8 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
          </button>
          
          <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
             <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Settings size={16} /> إعدادات الحساب
             </button>
             <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
             <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
             >
                <LogOut size={16} /> تسجيل الخروج
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
