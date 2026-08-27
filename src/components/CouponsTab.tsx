import React, { useState } from 'react';
import { CouponItem } from '../types';
import { Ticket, Sparkles, CheckCircle2, Clock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface CouponsTabProps {
  coupons: CouponItem[];
  isLargeFont: boolean;
  onUseCoupon: (coupon: CouponItem) => void;
}

export const CouponsTab: React.FC<CouponsTabProps> = ({
  coupons,
  isLargeFont,
  onUseCoupon,
}) => {
  const [filter, setFilter] = useState<'available' | 'used' | 'expired'>('available');

  const filtered = coupons.filter((c) => c.status === filter);

  return (
    <div id="page-coupons-tab" className="p-4 space-y-4 pb-20 animate-in fade-in">
      
      {/* Top Header */}
      <div>
        <h1 className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
          优惠权益中心
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          物业缴费焕新福利 · 下单自动抵扣
        </p>
      </div>

      {/* 3 Simple Status Filter Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-stone-200/80 p-1.5 rounded-2xl">
        <button
          id="coupons-filter-available"
          onClick={() => setFilter('available')}
          className={`h-11 rounded-xl font-bold flex items-center justify-center transition-all ${
            isLargeFont ? 'text-base' : 'text-sm'
          } ${
            filter === 'available'
              ? 'bg-white text-orange-600 shadow-sm font-black'
              : 'text-stone-600'
          }`}
        >
          待使用 ({coupons.filter((c) => c.status === 'available').length})
        </button>

        <button
          id="coupons-filter-used"
          onClick={() => setFilter('used')}
          className={`h-11 rounded-xl font-bold flex items-center justify-center transition-all ${
            isLargeFont ? 'text-base' : 'text-sm'
          } ${
            filter === 'used'
              ? 'bg-white text-orange-600 shadow-sm font-black'
              : 'text-stone-600'
          }`}
        >
          已使用 ({coupons.filter((c) => c.status === 'used').length})
        </button>

        <button
          id="coupons-filter-expired"
          onClick={() => setFilter('expired')}
          className={`h-11 rounded-xl font-bold flex items-center justify-center transition-all ${
            isLargeFont ? 'text-base' : 'text-sm'
          } ${
            filter === 'expired'
              ? 'bg-white text-orange-600 shadow-sm font-black'
              : 'text-stone-600'
          }`}
        >
          已过期 (0)
        </button>
      </div>

      {/* List */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400">
            暂无相关权益券
          </div>
        ) : (
          filtered.map((cp) => {
            const isAvailable = cp.status === 'available';
            const isRenewal = cp.id.includes('renewal');

            return (
              <div
                key={cp.id}
                id={`coupon-card-${cp.id}`}
                className={`rounded-3xl p-5 border-2 shadow-xs relative overflow-hidden transition-all ${
                  isAvailable
                    ? isRenewal
                      ? 'bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-orange-600/10 border-orange-400'
                      : 'bg-white border-stone-200'
                    : 'bg-stone-100 border-stone-200 opacity-60'
                }`}
              >
                {isRenewal && isAvailable && (
                  <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl">
                    物业焕新专享
                  </span>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Ticket className={`w-5 h-5 ${isAvailable ? 'text-orange-600' : 'text-stone-400'}`} />
                      <h3 className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
                        {cp.title}
                      </h3>
                    </div>

                    <div className="text-xs text-stone-500 mt-1.5 space-y-0.5">
                      <div>来源：<strong>{cp.source}</strong></div>
                      <div>可用服务：<strong className="text-orange-700">{cp.applicableCategory === 'window' ? '家庭焕新·擦玻璃' : cp.applicableCategory === 'appliance' ? '洗油烟机与家电清洗' : '全场服务通用'}</strong></div>
                      <div>有效期：{cp.validUntil}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline gap-0.5 text-orange-600">
                      <span className="text-base font-bold">￥</span>
                      <span className={`font-black font-mono ${isLargeFont ? 'text-4xl' : 'text-3xl'}`}>
                        {cp.amount}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">满{cp.minSpend}元可用</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                  <p className="text-xs text-stone-500 line-clamp-1 flex-1 mr-2">
                    {cp.description}
                  </p>

                  {isAvailable ? (
                    <button
                      id={`use-coupon-action-btn-${cp.id}`}
                      onClick={() => onUseCoupon(cp)}
                      className="h-11 px-5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-base rounded-xl flex items-center justify-center gap-1 shadow-sm shrink-0"
                    >
                      <span>立即使用</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-stone-400 px-3 py-1 bg-stone-200 rounded-lg">
                      {cp.status === 'used' ? '已核销使用' : '已过期'}
                    </span>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
