import React from 'react';
import { UserAddress } from '../types';
import { Key, Gift, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Building2, User } from 'lucide-react';

interface XiaoYaoShiSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToHousekeeping: (userData: {
    address: UserAddress;
    couponAmount: number;
    couponTitle: string;
  }) => void;
}

export const XiaoYaoShiSimulator: React.FC<XiaoYaoShiSimulatorProps> = ({
  isOpen,
  onClose,
  onJumpToHousekeeping,
}) => {
  if (!isOpen) return null;

  const mockPropertyUser = {
    name: '李建国',
    phone: '138 6688 9988',
    community: '东达景苑',
    building: '3号楼',
    unit: '2单元',
    room: '501',
    area: 100,
    paidYear: '2026年度物业费（已缴清）',
    benefitName: '100元家庭焕新权益券',
    benefitAmount: 100,
  };

  const handleExecuteJump = () => {
    onJumpToHousekeeping({
      address: {
        id: 'addr_xiaoyaoshi',
        community: mockPropertyUser.community,
        building: mockPropertyUser.building,
        unit: mockPropertyUser.unit,
        room: mockPropertyUser.room,
        area: mockPropertyUser.area,
        contactName: mockPropertyUser.name,
        phone: mockPropertyUser.phone,
        isDefault: true,
      },
      couponAmount: mockPropertyUser.benefitAmount,
      couponTitle: mockPropertyUser.benefitName,
    });
    onClose();
  };

  return (
    <div id="xiaoyaoshi-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="xiaoyaoshi-modal-card" className="w-full max-w-md bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-stone-800">
        
        {/* Header - Xiao Yao Shi Identity */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Key className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">为您服务小钥匙</h3>
                <p className="text-xs text-blue-200">社区物业数字化服务中心</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-sm bg-white/10 px-2.5 py-1 rounded-full"
            >
              关闭演示
            </button>
          </div>
        </div>

        {/* Xiao Yao Shi Page Mock */}
        <div className="p-5 space-y-4 bg-stone-900 text-stone-100">
          
          <div className="bg-stone-800 rounded-2xl p-4 border border-stone-700 text-sm">
            <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                已认证业主房屋
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                {mockPropertyUser.paidYear}
              </span>
            </div>
            <div className="text-lg font-bold text-white">
              {mockPropertyUser.community} {mockPropertyUser.building}{mockPropertyUser.unit}{mockPropertyUser.room}
            </div>
            <div className="text-stone-400 text-xs mt-1">
              业主：{mockPropertyUser.name} · 房屋建筑面积：{mockPropertyUser.area}㎡
            </div>
          </div>

          {/* Received Benefit Card */}
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-amber-500 text-stone-950 text-[11px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                  物业缴费回馈礼
                </span>
                <h4 className="text-xl font-extrabold text-amber-300 mt-1.5">
                  100元 家庭焕新权益券
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  专享：全屋擦玻璃 / 家政保洁服务直减抵扣
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  有效期至：2026年12月31日 · 已自动发放至您的账户
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-amber-400 font-mono">￥100</span>
              </div>
            </div>
          </div>

          {/* Jump explanation */}
          <div className="bg-blue-950/40 border border-blue-800/60 rounded-2xl p-3.5 text-xs text-blue-200">
            <div className="font-bold text-blue-100 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              无感跳转联动设计说明：
            </div>
            <p className="leading-relaxed">
              点击下方按钮，将模拟从【小钥匙】携带业主身份、房屋面积（100㎡）和100元权益券，直接进入【家政帮】擦玻璃页面，无需再次注册或输入房号！
            </p>
          </div>

        </div>

        {/* Footer Jump Button */}
        <div className="p-4 bg-stone-950 border-t border-stone-800">
          <button
            id="execute-seamless-jump-btn"
            onClick={handleExecuteJump}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.99] text-stone-950 font-extrabold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>立即使用权益 · 跳转家政帮</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>
  );
};
