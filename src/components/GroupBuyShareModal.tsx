import React, { useState } from 'react';
import { CommunityGroupBuy } from '../types';
import { Users, Sparkles, Share2, Copy, Check, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface GroupBuyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupBuy: CommunityGroupBuy;
  onJoinGroupBuy: () => void;
}

export const GroupBuyShareModal: React.FC<GroupBuyShareModalProps> = ({
  isOpen,
  onClose,
  groupBuy,
  onJoinGroupBuy,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyShareText = () => {
    const text = `【${groupBuy.communityName}邻居们快来】我家正在约${groupBuy.serviceName}，已有${groupBuy.joinedHouseholds}户预约！满${groupBuy.nextTierHouseholds}户享${groupBuy.nextDiscount * 10}折团购价，一起约师傅集中上门更划算！`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="groupbuy-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="groupbuy-modal-card" className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col text-stone-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 p-5 text-white relative">
          <button
            id="close-groupbuy-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/20"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
              社区邻里拼团
            </span>
            <span className="text-orange-100 text-xs">师傅集中上门 · 人多更划算</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {groupBuy.communityName}家庭焕新团
          </h3>
          <p className="text-sm text-orange-100 mt-1">
            当前服务：{groupBuy.serviceName}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-5">
          
          {/* Status Progress */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-600" />
                <span className="text-base font-bold text-stone-900">
                  已有 <strong className="text-2xl text-orange-600 font-extrabold">{groupBuy.joinedHouseholds}</strong> 户预约
                </span>
              </div>
              <span className="bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                现享 {groupBuy.currentDiscount * 10} 折
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-orange-200/70 h-3 rounded-full overflow-hidden mt-3">
              <div
                className="bg-orange-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (groupBuy.joinedHouseholds / groupBuy.nextTierHouseholds) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-600 mt-2 font-medium">
              <span>还差 {groupBuy.nextTierHouseholds - groupBuy.joinedHouseholds} 户</span>
              <span className="text-orange-700 font-bold">满{groupBuy.nextTierHouseholds}户享 {groupBuy.nextDiscount * 10} 折！</span>
            </div>
          </div>

          {/* Group Buy Rules */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-sm">
            <h4 className="font-bold text-stone-800 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500" />
              团购优惠梯度规则
            </h4>
            <div className="space-y-1.5 text-stone-600">
              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <span>满 5 户成团</span>
                <span className="font-bold text-stone-800">享 9.9 折</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-stone-200/60 text-orange-700 font-bold">
                <span>满 10 户阶段（当前冲刺）</span>
                <span>享 9.5 折</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>满 20 户特惠</span>
                <span className="font-bold text-stone-800">享 9.0 折超值价</span>
              </div>
            </div>
          </div>

          {/* WeChat Group Share Card Simulation */}
          <div className="border-2 border-dashed border-orange-300 bg-orange-50/40 rounded-2xl p-3.5 relative">
            <div className="text-xs font-bold text-orange-900 mb-2 flex items-center gap-1">
              <Share2 className="w-4 h-4 text-orange-600" />
              业主群分享文案卡片
            </div>
            <p className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-orange-200/80 leading-relaxed font-sans select-all">
              【{groupBuy.communityName}擦玻璃拼团】邻居们好！我家刚才预约了物业推荐的擦玻璃，已有{groupBuy.joinedHouseholds}户加入，还差{groupBuy.nextTierHouseholds - groupBuy.joinedHouseholds}户就能享受95折！统一排班上门，快来一起约~
            </p>
            <button
              id="copy-share-text-btn"
              onClick={handleCopyShareText}
              className="mt-2.5 w-full h-10 bg-white hover:bg-stone-100 border border-orange-300 text-orange-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  已复制文案，可直接去微信群粘贴
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-orange-500" />
                  一键复制邀请文案（发业主群）
                </>
              )}
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex gap-3">
          <button
            id="join-groupbuy-now-btn"
            onClick={() => {
              onJoinGroupBuy();
              onClose();
            }}
            className="w-full h-14 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xl rounded-2xl flex items-center justify-center gap-2 shadow-md"
          >
            <span>立即参加一起预约</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>
  );
};
