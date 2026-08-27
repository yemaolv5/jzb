import React, { useState } from 'react';
import {
  TabType,
  ServiceItem,
  StaffTier,
  WorkerInfo,
  UserAddress,
  CouponItem,
  OrderItem,
  OrderReview,
  CommunityGroupBuy,
} from './types';
import {
  SERVICES,
  DEFAULT_USER,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  COMMUNITY_GROUP_BUY,
  WORKERS,
  HOTLINE_NUMBER,
} from './mockData';

// Component imports
import { HomeTab } from './components/HomeTab';
import { ServiceDetailView } from './components/ServiceDetailView';
import { ServiceTierView } from './components/ServiceTierView';
import { TimeSelectView } from './components/TimeSelectView';
import { OrderConfirmView } from './components/OrderConfirmView';
import { OrdersTab } from './components/OrdersTab';
import { CouponsTab } from './components/CouponsTab';
import { ProfileTab } from './components/ProfileTab';

// Modal and Aux components
import { CallModal } from './components/CallModal';
import { WorkerDetailModal } from './components/WorkerDetailModal';
import { ReviewModal } from './components/ReviewModal';
import { GroupBuyShareModal } from './components/GroupBuyShareModal';
import { XiaoYaoShiSimulator } from './components/XiaoYaoShiSimulator';
import { SupplierPortalModal } from './components/SupplierPortalModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { SwitchCommunityModal } from './components/SwitchCommunityModal';
import { VoiceAssistantBanner } from './components/VoiceAssistantBanner';

import {
  Home,
  ClipboardList,
  Ticket,
  User,
  Phone,
  Sparkles,
  Smartphone,
  RotateCcw,
  CheckCircle2,
  Key,
  Truck,
  LayoutDashboard,
} from 'lucide-react';

export default function App() {
  // Navigation & View Flow States
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentFlowStep, setCurrentFlowStep] = useState<
    'tab' | 'service_detail' | 'service_tier' | 'time_select' | 'order_confirm'
  >('tab');

  // Booking Draft Flow State
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [draftQuantity, setDraftQuantity] = useState<number>(100);
  const [selectedTier, setSelectedTier] = useState<StaffTier>('skilled');
  const [selectedWorker, setSelectedWorker] = useState<WorkerInfo | null>(WORKERS[0]);
  const [selectedTimeStr, setSelectedTimeStr] = useState<string>('明天上午 (09:00 - 11:30)');
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(INITIAL_COUPONS[0]);

  // App Master Data States
  const [currentCommunity, setCurrentCommunity] = useState<string>('东达景苑');
  const [userAddress, setUserAddress] = useState<UserAddress>(DEFAULT_USER);
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [groupBuy, setGroupBuy] = useState<CommunityGroupBuy>(COMMUNITY_GROUP_BUY);

  // Elder Assistance Controls
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Modals
  const [isCallModalOpen, setIsCallModalOpen] = useState<boolean>(false);
  const [callTargetInfo, setCallTargetInfo] = useState<{
    name: string;
    role: string;
    phone: string;
  }>({
    name: '小钥匙物业官方客服',
    role: '社区24小时人工协助',
    phone: HOTLINE_NUMBER,
  });

  const [activeWorkerForDetail, setActiveWorkerForDetail] = useState<WorkerInfo | null>(null);
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState<boolean>(false);

  const [orderForReview, setOrderForReview] = useState<OrderItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const [isGroupBuyModalOpen, setIsGroupBuyModalOpen] = useState<boolean>(false);
  const [isXiaoYaoShiOpen, setIsXiaoYaoShiOpen] = useState<boolean>(false);
  const [isSupplierPortalOpen, setIsSupplierPortalOpen] = useState<boolean>(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);
  const [isSwitchCommunityOpen, setIsSwitchCommunityOpen] = useState<boolean>(false);

  // Toast Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Actions
  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setDraftQuantity(service.defaultQuantity || (service.calculationType === 'area' ? userAddress.area : 1));
    // Auto find suitable coupon
    const matchCoupon = coupons.find(
      (c) =>
        c.status === 'available' &&
        (c.applicableCategory === service.category || c.applicableCategory === 'all')
    );
    setSelectedCoupon(matchCoupon || null);
    setCurrentFlowStep('service_detail');
  };

  const handleUseRenewalCoupon = () => {
    const renewalCp = coupons.find((c) => c.id === 'coupon_renewal_100' && c.status === 'available');
    setSelectedService(SERVICES[0]); // 擦玻璃
    setDraftQuantity(userAddress.area || 100);
    setSelectedCoupon(renewalCp || null);
    setCurrentFlowStep('service_detail');
  };

  const handleCreateOrder = (newOrderData: Partial<OrderItem>) => {
    const newOrderId = `order_${Date.now().toString().slice(-4)}`;
    const newOrderNumber = `JZ${new Date().getFullYear()}${Math.floor(100000 + Math.random() * 900000)}`;

    const fullOrder: OrderItem = {
      id: newOrderId,
      orderNumber: newOrderNumber,
      serviceId: selectedService.id,
      serviceName: newOrderData.serviceName || selectedService.name,
      category: selectedService.category,
      tier: selectedTier,
      tierTitle: newOrderData.tierTitle || '熟练服务',
      address: userAddress,
      quantity: draftQuantity,
      unit: selectedService.unit,
      scheduledTime: selectedTimeStr,
      originalPrice: newOrderData.originalPrice || 150,
      discountAmount: newOrderData.discountAmount || 0,
      appliedCouponId: selectedCoupon?.id,
      finalPrice: newOrderData.finalPrice || 50,
      status: 'pending_arrival',
      worker: selectedWorker || WORKERS[0],
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      payMethod: newOrderData.payMethod || 'wechat',
    };

    // Mark used coupon
    if (selectedCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === selectedCoupon.id ? { ...c, status: 'used' } : c))
      );
    }

    setOrders((prev) => [fullOrder, ...prev]);
    setCurrentFlowStep('tab');
    setActiveTab('orders');
    showToast('🎉 预约并支付成功！服务人员将准时上门');
  };

  const handleSubmitReview = (orderId: string, review: OrderReview) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              hasReviewed: true,
              reviewData: review,
            }
          : o
      )
    );
    showToast('❤️ 感谢您的评价！东达景苑物业已记录您的反馈');
  };

  const handleSupplierUpdateStatus = (orderId: string, status: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`订单状态已更新为：${status === 'in_service' ? '服务中' : '已完成'}`);
  };

  const handleXiaoYaoShiJump = (userData: {
    address: UserAddress;
    couponAmount: number;
    couponTitle: string;
  }) => {
    setUserAddress(userData.address);
    setCurrentCommunity(userData.address.community);
    
    // Auto jump to 擦玻璃 with 100元 coupon
    const renewalCp = coupons.find((c) => c.id === 'coupon_renewal_100');
    setSelectedService(SERVICES[0]);
    setDraftQuantity(userData.address.area);
    setSelectedCoupon(renewalCp || null);
    setCurrentFlowStep('service_detail');
    showToast(`🔑 已从小钥匙无感带入：${userData.address.community} ${userData.address.building}${userData.address.unit}${userData.address.room} (${userData.address.area}㎡)`);
  };

  const handleCall = (name: string, role: string, phone: string) => {
    setCallTargetInfo({ name, role, phone });
    setIsCallModalOpen(true);
  };

  const handleResetData = () => {
    setUserAddress(DEFAULT_USER);
    setCurrentCommunity('东达景苑');
    setCoupons(INITIAL_COUPONS);
    setOrders(INITIAL_ORDERS);
    setSelectedCoupon(INITIAL_COUPONS[0]);
    setCurrentFlowStep('tab');
    setActiveTab('home');
    showToast('已重置原型初始数据');
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 select-none">
      
      {/* Prototype Reviewer Master Top Bar */}
      <header className="w-full max-w-5xl mb-3 px-4 py-2 bg-stone-800/90 rounded-2xl border border-stone-700/80 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <strong className="text-sm font-bold text-white tracking-tight">
            为您服务家政帮 (MVP原型系统)
          </strong>
          <span className="bg-orange-600 text-white font-bold px-2 py-0.5 rounded-md text-[10px]">
            老年友好 · 物业权益闭环
          </span>
        </div>

        {/* Prototype Quick Action Switchers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="demo-xiaoyaoshi-btn"
            onClick={() => setIsXiaoYaoShiOpen(true)}
            className="px-2.5 py-1.5 bg-blue-700 hover:bg-blue-600 active:scale-95 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
            title="模拟业主在小钥匙交物业费后一键带入家政帮"
          >
            <Key className="w-3.5 h-3.5 text-amber-300" />
            <span>小钥匙无感跳转演示</span>
          </button>

          <button
            id="demo-supplier-btn"
            onClick={() => setIsSupplierPortalOpen(true)}
            className="px-2.5 py-1.5 bg-stone-700 hover:bg-stone-600 active:scale-95 text-stone-200 font-bold rounded-xl flex items-center gap-1.5 transition-all border border-stone-600"
            title="模拟家政供应商主管及师傅接单核销工作台"
          >
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>供应商履约端</span>
          </button>

          <button
            id="demo-admin-btn"
            onClick={() => setIsAdminPortalOpen(true)}
            className="px-2.5 py-1.5 bg-stone-700 hover:bg-stone-600 active:scale-95 text-stone-200 font-bold rounded-xl flex items-center gap-1.5 transition-all border border-stone-600"
            title="查看平台运营与物业补贴核销池"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
            <span>运营中台</span>
          </button>

          <button
            id="toggle-frame-btn"
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="px-2.5 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-xl flex items-center gap-1 border border-stone-600 hidden sm:flex"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isPhoneFrame ? '全屏查看' : '手机视口'}</span>
          </button>

          <button
            id="reset-prototype-btn"
            onClick={handleResetData}
            className="p-1.5 bg-stone-700 hover:bg-stone-600 text-stone-400 hover:text-white rounded-xl border border-stone-600"
            title="重置初始数据"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Mini-Program Viewport Frame */}
      <main
        className={`w-full bg-stone-50 text-stone-900 overflow-hidden flex flex-col relative transition-all duration-300 ${
          isPhoneFrame
            ? 'max-w-md min-h-[780px] max-h-[92vh] sm:rounded-[36px] sm:shadow-2xl sm:border-[6px] sm:border-stone-800'
            : 'max-w-xl min-h-[90vh] rounded-3xl shadow-xl'
        }`}
      >
        
        {/* WeChat Mini-Program Native Header Simulation */}
        <div className="bg-stone-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-stone-800 text-xs shrink-0 select-none">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-orange-500 font-extrabold text-sm">为您服务</span>
            <span className="text-white text-sm">家政帮</span>
          </div>

          {/* WeChat Capsule Buttons (··· ⭕) */}
          <div className="flex items-center bg-stone-800/90 rounded-full px-2.5 py-1 border border-stone-700/80 gap-3 text-stone-300">
            <button
              onClick={() => setIsGroupBuyModalOpen(true)}
              className="hover:text-white flex items-center gap-0.5 text-[11px]"
              title="分享小程序"
            >
              <span>●●●</span>
            </button>
            <span className="text-stone-600">|</span>
            <button
              onClick={() => {
                setCurrentFlowStep('tab');
                setActiveTab('home');
              }}
              className="hover:text-white"
              title="返回首页"
            >
              <div className="w-3 h-3 rounded-full border border-stone-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Elderly Voice & Large Font Assistant Banner */}
        <VoiceAssistantBanner
          isLargeFont={isLargeFont}
          onToggleLargeFont={() => setIsLargeFont(!isLargeFont)}
          currentText={
            currentFlowStep === 'service_detail'
              ? `您正在预约${selectedService.name}。房屋面积为${draftQuantity}平方米，原价为${selectedService.basePriceCalculation(draftQuantity)}元，家庭焕新权益直减${selectedCoupon ? selectedCoupon.amount : 0}元，您实际只需支付${Math.max(0, selectedService.basePriceCalculation(draftQuantity) - (selectedCoupon ? selectedCoupon.amount : 0))}元。`
              : '为您服务家政帮。放心找服务，就在咱小区。您有100元物业家庭焕新优惠券，擦玻璃实付仅需50元。如有疑问可随时点击电话联系客服。'
          }
        />

        {/* Scrollable Main Content Container */}
        <div className="flex-1 overflow-y-auto relative bg-stone-50">
          
          {/* Toast Notice */}
          {toastMessage && (
            <div className="sticky top-2 z-50 px-4 animate-in slide-in-from-top duration-300">
              <div className="bg-stone-900/95 backdrop-blur-md text-white text-sm font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-stone-700 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{toastMessage}</span>
              </div>
            </div>
          )}

          {/* ROUTING LOGIC */}
          {currentFlowStep === 'tab' && (
            <>
              {activeTab === 'home' && (
                <HomeTab
                  currentCommunity={currentCommunity}
                  userAddress={userAddress}
                  services={SERVICES}
                  renewalCoupon={coupons.find((c) => c.id === 'coupon_renewal_100')}
                  groupBuy={groupBuy}
                  isLargeFont={isLargeFont}
                  onSelectService={handleSelectService}
                  onUseRenewalCoupon={handleUseRenewalCoupon}
                  onOpenSwitchCommunity={() => setIsSwitchCommunityOpen(true)}
                  onOpenGroupBuy={() => setIsGroupBuyModalOpen(true)}
                  onCallHelp={() =>
                    handleCall('小钥匙物业官方客服', '社区24小时人工协助', HOTLINE_NUMBER)
                  }
                />
              )}

              {activeTab === 'orders' && (
                <OrdersTab
                  orders={orders}
                  isLargeFont={isLargeFont}
                  onCallWorker={(worker, order) =>
                    handleCall(worker.name, `服务技师 (${order.serviceName})`, worker.phone)
                  }
                  onCallHelp={() =>
                    handleCall('小钥匙物业官方客服', '售后协调与工单协助', HOTLINE_NUMBER)
                  }
                  onOpenReview={(order) => {
                    setOrderForReview(order);
                    setIsReviewModalOpen(true);
                  }}
                  onOpenWorkerDetail={(worker) => {
                    setActiveWorkerForDetail(worker);
                    setIsWorkerModalOpen(true);
                  }}
                  onReOrder={(order) => {
                    const matchSvc = SERVICES.find((s) => s.id === order.serviceId) || SERVICES[0];
                    handleSelectService(matchSvc);
                  }}
                />
              )}

              {activeTab === 'coupons' && (
                <CouponsTab
                  coupons={coupons}
                  isLargeFont={isLargeFont}
                  onUseCoupon={(cp) => {
                    if (cp.applicableCategory === 'window') {
                      handleUseRenewalCoupon();
                    } else if (cp.applicableCategory === 'appliance') {
                      handleSelectService(SERVICES[2]); // 洗油烟机
                    } else {
                      handleSelectService(SERVICES[1]); // 家庭保洁
                    }
                  }}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileTab
                  userAddress={userAddress}
                  orderCount={orders.length}
                  couponCount={coupons.filter((c) => c.status === 'available').length}
                  isLargeFont={isLargeFont}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onCallHelp={() =>
                    handleCall('小钥匙物业官方客服', '24小时人工服务', HOTLINE_NUMBER)
                  }
                  onOpenXiaoYaoShiSim={() => setIsXiaoYaoShiOpen(true)}
                  onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
                  onOpenSupplierPortal={() => setIsSupplierPortalOpen(true)}
                />
              )}
            </>
          )}

          {/* Flow Step 1: Service Detail Page */}
          {currentFlowStep === 'service_detail' && (
            <ServiceDetailView
              service={selectedService}
              userAddress={userAddress}
              availableCoupons={coupons.filter((c) => c.status === 'available')}
              selectedCoupon={selectedCoupon}
              isLargeFont={isLargeFont}
              onBack={() => setCurrentFlowStep('tab')}
              onSelectCoupon={(cp) => setSelectedCoupon(cp)}
              onProceedToTier={(qty) => {
                setDraftQuantity(qty);
                setCurrentFlowStep('service_tier');
              }}
              onCallHelp={() =>
                handleCall('小钥匙物业官方客服', '预约咨询与协助', HOTLINE_NUMBER)
              }
            />
          )}

          {/* Flow Step 2: Service Tier Selection Page */}
          {currentFlowStep === 'service_tier' && (
            <ServiceTierView
              service={selectedService}
              selectedTier={selectedTier}
              selectedWorker={selectedWorker}
              isLargeFont={isLargeFont}
              onBack={() => setCurrentFlowStep('service_detail')}
              onSelectTier={(tier) => setSelectedTier(tier)}
              onOpenWorkerDetail={(worker) => {
                setActiveWorkerForDetail(worker);
                setIsWorkerModalOpen(true);
              }}
              onProceedToTime={() => setCurrentFlowStep('time_select')}
              onCallHelp={() =>
                handleCall('小钥匙物业官方客服', '服务等级与技师咨询', HOTLINE_NUMBER)
              }
            />
          )}

          {/* Flow Step 3: Time Selection Page */}
          {currentFlowStep === 'time_select' && (
            <TimeSelectView
              selectedTime={selectedTimeStr}
              isLargeFont={isLargeFont}
              onBack={() => setCurrentFlowStep('service_tier')}
              onSelectTime={(str) => setSelectedTimeStr(str)}
              onProceedToConfirm={() => setCurrentFlowStep('order_confirm')}
              onCallHelp={() =>
                handleCall('小钥匙物业官方客服', '预约时间人工排班', HOTLINE_NUMBER)
              }
            />
          )}

          {/* Flow Step 4: Order Confirm & Pay Page */}
          {currentFlowStep === 'order_confirm' && (
            <OrderConfirmView
              service={selectedService}
              quantity={draftQuantity}
              tier={selectedTier}
              worker={selectedWorker}
              timeStr={selectedTimeStr}
              userAddress={userAddress}
              coupon={selectedCoupon}
              isLargeFont={isLargeFont}
              onBack={() => setCurrentFlowStep('time_select')}
              onConfirmOrder={handleCreateOrder}
              onCallHelp={() =>
                handleCall('小钥匙物业官方客服', '支付协助与现金登记', HOTLINE_NUMBER)
              }
            />
          )}

        </div>

        {/* Bottom Tab Navigation Bar (Only visible on main tab screens) */}
        {currentFlowStep === 'tab' && (
          <nav
            id="bottom-tab-bar"
            className="sticky bottom-0 z-40 bg-white border-t border-stone-200 px-2 py-2 flex items-center justify-around shadow-lg shrink-0"
          >
            {/* 1. 首页 */}
            <button
              id="tab-btn-home"
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all ${
                activeTab === 'home'
                  ? 'text-orange-600 font-extrabold scale-105'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Home className={`w-6 h-6 mb-0.5 ${activeTab === 'home' ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs ${isLargeFont ? 'text-sm font-bold' : ''}`}>首页</span>
            </button>

            {/* 2. 我的订单 */}
            <button
              id="tab-btn-orders"
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all relative ${
                activeTab === 'orders'
                  ? 'text-orange-600 font-extrabold scale-105'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <ClipboardList className={`w-6 h-6 mb-0.5 ${activeTab === 'orders' ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs ${isLargeFont ? 'text-sm font-bold' : ''}`}>我的订单</span>
              {orders.filter((o) => o.status === 'pending_arrival').length > 0 && (
                <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white" />
              )}
            </button>

            {/* 3. 优惠权益 */}
            <button
              id="tab-btn-coupons"
              onClick={() => setActiveTab('coupons')}
              className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all relative ${
                activeTab === 'coupons'
                  ? 'text-orange-600 font-extrabold scale-105'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Ticket className={`w-6 h-6 mb-0.5 ${activeTab === 'coupons' ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs ${isLargeFont ? 'text-sm font-bold' : ''}`}>优惠权益</span>
              {coupons.filter((c) => c.status === 'available').length > 0 && (
                <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </button>

            {/* 4. 我的 */}
            <button
              id="tab-btn-profile"
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all ${
                activeTab === 'profile'
                  ? 'text-orange-600 font-extrabold scale-105'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <User className={`w-6 h-6 mb-0.5 ${activeTab === 'profile' ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs ${isLargeFont ? 'text-sm font-bold' : ''}`}>我的</span>
            </button>
          </nav>
        )}

      </main>

      {/* MODAL DIALOGS */}
      {/* 1. Call Hotline Simulation Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        targetName={callTargetInfo.name}
        targetRole={callTargetInfo.role}
        phoneNumber={callTargetInfo.phone}
      />

      {/* 2. Worker Detail & Trust Credentials Modal */}
      <WorkerDetailModal
        worker={activeWorkerForDetail}
        isOpen={isWorkerModalOpen}
        onClose={() => setIsWorkerModalOpen(false)}
        onSelectWorker={(worker) => {
          setSelectedWorker(worker);
          showToast(`已指定技师：${worker.name}`);
        }}
        onCallWorker={(worker) => {
          setIsWorkerModalOpen(false);
          handleCall(worker.name, '服务技师', worker.phone);
        }}
      />

      {/* 3. Review Modal */}
      <ReviewModal
        order={orderForReview}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
        onCallHelp={() => {
          setIsReviewModalOpen(false);
          handleCall('小钥匙售后专线', '物业平台售后协调与纠纷直通', HOTLINE_NUMBER);
        }}
      />

      {/* 4. Community Group Buy & Share Card Modal */}
      <GroupBuyShareModal
        groupBuy={groupBuy}
        isOpen={isGroupBuyModalOpen}
        onClose={() => setIsGroupBuyModalOpen(false)}
        onJoinGroupBuy={() => {
          setGroupBuy((prev) => ({
            ...prev,
            joinedHouseholds: prev.joinedHouseholds + 1,
          }));
          handleUseRenewalCoupon();
          showToast('🎉 已加入东达景苑擦玻璃拼团！');
        }}
      />

      {/* 5. Xiao Yao Shi Seamless Jump Simulator */}
      <XiaoYaoShiSimulator
        isOpen={isXiaoYaoShiOpen}
        onClose={() => setIsXiaoYaoShiOpen(false)}
        onJumpToHousekeeping={handleXiaoYaoShiJump}
      />

      {/* 6. Supplier Fulfillment Portal Modal */}
      <SupplierPortalModal
        isOpen={isSupplierPortalOpen}
        onClose={() => setIsSupplierPortalOpen(false)}
        orders={orders}
        workers={WORKERS}
        onUpdateOrderStatus={handleSupplierUpdateStatus}
      />

      {/* 7. Platform Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        orders={orders}
        coupons={coupons}
        services={SERVICES}
      />

      {/* 8. Switch Community Modal */}
      <SwitchCommunityModal
        isOpen={isSwitchCommunityOpen}
        onClose={() => setIsSwitchCommunityOpen(false)}
        currentCommunity={currentCommunity}
        onSelectCommunity={(name) => {
          setCurrentCommunity(name);
          setUserAddress((prev) => ({ ...prev, community: name }));
          setGroupBuy((prev) => ({ ...prev, communityName: name }));
          showToast(`已切换至：${name}`);
        }}
      />

    </div>
  );
}
