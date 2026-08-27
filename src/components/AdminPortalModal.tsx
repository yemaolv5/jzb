import React from 'react';
import { OrderItem, CouponItem, ServiceItem } from '../types';
import { Building2, LayoutDashboard, Ticket, Users2, ShieldCheck, DollarSign, X } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
  coupons: CouponItem[];
  services: ServiceItem[];
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  orders,
  coupons,
  services,
}) => {
  if (!isOpen) return null;

  const totalGMV = orders.reduce((sum, o) => sum + o.originalPrice, 0);
  const totalSubsidies = orders.reduce((sum, o) => sum + o.discountAmount, 0);
  const totalPaid = orders.reduce((sum, o) => sum + o.finalPrice, 0);

  return (
    <div id="admin-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="admin-modal-card" className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-stone-800">
        
        {/* Header */}
        <div className="bg-stone-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">家政帮 · 物业生活服务平台运营后台</h3>
              <p className="text-xs text-stone-400">东达景苑物业生活服务运营中心</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="p-5 overflow-y-auto space-y-5 bg-stone-50 flex-1">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div className="text-xs text-stone-500 font-medium">总服务流水 (GMV)</div>
              <div className="text-2xl font-black text-stone-900 mt-1 font-mono">￥{totalGMV}</div>
              <div className="text-[11px] text-emerald-600 mt-0.5">订单总数: {orders.length} 单</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div className="text-xs text-stone-500 font-medium">物业权益补贴抵扣</div>
              <div className="text-2xl font-black text-orange-600 mt-1 font-mono">￥{totalSubsidies}</div>
              <div className="text-[11px] text-stone-400 mt-0.5">年度缴费活动闭环</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div className="text-xs text-stone-500 font-medium">业主实际支付</div>
              <div className="text-2xl font-black text-blue-600 mt-1 font-mono">￥{totalPaid}</div>
              <div className="text-[11px] text-stone-400 mt-0.5">履约满意度: 99.2%</div>
            </div>
          </div>

          {/* Module 1: Community & Services */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <h4 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              已上线服务类目 ({services.length} 类)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {services.map((svc) => (
                <div key={svc.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-800">{svc.name}</div>
                    <div className="text-stone-500 text-[11px]">
                      基准价：￥{svc.pricePerUnit}/{svc.unit}
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    正常上架
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: Renewal Coupon Pool */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <h4 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-orange-600" />
              物业焕新权益券发放与核销池
            </h4>
            <div className="space-y-2 text-xs">
              {coupons.map((cp) => (
                <div key={cp.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-800">{cp.title}</div>
                    <div className="text-stone-500 text-[11px]">{cp.source} · 面值 ￥{cp.amount}</div>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    cp.status === 'available'
                      ? 'bg-orange-100 text-orange-800'
                      : cp.status === 'used'
                      ? 'bg-stone-200 text-stone-600'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {cp.status === 'available' ? '待核销' : cp.status === 'used' ? '已核销抵扣' : '已过期'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500">
          为您服务家政帮 · 物业生活服务数字化运营中台（MVP规划设计）
        </div>

      </div>
    </div>
  );
};
