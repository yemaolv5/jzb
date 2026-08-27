import React, { useState } from 'react';
import { ServiceItem, StaffTier, UserAddress, CouponItem, WorkerInfo, OrderItem } from '../types';
import { STAFF_TIERS } from '../mockData';
import { ArrowLeft, CheckCircle2, ShieldCheck, Ticket, Building2, Clock, Award, Phone, Check, CreditCard, Sparkles } from 'lucide-react';

interface OrderConfirmViewProps {
  service: ServiceItem;
  quantity: number;
  tier: StaffTier;
  worker: WorkerInfo | null;
  timeStr: string;
  userAddress: UserAddress;
  coupon: CouponItem | null;
  isLargeFont: boolean;
  onBack: () => void;
  onConfirmOrder: (newOrder: Partial<OrderItem>) => void;
  onCallHelp: () => void;
}

export const OrderConfirmView: React.FC<OrderConfirmViewProps> = ({
  service,
  quantity,
  tier,
  worker,
  timeStr,
  userAddress,
  coupon,
  isLargeFont,
  onBack,
  onConfirmOrder,
  onCallHelp,
}) => {
  const [payMethod, setPayMethod] = useState<'wechat' | 'property_balance' | 'renewal_benefit'>('wechat');
  const [isProcessing, setIsProcessing] = useState(false);

  const tierObj = STAFF_TIERS.find((t) => t.tier === tier) || STAFF_TIERS[1];
  const originalPrice = service.basePriceCalculation(quantity) + tierObj.priceDiff;
  const discountAmount = coupon && coupon.status === 'available' ? coupon.amount : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirmOrder({
        serviceId: service.id,
        serviceName: service.name === '擦玻璃' ? '家庭焕新·擦玻璃' : service.name,
        category: service.category,
        tier,
        tierTitle: tierObj.title,
        address: userAddress,
        quantity,
        unit: service.unit,
        scheduledTime: timeStr,
        originalPrice,
        discountAmount,
        appliedCouponId: coupon ? coupon.id : undefined,
        finalPrice,
        payMethod: discountAmount >= originalPrice ? 'renewal_benefit' : payMethod,
        worker: worker || undefined,
      });
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div id="page-order-confirm" className="min-h-full bg-stone-50 text-stone-800 flex flex-col animate-in fade-in pb-28">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3.5 flex items-center justify-between">
        <button
          id="confirm-back-btn"
          onClick={onBack}
          className="flex items-center gap-1 text-stone-700 hover:text-orange-600 font-bold p-1 rounded-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-base">上一步</span>
        </button>
        <h2 className="font-bold text-lg text-stone-900">
          确认订单并支付
        </h2>
        <button
          onClick={onCallHelp}
          className="text-orange-600 font-bold text-xs flex items-center gap-1 bg-orange-50 px-2.5 py-1.5 rounded-full border border-orange-200"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>客服</span>
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* Step Indicator */}
        <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-950">
          <span>第 4 / 4 步：最终信息核对</span>
          <span className="text-emerald-700 font-extrabold">强确认 · 透明无隐形消费</span>
        </div>

        {/* 1. Core Order Summary Card */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
          <h3 className={`font-black text-stone-900 pb-2 border-b border-stone-100 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
            服务预约信息
          </h3>

          <div className="space-y-3 text-stone-700">
            
            {/* Service Name */}
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-sm">预约服务</span>
              <span className="font-black text-stone-900 text-base">
                {service.name === '擦玻璃' ? '家庭焕新·擦玻璃' : service.name}
              </span>
            </div>

            {/* Service Address */}
            <div className="flex items-start justify-between">
              <span className="text-stone-500 text-sm shrink-0">服务地址</span>
              <div className="text-right">
                <span className="font-bold text-stone-900 text-base">
                  {userAddress.community} {userAddress.building}{userAddress.unit}{userAddress.room}
                </span>
                <div className="text-xs text-stone-500">
                  {userAddress.contactName} ({userAddress.phone})
                </div>
              </div>
            </div>

            {/* Quantity / Area */}
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-sm">
                {service.calculationType === 'area' ? '建筑面积' : '服务数量'}
              </span>
              <span className="font-mono font-bold text-stone-900 text-base">
                {quantity} {service.unit}
              </span>
            </div>

            {/* Service Tier */}
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-sm">服务等级</span>
              <span className="font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full text-sm border border-orange-200">
                {tierObj.title} {worker ? `(指定技师：${worker.name})` : '(平台优选就近排班)'}
              </span>
            </div>

            {/* Scheduled Time */}
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-sm">预约时间</span>
              <span className="font-bold text-stone-900 text-base flex items-center gap-1 text-right">
                <Clock className="w-4 h-4 text-orange-600 inline" />
                {timeStr}
              </span>
            </div>

          </div>
        </div>

        {/* 2. Price Breakdown & Big Real Pay (核心价格与权益卡) */}
        <div className="bg-white rounded-3xl p-5 border-2 border-orange-300 shadow-sm space-y-3.5">
          <h3 className={`font-black text-stone-900 pb-2 border-b border-stone-100 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
            费用与抵扣明细
          </h3>

          <div className="space-y-2 text-stone-700 text-sm">
            <div className="flex justify-between items-center">
              <span>服务原价 ({quantity}{service.unit} × ￥{service.pricePerUnit})</span>
              <span className="font-mono text-base font-bold">￥{originalPrice}</span>
            </div>

            {/* Family renewal benefit row */}
            <div className="flex justify-between items-center py-2 bg-orange-50 px-3 rounded-xl border border-orange-200">
              <div className="flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-950 text-sm">
                  {coupon ? coupon.title : '家庭焕新权益'}
                </span>
              </div>
              <span className="font-mono font-black text-orange-600 text-lg">
                -{discountAmount}元
              </span>
            </div>
          </div>

          {/* Big Real Pay Amount */}
          <div className="pt-3 border-t-2 border-stone-200 flex items-baseline justify-between">
            <div>
              <span className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
                实际支付金额
              </span>
              <div className="text-xs text-stone-500 mt-0.5">无其他附加费 · 服务满意再确认</div>
            </div>

            <div className="flex items-baseline gap-1 text-orange-600">
              <span className="text-2xl font-bold">￥</span>
              <span id="confirm-final-price-display" className={`font-black font-mono tracking-tight ${isLargeFont ? 'text-5xl' : 'text-4xl'}`}>
                {finalPrice}
              </span>
              <span className="text-sm font-bold text-stone-500">元</span>
            </div>
          </div>
        </div>

        {/* 3. Payment Methods */}
        <div className="bg-white rounded-3xl p-4.5 border border-stone-200 shadow-xs space-y-3">
          <h4 className="font-bold text-stone-900 text-sm">选择支付方式</h4>
          
          <div className="space-y-2">
            <label
              onClick={() => setPayMethod('wechat')}
              className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                payMethod === 'wechat'
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-stone-200 bg-stone-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  微
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-base">微信支付</div>
                  <div className="text-xs text-stone-500">支持零钱、已绑定银行卡快捷付</div>
                </div>
              </div>
              <input
                type="radio"
                name="payMethod"
                checked={payMethod === 'wechat'}
                onChange={() => setPayMethod('wechat')}
                className="w-5 h-5 text-emerald-600 accent-emerald-600"
              />
            </label>

            <label
              onClick={() => setPayMethod('property_balance')}
              className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                payMethod === 'property_balance'
                  ? 'border-orange-500 bg-orange-50/50'
                  : 'border-stone-200 bg-stone-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                  小
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-base">小钥匙物业账户 / 零钱包</div>
                  <div className="text-xs text-stone-500">直接从小区物业钱包抵扣</div>
                </div>
              </div>
              <input
                type="radio"
                name="payMethod"
                checked={payMethod === 'property_balance'}
                onChange={() => setPayMethod('property_balance')}
                className="w-5 h-5 text-orange-600 accent-orange-600"
              />
            </label>
          </div>
        </div>

        {/* 4. Elderly User Help Link (不会支付？联系客服帮您) */}
        <div className="bg-stone-100 rounded-2xl p-4 border border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-orange-600" />
            <div>
              <div className="font-bold text-stone-900 text-sm">不会支付或手机没钱？</div>
              <div className="text-xs text-stone-500">联系客服帮您登记，支持师傅上门现收或物业代扣</div>
            </div>
          </div>
          <button
            id="pay-help-call-btn"
            type="button"
            onClick={onCallHelp}
            className="px-3.5 py-2 bg-white text-orange-600 border border-orange-300 font-bold rounded-xl text-xs hover:bg-orange-50 shrink-0"
          >
            电话协助
          </button>
        </div>

      </div>

      {/* Fixed Bottom Core Action: 确认预约并支付 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 p-4 shadow-xl z-40">
        <button
          id="confirm-and-pay-btn"
          disabled={isProcessing}
          onClick={handlePay}
          className={`w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all ${
            isLargeFont ? 'h-16 text-2xl' : 'h-14 text-xl'
          }`}
        >
          {isProcessing ? (
            <span>正在创建预约并支付...</span>
          ) : (
            <>
              <CheckCircle2 className="w-7 h-7" />
              <span>确认预约并支付（￥{finalPrice}）</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
