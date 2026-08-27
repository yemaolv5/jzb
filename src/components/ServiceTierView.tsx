import React from 'react';
import { StaffTier, StaffTierInfo, WorkerInfo, ServiceItem } from '../types';
import { STAFF_TIERS, WORKERS } from '../mockData';
import { ArrowLeft, CheckCircle2, Star, ShieldCheck, UserCheck, ChevronRight, Phone, ArrowRight } from 'lucide-react';

interface ServiceTierViewProps {
  service: ServiceItem;
  selectedTier: StaffTier;
  selectedWorker: WorkerInfo | null;
  isLargeFont: boolean;
  onBack: () => void;
  onSelectTier: (tier: StaffTier) => void;
  onOpenWorkerDetail: (worker: WorkerInfo) => void;
  onProceedToTime: () => void;
  onCallHelp: () => void;
}

export const ServiceTierView: React.FC<ServiceTierViewProps> = ({
  service,
  selectedTier,
  selectedWorker,
  isLargeFont,
  onBack,
  onSelectTier,
  onOpenWorkerDetail,
  onProceedToTime,
  onCallHelp,
}) => {
  return (
    <div id="page-service-tier" className="min-h-full bg-stone-50 text-stone-800 flex flex-col animate-in fade-in pb-24">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3.5 flex items-center justify-between">
        <button
          id="tier-back-btn"
          onClick={onBack}
          className="flex items-center gap-1 text-stone-700 hover:text-orange-600 font-bold p-1 rounded-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-base">上一步</span>
        </button>
        <h2 className="font-bold text-lg text-stone-900">
          选择服务人员等级
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
        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100 flex items-center justify-between text-xs font-bold text-orange-950">
          <span>第 2 / 4 步：确认服务标准</span>
          <span className="text-orange-700">简单3选1 · 平台统筹排班</span>
        </div>

        {/* 3 Tier Cards */}
        <div className="space-y-3.5">
          {STAFF_TIERS.map((item) => {
            const isSelected = selectedTier === item.tier;
            return (
              <div
                key={item.tier}
                id={`tier-card-${item.tier}`}
                onClick={() => onSelectTier(item.tier)}
                className={`rounded-3xl p-5 border-2 transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/60 shadow-md ring-2 ring-orange-400/20'
                    : 'border-stone-200 bg-white hover:border-stone-300 shadow-xs'
                }`}
              >
                {item.recommended && (
                  <span className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-bl-2xl">
                    {item.badge}
                  </span>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
                      {item.title}
                    </h3>
                    {!item.recommended && (
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    {item.priceDiff > 0 ? (
                      <span className="text-sm font-bold text-orange-600">+￥{item.priceDiff}元</span>
                    ) : (
                      <span className="text-xs text-stone-500 font-bold">标准指导价</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 my-3">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-stone-700 text-sm">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-orange-600' : 'text-stone-400'}`} />
                      <span className={isLargeFont ? 'text-base font-medium' : 'text-sm'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  id={`select-tier-btn-${item.tier}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTier(item.tier);
                  }}
                  className={`w-full h-12 rounded-2xl font-bold text-base flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isSelected ? `✓ 已选择${item.title}` : `选择${item.title}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust Highlight & Available Verified Workers Preview */}
        <div className="bg-white rounded-3xl p-4.5 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              本小区认证排班服务人员（可选）
            </h4>
            <span className="text-xs text-stone-400">均已购买商业险</span>
          </div>

          <p className="text-xs text-stone-500">
            默认由系统按您选择的等级自动指派就近技师；也可直接点击查看师傅履历：
          </p>

          <div className="space-y-2">
            {WORKERS.slice(0, 2).map((worker) => (
              <div
                key={worker.id}
                onClick={() => onOpenWorkerDetail(worker)}
                className="p-3 bg-stone-50 hover:bg-orange-50/50 rounded-2xl border border-stone-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{worker.name}</span>
                      <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {worker.rating}分
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      从业{worker.experienceYears}年 · 已服务{worker.servedHouseholds}户
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-xs text-orange-600 font-bold">
                  <span>资质详情</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fixed Bottom Next Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 p-4 shadow-xl z-40">
        <button
          id="proceed-to-time-btn"
          onClick={onProceedToTime}
          className={`w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all ${
            isLargeFont ? 'h-14 text-2xl' : 'h-13 text-xl'
          }`}
        >
          <span>下一步：选择预约时间</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};
