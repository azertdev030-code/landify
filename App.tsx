
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProductsContent, { Product } from './components/ProductsContent';
import AddProductContent from './components/AddProductContent';
import OrdersContent, { Order } from './components/OrdersContent';
import AddOrderContent from './components/AddOrderContent';
import LandingPagesContent, { LandingPage } from './components/LandingPagesContent';
import AddLandingPageContent from './components/AddLandingPageContent';
import SettingsContent from './components/SettingsContent';
import AppsContent from './components/AppsContent';
import AuthContent from './components/AuthContent';
import SubscriptionsContent from './components/SubscriptionsContent';

export type ViewType = 'dashboard' | 'products' | 'add-product' | 'orders' | 'abandoned-orders' | 'add-order' | 'landing' | 'add-landing' | 'settings' | 'pixels' | 'apps' | 'subscriptions';

const INITIAL_PRODUCTS: Product[] = [
  { 
    id: '1', name: 'ساعة ذكية برو مكس', category: 'إلكترونيات', price: '299.00', stock: 45, status: 'active',
    variants: [
      { id: 'v1', combination: ['أسود', '44mm'], price: '299.00', salePrice: '', stock: '20', isEnabled: true, sku: 'SKU-001' },
      { id: 'v2', combination: ['فضي', '44mm'], price: '299.00', salePrice: '', stock: '15', isEnabled: true, sku: 'SKU-002' }
    ]
  },
  { 
    id: '2', name: 'حقيبة ظهر جلدية', category: 'إكسسوارات', price: '150.00', stock: 12, status: 'active',
    variants: [
      { id: 'v4', combination: ['بني كلاسيك'], price: '150.00', salePrice: '', stock: '8', isEnabled: true, sku: 'SKU-003' }
    ]
  }
];

const INITIAL_ORDERS: Order[] = [
  { id: '1024', customer: 'سارة أحمد', phone: '0555555555', total: '345.00', date: '2024-05-20', status: 'completed', payment: 'paid', source: 'tiktok' },
  { id: '1025', customer: 'خالد منصور', phone: '0566666666', total: '150.00', date: '2024-05-21', status: 'processing', payment: 'paid', source: 'meta' },
];

const INITIAL_LANDING_PAGES: LandingPage[] = [
  { id: '1', name: 'حملة الساعة الذكية - رمضان', productId: '1', productName: 'ساعة ذكية برو مكس', theme: 'modern', status: 'active', views: 1240, conversions: 45, url: 'smartwatch-promo' },
  { id: '2', name: 'عرض الحقيبة الجلدية', productId: '2', productName: 'حقيبة ظهر جلدية', theme: 'minimal', status: 'draft', views: 0, conversions: 0, url: 'leather-bag-offer' },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [abandonedOrders, setAbandonedOrders] = useState<Order[]>([]);
  const [landingPages, setLandingPages] = useState<LandingPage[]>(INITIAL_LANDING_PAGES);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editingLandingPage, setEditingLandingPage] = useState<LandingPage | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleEditLandingPage = (page: LandingPage) => {
    setEditingLandingPage(page);
    setCurrentView('add-landing');
  };

  const handleDeleteLandingPage = (id: string) => {
    if (confirm('هل أنت متأكد من حذف صفحة الهبوط هذه؟')) {
      setLandingPages(landingPages.filter(p => p.id !== id));
    }
  };

  if (!isLoggedIn) {
    return <AuthContent onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 text-right" dir="rtl">
      <Navbar toggleSidebar={toggleSidebar} onLogout={() => setIsLoggedIn(false)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          currentView={currentView} 
          onNavigate={(view) => {
            if (view === 'add-product') setEditingProduct(null);
            if (view === 'add-order') setEditingOrder(null);
            if (view === 'add-landing') setEditingLandingPage(null);
            setCurrentView(view);
          }} 
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && <MainContent onUpgrade={() => setCurrentView('subscriptions')} />}
            
            {currentView === 'products' && (
              <ProductsContent 
                products={products}
                onAddClick={() => setCurrentView('add-product')} 
                onEditClick={(p) => { setEditingProduct(p); setCurrentView('add-product'); }}
                onDeleteClick={(id) => setProducts(products.filter(p => p.id !== id))}
              />
            )}
            
            {currentView === 'add-product' && (
              <AddProductContent 
                onBack={() => setCurrentView('products')} 
                initialData={editingProduct || undefined}
              />
            )}

            {currentView === 'orders' && (
              <OrdersContent 
                title="الطلبات"
                orders={orders}
                onAddClick={() => setCurrentView('add-order')}
                onEditClick={(o) => { setEditingOrder(o); setCurrentView('add-order'); }}
                onDeleteClick={(id) => setOrders(orders.filter(o => o.id !== id))}
              />
            )}

            {currentView === 'abandoned-orders' && (
              <OrdersContent 
                title="الطلبيات المتروكة"
                orders={abandonedOrders}
                onAddClick={() => setCurrentView('add-order')}
                onEditClick={(o) => { setEditingOrder(o); setCurrentView('add-order'); }}
                onDeleteClick={(id) => setAbandonedOrders(abandonedOrders.filter(o => o.id !== id))}
                isAbandoned
              />
            )}

            {currentView === 'add-order' && (
              <AddOrderContent 
                onBack={() => setCurrentView('orders')}
                initialData={editingOrder || undefined}
                availableProducts={products}
              />
            )}

            {currentView === 'landing' && (
              <LandingPagesContent 
                pages={landingPages}
                onAddClick={() => { setEditingLandingPage(null); setCurrentView('add-landing'); }}
                onEditClick={handleEditLandingPage}
                onDeleteClick={handleDeleteLandingPage}
              />
            )}

            {currentView === 'add-landing' && (
              <AddLandingPageContent 
                onBack={() => setCurrentView('landing')}
                initialData={editingLandingPage || undefined}
                products={products}
              />
            )}

            {(currentView === 'settings' || currentView === 'pixels') && (
              <SettingsContent activeTab={currentView === 'settings' ? 'general' : 'pixels'} />
            )}

            {currentView === 'apps' && (
              <AppsContent />
            )}

            {currentView === 'subscriptions' && (
              <SubscriptionsContent />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
