
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronDown,
  Image as ImageIcon,
  Layers,
  Box,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export interface Variant {
  id: string;
  combination: string[];
  price: string;
  salePrice: string;
  stock: string;
  isEnabled: boolean;
  sku: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock';
  variants: Variant[];
  image?: string;
}

const StatusBadge: React.FC<{ status: Product['status'] }> = ({ status }) => {
  const configs = {
    active: { text: 'نشط', classes: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    draft: { text: 'مسودة', classes: 'bg-slate-50 text-slate-500 border-slate-200' },
    out_of_stock: { text: 'نفذت الكمية', classes: 'bg-rose-50 text-rose-600 border-rose-100' },
  };
  const config = configs[status];
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${config.classes}`}>
      {config.text}
    </span>
  );
};

interface ProductsContentProps {
  products: Product[];
  onAddClick: () => void;
  onEditClick: (product: Product) => void;
  onDeleteClick: (id: string) => void;
}

const ProductsContent: React.FC<ProductsContentProps> = ({ products, onAddClick, onEditClick, onDeleteClick }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedRows(newExpanded);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">المنتجات</h1>
          <p className="text-slate-500 font-medium text-sm mt-0.5">إدارة وتعديل قائمة منتجات متجرك والتحكم في المتغيرات.</p>
        </div>
        <button 
          onClick={onAddClick}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2 w-fit"
        >
          <Plus size={18} />
          إضافة منتج جديد
        </button>
      </header>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80 group">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="البحث باسم المنتج أو الكود..." 
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500/50 focus:bg-white rounded-lg py-2 pr-10 pl-4 transition-all text-xs outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={14} />
            تصفية
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-4 w-10"></th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">المنتج</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">التصنيف</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">المتغيرات</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">السعر</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">المخزون</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <React.Fragment key={product.id}>
                  <tr className={`hover:bg-slate-50/30 transition-colors group ${expandedRows.has(product.id) ? 'bg-indigo-50/10' : ''}`}>
                    <td className="px-4 py-4 text-center">
                      {product.variants.length > 0 && (
                        <button 
                          onClick={() => toggleExpand(product.id)}
                          className={`p-1 rounded-md transition-all ${expandedRows.has(product.id) ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100 text-slate-400'}`}
                        >
                          <ChevronDown size={14} className={`transition-transform duration-200 ${expandedRows.has(product.id) ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-300 overflow-hidden shrink-0">
                          {product.image ? <img src={product.image} className="w-full h-full object-cover" /> : <ImageIcon size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-indigo-600 transition-colors">{product.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-600">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-500">
                          <Layers size={12} />
                          <span className="text-[11px] font-bold">{product.variants.length}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{product.price} ر.س</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-700">{product.stock} قطعة</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => onEditClick(product)}
                          className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors border border-transparent hover:border-indigo-100" 
                          title="تعديل المنتج والمتغيرات"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => onDeleteClick(product.id)}
                          className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors border border-transparent hover:border-rose-100" 
                          title="حذف"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {expandedRows.has(product.id) && product.variants.length > 0 && (
                    <tr className="bg-slate-50/50 border-b border-slate-100 animate-in slide-in-from-top-1 duration-200">
                      <td colSpan={8} className="px-12 py-4">
                        <div className="space-y-2 border-r-2 border-indigo-200 pr-4">
                          <p className="text-[10px] font-bold text-indigo-600 uppercase mb-3">متغيرات المنتج المتاحة</p>
                          {product.variants.map((v) => (
                            <div key={v.id} className="flex items-center justify-between py-2 px-4 bg-white border border-slate-100 rounded-lg group/variant">
                              <div className="flex items-center gap-3">
                                <Box size={14} className="text-slate-400" />
                                <div className="flex flex-wrap gap-1">
                                  {v.combination.map((c, idx) => (
                                    <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{c}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">SKU: {v.sku}</span>
                                <span className="text-xs font-semibold text-slate-500">المخزون: <span className="text-slate-800">{v.stock}</span></span>
                                <span className="text-xs font-bold text-indigo-600">{v.price} ر.س</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Box size={48} strokeWidth={1} />
                      <p className="text-sm font-bold">لا توجد منتجات حالياً</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">عرض {products.length} من أصل {products.length} منتج</p>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400"><ChevronRight size={16} /></button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-[11px] font-bold">1</button>
            <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400"><ChevronLeft size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsContent;
