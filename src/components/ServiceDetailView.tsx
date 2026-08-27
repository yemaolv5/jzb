import React, { useState } from 'react';
import { ServiceItem, UserAddress, CouponItem } from '../types';
import { ArrowLeft, Building2, CheckCircle2, ShieldCheck, Ticket, Sparkles, Phone, ArrowRight, Minus, Plus, HelpCircle } from 'lucide-react';

interface ServiceDetailViewProps {
  service: ServiceItem;
  userAddress: UserAddress;
  availableCoupons: CouponItem[];
  selectedCoupon: CouponItem | null;
  isLargeFont: boolean;
  onBack: () => void;
  onSelectCoupon: (coupon: CouponItem | null) => void;
  onProceedToTier: (quantity: number, customArea: number) => void;
  onCallHelp: () => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  userAddress,
  availableCoupons,
  selectedCoupon,
  isLargeFont,
  onBack,
  onSelectCoupon,
  onProceedToTier,
  onCallHelp,
}) => {
  const [quantity, setQuantity] = useState<number>(
    service.calculationType === 'area'
      ? userAddress.area || 100
      : service.defaultQuantity || 1
  );

  // Price math
  const originalPrice = service.basePriceCalculation(quantity);
  const discount = selectedCoupon && selectedCoupon.status === 'available' ? selectedCoupon.amount : 0;
  const finalPrice = Math.max(0, originalPrice - discount);

  const handleAdjustQuantity = (delta: number) => {
    const step = service.calculationType === 'area' ? 10 : 1;
    const min = service.calculationType === 'area' ? 40 : (service.minQuantity || 1);
    const max = service.calculationType === 'area' ? 300 : 20;
    const newVal = Math.max(min, Math.min(max, quantity + delta * step));
    setQuantity(newVal);
  };

  return (
    <div id="page-service-detail" className="min-h-full bg-stone-50 text-stone-800 flex flex-col animate-in fade-in pb-24">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3.5 flex items-center justify-between">
        <button
          id="detail-back-btn"
          onClick={onBack}
          className="flex items-center gap-1 text-stone-700 hover:text-orange-600 font-bold p-1 rounded-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-base">返回</span>
        </button>
        <h2 className="font-bold text-lg text-stone-900 truncate max-w-[200px]">
          {service.name}
        </h2>
        <button
          id="detail-call-btn"
          onClick={onCallHelp}
          className="text-orange-600 hover:text-orange-700 font-bold text-xs flex items-center gap-1 bg-orange-50 px-2.5 py-1.5 rounded-full border border-orange-200"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>人工协助</span>
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* 1. Service Title Card */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-3xl p-5 shadow-sm">
          <div className="inline-block bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2">
            {service.tag || '家庭焕新推荐'}
          </div>
          <h1 id="service-detail-name" className={`font-black text-white ${isLargeFont ? 'text-3xl' : 'text-2xl'}`}>
            {service.name === '擦玻璃' ? '家庭焕新·擦玻璃' : service.name}
          </h1>
          <p id="service-detail-subtitle" className={`text-orange-100 font-medium mt-1.5 ${isLargeFont ? 'text-base' : 'text-sm'}`}>
            {service.subtitle}
          </p>
        </div>

        {/* 2. House Information (房屋信息 - Auto-filled from Xiao Yao Shi) */}
        <div className="bg-white rounded-3xl p-4.5 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-600" />
              <h3 className={`font-bold text-stone-900 ${isLargeFont ? 'text-xl' : 'text-lg'}`}>
                服务房屋与面积
              </h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              小钥匙已自动带入
            </span>
          </div>

          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80">
            <div className="text-base font-bold text-stone-900">
              {userAddress.community} {userAddress.building}{userAddress.unit}{userAddress.room}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              联系人：{userAddress.contactName} ({userAddress.phone})
            </div>
          </div>

          {/* Area or Quantity Selector */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-stone-700">
              {service.calculationType === 'area' ? '建筑面积 (㎡)' : `预约数量 (${service.unit})`}
            </span>

            <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
              <button
                id="quantity-minus-btn"
                onClick={() => handleAdjustQuantity(-1)}
                className="w-9 h-9 rounded-xl bg-white text-stone-800 font-black shadow-xs flex items-center justify-center hover:bg-stone-50 active:scale-95 text-lg"
                aria-label="减少面积"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono font-black text-xl text-stone-900 min-w-[50px] text-center">
                {quantity}
              </span>
              <button
                id="quantity-plus-btn"
                onClick={() => handleAdjustQuantity(1)}
                className="w-9 h-9 rounded-xl bg-white text-stone-800 font-black shadow-xs flex items-center justify-center hover:bg-stone-50 active:scale-95 text-lg"
                aria-label="增加面积"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          {service.calculationType === 'area' && (
            <p className="text-[11px] text-stone-400 text-right">
              按房产证建筑面积计价（免拆窗免测量，透明省心）
            </p>
          )}
        </div>

        {/* 3. Price Calculation (价格计算 - Clear Math with Large Highlight) */}
        <div className="bg-white rounded-3xl p-5 border-2 border-orange-200 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className={`font-bold text-stone-900 ${isLargeFont ? 'text-xl' : 'text-lg'}`}>
              价格计算与明细
            </h3>
            <span className="text-xs text-stone-500 font-mono">
              指导价：￥{service.pricePerUnit}/{service.unit}
            </span>
          </div>

          <div className="space-y-2 text-stone-700 text-sm">
            <div className="flex justify-between items-center">
              <span>服务市场价 ({quantity}{service.unit} × ￥{service.pricePerUnit})</span>
              <span className="font-bold font-mono text-base">￥{originalPrice}</span>
            </div>

            {/* Benefit Coupon Row */}
            <div className="flex justify-between items-center py-2 bg-orange-50/80 px-3 rounded-xl border border-orange-200/70">
              <div className="flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-950 text-sm">
                  {selectedCoupon ? selectedCoupon.title : '家庭焕新权益'}
                </span>
              </div>
              <span className="font-extrabold font-mono text-orange-600 text-lg">
                -{discount}元
              </span>
            </div>
          </div>

          {/* Big Highlight: You only pay */}
          <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between">
            <span className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
              您只需支付：
            </span>
            <div className="flex items-baseline gap-1 text-orange-600">
              <span className="text-xl font-bold">￥</span>
              <span id="final-price-large-display" className={`font-black font-mono tracking-tight ${isLargeFont ? 'text-4xl' : 'text-3xl'}`}>
                {finalPrice}
              </span>
              <span className="text-xs text-stone-400 font-normal">元</span>
            </div>
          </div>
        </div>

        {/* 4. Service Content (服务内容) */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs">
          <h3 className={`font-bold text-stone-900 mb-3 ${isLargeFont ? 'text-xl' : 'text-lg'}`}>
            服务内容
          </h3>
          <div className="space-y-2.5">
            {service.serviceItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-stone-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className={`leading-relaxed ${isLargeFont ? 'text-base font-medium' : 'text-sm'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Service Guarantees (服务保障 - Trust) */}
        <div className="bg-orange-50/70 border border-orange-200/80 rounded-3xl p-4.5">
          <h3 className="font-bold text-orange-950 text-base mb-2.5 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-orange-600" />
            为您服务家政帮 · 社区专属保障
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
            {service.guarantees.map((g, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-xl border border-orange-100 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                <span>{g}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. Fixed Bottom Bar & Core CTA (立即预约) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 p-4 shadow-xl z-40 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-stone-500">实付预估</div>
          <div className="flex items-baseline gap-0.5 text-orange-600">
            <span className="text-sm font-bold">￥</span>
            <span className="text-3xl font-black font-mono">{finalPrice}</span>
          </div>
        </div>

        <button
          id="proceed-to-tier-btn"
          onClick={() => onProceedToTier(quantity, quantity)}
          className={`flex-1 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all ${
            isLargeFont ? 'h-14 text-2xl' : 'h-13 text-xl'
          }`}
        >
          <span>立即预约</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};
