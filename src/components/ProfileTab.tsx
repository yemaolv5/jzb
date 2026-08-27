import React from 'react';
import { UserAddress, TabType } from '../types';
import { User, MapPin, ClipboardList, Ticket, Phone, ShieldCheck, Info, ChevronRight, Building2, HeartHandshake } from 'lucide-react';
import { HOTLINE_NUMBER } from '../mockData';

interface ProfileTabProps {
  userAddress: UserAddress;
  orderCount: number;
  couponCount: number;
  isLargeFont: boolean;
  onNavigateTab: (tab: TabType) => void;
  onCallHelp: () => void;
  onOpenXiaoYaoShiSim: () => void;
  onOpenAdminPortal: () => void;
  onOpenSupplierPortal: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userAddress,
  orderCount,
  couponCount,
  isLargeFont,
  onNavigateTab,
  onCallHelp,
  onOpenXiaoYaoShiSim,
  onOpenAdminPortal,
  onOpenSupplierPortal,
}) => {
  return (
    <div id="page-profile-tab" className="p-4 space-y-4 pb-20 animate-in fade-in">
      
      {/* User Info Header Card */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-3xl p-5 text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-2xl font-black shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`font-black text-white ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
                {userAddress.contactName}
              </h2>
              <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/30">
                认证业主
              </span>
            </div>
            <p className="text-xs text-orange-100 mt-1">
              手机号：{userAddress.phone}
            </p>
          </div>
        </div>

        {/* Address Badge */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-orange-100">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-amber-200 shrink-0" />
            <span>{userAddress.community} {userAddress.building}{userAddress.unit}{userAddress.room} ({userAddress.area}㎡)</span>
          </div>
          <span className="bg-white text-orange-700 font-bold px-2 py-0.5 rounded-md text-[11px]">
            默认房屋
          </span>
        </div>
      </div>

      {/* 2 Quick Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          id="profile-my-orders-btn"
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-4 rounded-3xl border border-stone-200 text-left shadow-xs hover:border-orange-300 transition-all flex items-center justify-between"
        >
          <div>
            <div className="text-xs text-stone-500">我的订单</div>
            <div className="text-2xl font-black text-stone-900 mt-1 font-mono">{orderCount}</div>
            <div className="text-[11px] text-orange-600 font-medium mt-0.5">待服务 / 历史</div>
          </div>
          <ClipboardList className="w-8 h-8 text-orange-500 opacity-80" />
        </button>

        <button
          id="profile-my-coupons-btn"
          onClick={() => onNavigateTab('coupons')}
          className="bg-white p-4 rounded-3xl border border-stone-200 text-left shadow-xs hover:border-orange-300 transition-all flex items-center justify-between"
        >
          <div>
            <div className="text-xs text-stone-500">我的优惠权益</div>
            <div className="text-2xl font-black text-orange-600 mt-1 font-mono">{couponCount}</div>
            <div className="text-[11px] text-stone-500 font-medium mt-0.5">含100元焕新券</div>
          </div>
          <Ticket className="w-8 h-8 text-amber-500 opacity-80" />
        </button>
      </div>

      {/* Menu List - 6 Functional Entries */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden divide-y divide-stone-100">
        
        {/* 1. Address Management */}
        <div className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-stone-900 text-base">我的房屋地址</div>
              <div className="text-xs text-stone-500">{userAddress.community} 3号楼2单元501</div>
            </div>
          </div>
          <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            小钥匙已绑定
          </span>
        </div>

        {/* 2. Customer Service Call */}
        <div
          onClick={onCallHelp}
          className="p-4 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-stone-900 text-base">联系客服热线</div>
              <div className="text-xs text-stone-500">24小时人工协助 · {HOTLINE_NUMBER}</div>
            </div>
          </div>
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            一键呼叫
          </span>
        </div>

        {/* 3. Service Guarantees */}
        <div className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-stone-900 text-base">服务保障说明</div>
              <div className="text-xs text-stone-500">实名认证 · 商业保险 · 售后协调</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400" />
        </div>

        {/* 4. About Us */}
        <div className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-stone-900 text-base">关于为您服务家政帮</div>
              <div className="text-xs text-stone-500">小钥匙社区生活服务独立孵化平台 v1.0.0 (MVP)</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400" />
        </div>

      </div>

      {/* Prototype Reviewer Helper Panel (Convenient for Stakeholder Demos) */}
      <div className="bg-stone-900 text-white rounded-3xl p-4.5 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
          <span>⚙️ 原型演示协同入口</span>
          <span className="text-stone-400 font-normal">支持各角色闭环测试</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            onClick={onOpenXiaoYaoShiSim}
            className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold flex flex-col items-center text-center gap-1 border border-stone-700"
          >
            <span>🔑 小钥匙</span>
            <span className="text-[10px] text-amber-300">无感带入演示</span>
          </button>

          <button
            onClick={onOpenSupplierPortal}
            className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold flex flex-col items-center text-center gap-1 border border-stone-700"
          >
            <span>🚚 供应商端</span>
            <span className="text-[10px] text-emerald-300">履约打卡核销</span>
          </button>

          <button
            onClick={onOpenAdminPortal}
            className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold flex flex-col items-center text-center gap-1 border border-stone-700"
          >
            <span>📊 运营中台</span>
            <span className="text-[10px] text-blue-300">数据与权益池</span>
          </button>
        </div>
      </div>

    </div>
  );
};
