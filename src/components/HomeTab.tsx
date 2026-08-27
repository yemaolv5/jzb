import React from 'react';
import { ServiceItem, UserAddress, CommunityGroupBuy, CouponItem } from '../types';
import { Sparkles, Home, Flame, Wind, Wrench, Layers, Phone, ArrowRight, Building2, Ticket, Users, CheckCircle2, ChevronRight } from 'lucide-react';

interface HomeTabProps {
  currentCommunity: string;
  userAddress: UserAddress;
  services: ServiceItem[];
  renewalCoupon: CouponItem | undefined;
  groupBuy: CommunityGroupBuy;
  isLargeFont: boolean;
  onSelectService: (service: ServiceItem) => void;
  onUseRenewalCoupon: () => void;
  onOpenSwitchCommunity: () => void;
  onOpenGroupBuy: () => void;
  onCallHelp: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  currentCommunity,
  userAddress,
  services,
  renewalCoupon,
  groupBuy,
  isLargeFont,
  onSelectService,
  onUseRenewalCoupon,
  onOpenSwitchCommunity,
  onOpenGroupBuy,
  onCallHelp,
}) => {

  const getServiceIcon = (iconName: string) => {
    const iconClass = isLargeFont ? 'w-10 h-10' : 'w-8 h-8';
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={`${iconClass} text-orange-500`} />;
      case 'Home':
        return <Home className={`${iconClass} text-emerald-500`} />;
      case 'Flame':
        return <Flame className={`${iconClass} text-amber-500`} />;
      case 'Wind':
        return <Wind className={`${iconClass} text-blue-500`} />;
      case 'Wrench':
        return <Wrench className={`${iconClass} text-cyan-600`} />;
      case 'Layers':
        return <Layers className={`${iconClass} text-indigo-500`} />;
      default:
        return <Sparkles className={`${iconClass} text-orange-500`} />;
    }
  };

  return (
    <div id="page-home" className="space-y-4 pb-6 animate-in fade-in">
      
      {/* 1. Top Brand Header */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white p-5 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 id="brand-title" className={`font-black tracking-tight text-white ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
                为您服务家政帮
              </h1>
              <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/30">
                社区直供
              </span>
            </div>
            <p id="brand-subtitle" className={`text-orange-100 font-medium mt-1 ${isLargeFont ? 'text-base' : 'text-sm'}`}>
              放心找服务，就在咱小区
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 text-white shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* 2. Current Community Bar */}
        <div className="mt-4 bg-white/15 backdrop-blur-xs rounded-2xl p-3 flex items-center justify-between border border-white/25">
          <div className="flex items-center gap-2 text-white">
            <Building2 className="w-5 h-5 text-amber-200 shrink-0" />
            <span className={`font-bold ${isLargeFont ? 'text-lg' : 'text-base'}`}>
              当前小区：{currentCommunity}
            </span>
          </div>
          <button
            id="switch-community-btn"
            onClick={onOpenSwitchCommunity}
            className="bg-white text-orange-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-xs hover:bg-orange-50 active:scale-95 transition-all"
          >
            <span>切换小区</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4">
        
        {/* 3. Family Renewal Benefit Card (家庭焕新权益卡 - Core Highlight) */}
        {renewalCoupon && renewalCoupon.status === 'available' ? (
          <div id="renewal-benefit-card" className="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden pulse-highlight">
            <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="inline-flex items-center gap-1 bg-white/25 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-bold text-white mb-2">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>物业缴费感恩回馈</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-orange-100 font-medium">您有</span>
                  <span className={`font-black text-white font-mono ${isLargeFont ? 'text-4xl' : 'text-3xl'}`}>
                    100元
                  </span>
                </div>
                <h3 className={`font-bold text-white mt-0.5 ${isLargeFont ? 'text-xl' : 'text-lg'}`}>
                  家庭焕新优惠券
                </h3>
                <p className="text-xs text-orange-100 mt-1">
                  有效期至：2026年12月31日
                </p>
                <p className="text-xs text-amber-200 mt-0.5">
                  可用服务：全屋擦玻璃 / 家政保洁
                </p>
              </div>

              <div className="text-right">
                <button
                  id="use-renewal-coupon-btn"
                  onClick={onUseRenewalCoupon}
                  className={`mt-6 bg-white text-orange-700 font-black rounded-2xl shadow-xl hover:bg-orange-50 active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
                    isLargeFont ? 'h-14 px-6 text-xl' : 'h-12 px-5 text-lg'
                  }`}
                >
                  <span>立即使用</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-orange-100">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-200" />
                东达景苑 3号楼2单元501 自动抵扣
              </span>
              <span className="font-medium text-amber-200">免输房号</span>
            </div>
          </div>
        ) : (
          <div className="bg-stone-100 rounded-3xl p-4 border border-stone-200 flex items-center justify-between text-stone-700">
            <div>
              <h4 className="font-bold text-base">家庭焕新权益已使用</h4>
              <p className="text-xs text-stone-500">东达景苑物业业主专属折扣仍可享</p>
            </div>
            <button
              onClick={() => onSelectService(services[0])}
              className="bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl"
            >
              预约服务
            </button>
          </div>
        )}

        {/* 4. Common Services (常用服务 - Large Icons & Big Text) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
              常用服务
            </h2>
            <span className="text-xs text-stone-500 font-medium">明码标价 · 邻里好评</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {services.map((service) => {
              const isHighlight = service.id === 'window_cleaning';
              return (
                <button
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className={`p-4 rounded-3xl text-left transition-all border-2 flex flex-col justify-between relative overflow-hidden ${
                    isHighlight
                      ? 'bg-orange-50/70 border-orange-400 hover:border-orange-500 shadow-sm'
                      : 'bg-white border-stone-200/80 hover:border-stone-300 shadow-xs'
                  }`}
                >
                  {service.badge && (
                    <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isHighlight ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {service.badge}
                    </span>
                  )}

                  <div className="mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-stone-100 flex items-center justify-center mb-2.5">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <h3 className={`font-black text-stone-900 ${isLargeFont ? 'text-xl' : 'text-lg'}`}>
                      {service.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-stone-400">指导价 </span>
                      <span className="text-base font-extrabold text-orange-600 font-mono">
                        ￥{service.pricePerUnit}
                      </span>
                      <span className="text-xs text-stone-500">/{service.unit}</span>
                    </div>
                    <span className="text-xs text-orange-600 font-bold flex items-center">
                      预约 <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Community Group Buy (本小区大家都在约) */}
        <div id="community-groupbuy-card" className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-4 border border-orange-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-orange-600 text-white text-xs font-black px-2 py-0.5 rounded-lg">
                邻里团购
              </span>
              <h3 className={`font-bold text-stone-900 ${isLargeFont ? 'text-lg' : 'text-base'}`}>
                本小区大家都在约
              </h3>
            </div>
            <span className="text-xs text-orange-700 font-bold">
              人多更优惠
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-orange-100 flex items-center justify-between">
            <div>
              <div className="font-bold text-stone-900 text-base">
                {groupBuy.communityName}擦玻璃团购
              </div>
              <div className="text-xs text-stone-600 mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-orange-600" />
                <span>已有 <strong className="text-orange-600 font-bold text-sm">{groupBuy.joinedHouseholds}</strong> 户预约</span>
                <span className="text-stone-300">|</span>
                <span className="text-orange-700 font-bold">满10户享95折</span>
              </div>
            </div>

            <button
              id="join-groupbuy-btn"
              onClick={onOpenGroupBuy}
              className={`bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center ${
                isLargeFont ? 'h-12 px-4 text-base' : 'h-10 px-3.5 text-sm'
              }`}
            >
              一起预约
            </button>
          </div>
        </div>

        {/* 6. Elderly Assistance Hotline Entry (人工帮助入口) */}
        <div id="elder-help-entry" className="bg-stone-900 text-white rounded-3xl p-5 shadow-md flex items-center justify-between">
          <div>
            <span className="bg-orange-500 text-stone-950 text-[11px] font-extrabold px-2 py-0.5 rounded-md uppercase">
              长辈专属协助
            </span>
            <h3 className={`font-bold text-white mt-1 ${isLargeFont ? 'text-xl' : 'text-lg'}`}>
              不会操作？找小钥匙客服
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              支持一键电话呼叫，专人帮您登记与排班
            </p>
          </div>

          <button
            id="home-call-help-btn"
            onClick={onCallHelp}
            className={`bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 shadow-lg shrink-0 ${
              isLargeFont ? 'h-14 px-5 text-lg' : 'h-12 px-4 text-base'
            }`}
          >
            <Phone className="w-5 h-5" />
            <span>电话联系客服</span>
          </button>
        </div>

      </div>

    </div>
  );
};
