
import React, { useState } from 'react';
import { 
  Home,
  Package,
  ShoppingCart,
  Layout,
  Settings,
  Zap,
  ChevronDown,
  PlusCircle,
  List,
  Palette,
  Globe,
  Settings2,
  Cpu,
  ShoppingBag,
  Monitor,
  Grid,
  CreditCard
} from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const SidebarGroup: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean;
  isExpandable?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}> = ({ icon, label, isActive, isExpandable, onClick, children }) => {
  const [isExpanded, setIsExpanded] = useState(isActive);

  const handleMainClick = () => {
    onClick();
    if (isExpandable) setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-1">
      <button 
        onClick={handleMainClick}
        className={`
          flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-200 group border
          ${isActive 
            ? 'bg-indigo-50 border-indigo-100 text-indigo-700' 
            : 'bg-transparent border-transparent text-slate-500 hover:bg-white hover:border-slate-200 hover:text-indigo-600'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span className={`${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'} transition-colors`}>
            {icon}
          </span>
          <span className="text-sm font-semibold">{label}</span>
        </div>
        {children && (
          <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} opacity-50`} />
        )}
      </button>
      {isExpanded && children && (
        <div className="mr-9 space-y-1 border-r border-slate-200 pr-2 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

const SubItem: React.FC<{ label: string; isActive?: boolean; icon?: React.ReactNode; onClick?: () => void }> = ({ label, isActive, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-medium rounded-lg transition-all border border-transparent text-right
      ${isActive 
        ? 'text-indigo-600 bg-indigo-50/50 border-indigo-50' 
        : 'text-slate-500 hover:text-indigo-600 hover:bg-white hover:border-slate-100'}
    `}
  >
    {icon && <span className="opacity-70">{icon}</span>}
    {label}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onNavigate }) => {
  return (
    <aside className={`
      transition-all duration-300 ease-in-out border-l border-slate-200 shrink-0
      ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden pointer-events-none'}
      bg-slate-50 h-full flex flex-col px-3 py-6
    `}>
      <div className="space-y-1.5 flex-1 overflow-y-auto no-scrollbar pb-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">القائمة الرئيسية</p>
        
        <SidebarGroup 
          icon={<Home size={18} />} 
          label="الرئيسية" 
          isActive={currentView === 'dashboard'} 
          onClick={() => onNavigate('dashboard')}
        />
        
        <SidebarGroup 
          icon={<Package size={18} />} 
          label="المنتجات" 
          isActive={currentView === 'products' || currentView === 'add-product'}
          isExpandable
          onClick={() => onNavigate('products')}
        >
          <SubItem 
            label="قائمة المنتجات" 
            isActive={currentView === 'products'} 
            icon={<List size={14} />} 
            onClick={() => onNavigate('products')} 
          />
          <SubItem 
            label="إضافة منتج" 
            isActive={currentView === 'add-product'} 
            icon={<PlusCircle size={14} />} 
            onClick={() => onNavigate('add-product')} 
          />
        </SidebarGroup>

        <SidebarGroup 
          icon={<ShoppingCart size={18} />} 
          label="الطلبات" 
          isActive={currentView === 'orders' || currentView === 'add-order' || currentView === 'abandoned-orders'}
          isExpandable
          onClick={() => onNavigate('orders')}
        >
          <SubItem 
            label="قائمة الطلبات" 
            isActive={currentView === 'orders'} 
            icon={<List size={14} />} 
            onClick={() => onNavigate('orders')} 
          />
          <SubItem 
            label="الطلبيات المتروكة" 
            isActive={currentView === 'abandoned-orders'} 
            icon={<ShoppingBag size={14} />} 
            onClick={() => onNavigate('abandoned-orders')} 
          />
          <SubItem 
            label="إضافة طلب" 
            isActive={currentView === 'add-order'} 
            icon={<PlusCircle size={14} />} 
            onClick={() => onNavigate('add-order')} 
          />
        </SidebarGroup>

        <SidebarGroup 
          icon={<Globe size={18} />} 
          label="صفحات الهبوط" 
          isActive={currentView === 'landing' || currentView === 'add-landing'}
          isExpandable
          onClick={() => onNavigate('landing')}
        >
          <SubItem 
            label="صفحات الهبوط" 
            isActive={currentView === 'landing'} 
            icon={<Monitor size={14} />} 
            onClick={() => onNavigate('landing')} 
          />
          <SubItem 
            label="إضافة صفحة هبوط" 
            isActive={currentView === 'add-landing'} 
            icon={<PlusCircle size={14} />} 
            onClick={() => onNavigate('add-landing')} 
          />
        </SidebarGroup>

        <SidebarGroup 
          icon={<Grid size={18} />} 
          label="التطبيقات" 
          isActive={currentView === 'apps'}
          onClick={() => onNavigate('apps')}
        />

        <SidebarGroup 
          icon={<CreditCard size={18} />} 
          label="الاشتراكات" 
          isActive={currentView === 'subscriptions'} 
          onClick={() => onNavigate('subscriptions')}
        />

        <SidebarGroup 
          icon={<Settings size={18} />} 
          label="الاعدادات" 
          isActive={currentView === 'settings' || currentView === 'pixels'}
          isExpandable
          onClick={() => onNavigate('settings')}
        >
          <SubItem 
            label="العامة" 
            isActive={currentView === 'settings'} 
            icon={<Settings2 size={14} />} 
            onClick={() => onNavigate('settings')} 
          />
          <SubItem 
            label="البكسلات" 
            isActive={currentView === 'pixels'} 
            icon={<Cpu size={14} />} 
            onClick={() => onNavigate('pixels')} 
          />
        </SidebarGroup>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-200">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm group">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-50 rounded-lg border border-indigo-100 transition-colors group-hover:bg-indigo-600">
              <Zap size={16} className="text-indigo-600 group-hover:text-white transition-colors" fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 uppercase">خطة البداية</span>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full mb-3 overflow-hidden">
             <div className="bg-indigo-600 h-full w-2/3"></div>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed mb-3 font-medium">
             استخدمت 60% من موارد خطتك الحالية.
          </p>
          <button 
            onClick={() => onNavigate('subscriptions')}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
          >
            ترقية الخطة
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
