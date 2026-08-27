import React, { useState } from 'react';
import { OrderItem, WorkerInfo } from '../types';
import { Clock, CheckCircle2, Phone, Star, User, ShieldCheck, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

interface OrdersTabProps {
  orders: OrderItem[];
  isLargeFont: boolean;
  onCallWorker: (worker: WorkerInfo, order: OrderItem) => void;
  onCallHelp: () => void;
  onOpenReview: (order: OrderItem) => void;
  onOpenWorkerDetail: (worker: WorkerInfo) => void;
  onReOrder: (order: OrderItem) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  isLargeFont,
  onCallWorker,
  onCallHelp,
  onOpenReview,
  onOpenWorkerDetail,
  onReOrder,
}) => {
  const [activeCategory, setActiveCategory] = useState<'pending' | 'completed'>('pending');

  const pendingOrders = orders.filter(
    (o) => o.status === 'pending_arrival' || o.status === 'in_service'
  );
  const completedOrders = orders.filter(
    (o) => o.status === 'completed' || o.status === 'cancelled'
  );

  const displayList = activeCategory === 'pending' ? pendingOrders : completedOrders;

  return (
    <div id="page-orders-tab" className="p-4 space-y-4 pb-20 animate-in fade-in">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
            我的服务订单
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            简单两类：待服务 · 已完成
          </p>
        </div>
        
        <button
          onClick={onCallHelp}
          className="text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200 flex items-center gap-1"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>物业客服协助</span>
        </button>
      </div>

      {/* 2 Big Simple Category Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-stone-200/80 p-1.5 rounded-2xl">
        <button
          id="orders-tab-pending"
          onClick={() => setActiveCategory('pending')}
          className={`h-12 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            isLargeFont ? 'text-lg' : 'text-base'
          } ${
            activeCategory === 'pending'
              ? 'bg-white text-orange-600 shadow-sm font-black'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>待服务 ({pendingOrders.length})</span>
        </button>

        <button
          id="orders-tab-completed"
          onClick={() => setActiveCategory('completed')}
          className={`h-12 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            isLargeFont ? 'text-lg' : 'text-base'
          } ${
            activeCategory === 'completed'
              ? 'bg-white text-orange-600 shadow-sm font-black'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>已完成 ({completedOrders.length})</span>
        </button>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {displayList.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-300">
              <Clock className="w-8 h-8" />
            </div>
            <p className="text-base text-stone-500 font-medium">
              {activeCategory === 'pending' ? '暂无待上门服务订单' : '暂无历史已完成订单'}
            </p>
          </div>
        ) : (
          displayList.map((order) => {
            const isPending = order.status === 'pending_arrival' || order.status === 'in_service';

            return (
              <div
                key={order.id}
                id={`order-card-${order.id}`}
                className="bg-white rounded-3xl p-5 border-2 border-stone-200/90 shadow-xs space-y-4 relative overflow-hidden"
              >
                {/* Top Status Bar */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-stone-400">单号：{order.orderNumber}</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                      {order.tierTitle}
                    </span>
                  </div>

                  <span className={`text-xs font-black px-3 py-1 rounded-full ${
                    isPending
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {order.status === 'pending_arrival' ? '● 待上门服务' : order.status === 'in_service' ? '● 正在服务中' : '✓ 已完成'}
                  </span>
                </div>

                {/* Main Service Info */}
                <div>
                  <h3 className={`font-black text-stone-900 ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
                    {order.serviceName}
                  </h3>
                  <div className="text-sm text-stone-600 mt-1 flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>预约时间：<strong className="text-stone-900">{order.scheduledTime}</strong></span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    房屋：{order.address.community} {order.address.building}{order.address.unit}{order.address.room} ({order.quantity}{order.unit})
                  </div>
                </div>

                {/* Assigned Worker Info (解决家庭信任) */}
                <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold overflow-hidden border border-white shadow-xs">
                      {order.worker?.avatar ? (
                        <img src={order.worker.avatar} alt={order.worker.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-base">
                          {order.worker ? order.worker.name : '平台派单中（王师傅班组）'}
                        </span>
                        <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                          已核验
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {order.worker ? `从业${order.worker.experienceYears}年 · 评分 ${order.worker.rating}分` : '物业认证服务团队'}
                      </div>
                    </div>
                  </div>

                  {order.worker && (
                    <button
                      id={`view-worker-btn-${order.id}`}
                      onClick={() => onOpenWorkerDetail(order.worker!)}
                      className="text-xs text-orange-600 font-bold hover:underline"
                    >
                      查看资质
                    </button>
                  )}
                </div>

                {/* Price Summary */}
                <div className="flex items-baseline justify-between text-xs text-stone-500 pt-1">
                  <span>
                    原价 ￥{order.originalPrice} - 权益抵扣 ￥{order.discountAmount}
                  </span>
                  <div className="text-stone-900 text-sm font-bold">
                    实付：<strong className="text-lg font-black text-orange-600 font-mono">￥{order.finalPrice}</strong> 元
                  </div>
                </div>

                {/* Review Data if already reviewed */}
                {order.hasReviewed && order.reviewData && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between text-emerald-900 font-bold">
                      <span>我的评价：{order.reviewData.satisfaction === 'satisfied' ? '😊 满意' : order.reviewData.satisfaction === 'neutral' ? '😐 一般' : '🙁 不满意'}</span>
                      <span className="text-stone-400 font-normal">{order.reviewData.createdAt}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {order.reviewData.tags.map((t, idx) => (
                        <span key={idx} className="bg-white text-emerald-800 text-[11px] px-2 py-0.5 rounded-md border border-emerald-100">
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                    {order.reviewData.comment && (
                      <p className="text-stone-600 text-xs mt-1 italic">“{order.reviewData.comment}”</p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 border-t border-stone-100 flex items-center gap-2.5">
                  {isPending ? (
                    <>
                      {order.worker && (
                        <button
                          id={`call-worker-order-btn-${order.id}`}
                          onClick={() => onCallWorker(order.worker!, order)}
                          className="flex-1 h-12 bg-white hover:bg-stone-50 active:bg-stone-100 border-2 border-orange-500 text-orange-600 font-bold text-base rounded-2xl flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Phone className="w-4 h-4" />
                          <span>联系服务人员</span>
                        </button>
                      )}
                      <button
                        id={`call-help-order-btn-${order.id}`}
                        onClick={onCallHelp}
                        className="flex-1 h-12 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 font-bold text-base rounded-2xl flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-4 h-4 text-stone-600" />
                        <span>联系客服</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {!order.hasReviewed ? (
                        <button
                          id={`review-order-btn-${order.id}`}
                          onClick={() => onOpenReview(order)}
                          className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Star className="w-4 h-4" />
                          <span>评价服务（赢好礼）</span>
                        </button>
                      ) : (
                        <button
                          id={`reorder-btn-${order.id}`}
                          onClick={() => onReOrder(order)}
                          className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span>再次预约该服务</span>
                        </button>
                      )}
                    </>
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
