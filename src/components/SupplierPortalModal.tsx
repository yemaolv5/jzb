import React from 'react';
import { OrderItem, WorkerInfo } from '../types';
import { Truck, CheckCircle2, UserCheck, Phone, Clock, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface SupplierPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
  workers: WorkerInfo[];
  onUpdateOrderStatus: (orderId: string, status: OrderItem['status']) => void;
}

export const SupplierPortalModal: React.FC<SupplierPortalModalProps> = ({
  isOpen,
  onClose,
  orders,
  workers,
  onUpdateOrderStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div id="supplier-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="supplier-modal-card" className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-stone-800">
        
        {/* Header */}
        <div className="bg-stone-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">家政认证供应商简易履约端</h3>
                <span className="bg-emerald-600 text-[11px] font-bold px-2 py-0.5 rounded-full text-white">MVP工作台</span>
              </div>
              <p className="text-xs text-stone-400">服务单排班 · 师傅派单 · 上门打卡 · 完工核销</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 bg-stone-50 flex-1">
          <div className="text-xs text-stone-500 bg-white p-3 rounded-2xl border border-stone-200 flex items-center justify-between">
            <span>社区驻点服务商：<strong>杭州家友生活服务有限公司（东达景苑站）</strong></span>
            <span className="text-orange-600 font-bold">在岗师傅：{workers.length} 人</span>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-stone-800 text-sm">社区居民最新预约订单 ({orders.length})</h4>
            
            {orders.length === 0 ? (
              <div className="p-8 text-center text-stone-400 bg-white rounded-2xl border border-stone-200">
                暂无服务订单
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-stone-900">{order.serviceName}</span>
                        <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-mono">
                          {order.orderNumber}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        预约时间：<strong className="text-stone-800">{order.scheduledTime}</strong>
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      order.status === 'pending_arrival'
                        ? 'bg-amber-100 text-amber-800'
                        : order.status === 'in_service'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {order.status === 'pending_arrival' ? '待上门' : order.status === 'in_service' ? '服务中' : '已完成'}
                    </span>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-xl text-xs space-y-1 text-stone-700">
                    <div><strong>业主地址：</strong>{order.address.community} {order.address.building}{order.address.unit}{order.address.room} ({order.quantity}{order.unit})</div>
                    <div><strong>联系电话：</strong>{order.address.contactName} ({order.address.phone})</div>
                    <div><strong>服务等级：</strong>{order.tierTitle} | <strong>指派技师：</strong>{order.worker?.name || '待排班'}</div>
                    <div><strong>结算金额：</strong>实付 ￥{order.finalPrice}（已抵扣权益 ￥{order.discountAmount}）</div>
                  </div>

                  {/* Supplier Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                    {order.status === 'pending_arrival' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'in_service')}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        技师打卡已上门
                      </button>
                    )}

                    {order.status === 'in_service' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        业主验收完成服务
                      </button>
                    )}

                    {order.status === 'completed' && (
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        履约完毕 · 待结算
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500">
          此工作台为供应商端MVP原型演示，真实场景下由供应商主管或师傅手机H5进行一键操作
        </div>

      </div>
    </div>
  );
};
