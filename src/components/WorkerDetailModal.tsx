import React from 'react';
import { WorkerInfo } from '../types';
import { ShieldCheck, HeartPulse, FileBadge, Award, Star, CheckCircle2, Phone, X, UserCheck, Shield } from 'lucide-react';

interface WorkerDetailModalProps {
  worker: WorkerInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectWorker?: (worker: WorkerInfo) => void;
  onCallWorker?: (worker: WorkerInfo) => void;
}

export const WorkerDetailModal: React.FC<WorkerDetailModalProps> = ({
  worker,
  isOpen,
  onClose,
  onSelectWorker,
  onCallWorker,
}) => {
  if (!isOpen || !worker) return null;

  return (
    <div id="worker-detail-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="worker-detail-modal-card" className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-stone-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 pt-6 pb-8 text-white relative">
          <button
            id="close-worker-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/20"
            aria-label="关闭详情"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                已认证
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="worker-modal-name" className="text-2xl font-bold text-white">
                  {worker.name}
                </h3>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {worker.gender}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-amber-100 text-sm">
                <div className="flex text-amber-300">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                </div>
                <span className="font-bold text-white text-base">{worker.rating} 分</span>
                <span className="mx-1 opacity-60">|</span>
                <span>已服务 <strong className="text-white font-bold">{worker.servedHouseholds}</strong> 户</span>
              </div>
              <p className="text-xs text-orange-100 mt-1">家政从业经验：{worker.experienceYears} 年</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 -mt-4 bg-white rounded-t-3xl flex-1">
          
          {/* Trust Certifications Banner - High Trust */}
          <div className="bg-orange-50 border border-orange-200/80 rounded-2xl p-4">
            <h4 className="text-sm font-bold text-orange-950 flex items-center gap-1.5 mb-3">
              <ShieldCheck className="w-5 h-5 text-orange-600" />
              平台五重安全与健康核验
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-orange-100">
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-stone-800">实名身份核验</div>
                  <div className="text-emerald-700 font-medium text-[11px]">公安数据库比对通过</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-orange-100">
                <HeartPulse className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-stone-800">持健康证明</div>
                  <div className="text-emerald-700 font-medium text-[11px]">年度体检合规</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-orange-100">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold text-stone-800">商业家政险</div>
                  <div className="text-blue-700 font-medium text-[11px]">百万雇主/人身险</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-orange-100">
                <Award className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <div className="font-bold text-stone-800">技能专业认证</div>
                  <div className="text-purple-700 font-medium text-[11px]">考核评级A+</div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Skills */}
          <div>
            <h4 className="text-sm font-bold text-stone-700 mb-2">擅长项目</h4>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-stone-100 text-stone-800 text-sm font-medium px-3 py-1.5 rounded-full border border-stone-200/80"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-sm font-bold text-stone-700 mb-1.5">师傅简介</h4>
            <p className="text-stone-600 text-base leading-relaxed bg-stone-50 p-3.5 rounded-2xl border border-stone-200/60">
              {worker.bio}
            </p>
          </div>

          {/* Neighbor Reviews Highlights */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-stone-700">东达景苑邻里真实评价</h4>
              <span className="text-xs text-orange-600 font-medium">好评率 99.2%</span>
            </div>
            <div className="space-y-2">
              <div className="bg-stone-50 p-3 rounded-2xl text-xs text-stone-600 border border-stone-200/50">
                <div className="flex items-center justify-between text-stone-700 font-bold mb-1">
                  <span>东达景苑 5号楼李阿姨</span>
                  <span className="text-amber-500">★★★★★ 5.0</span>
                </div>
                <p>“王师傅擦窗真是一绝，外立面大窗户够不着的地方用专业伸缩杆刮得透亮，连窗槽老灰尘都用小刷子吸干净了，特别规矩有礼貌！”</p>
              </div>
              <div className="bg-stone-50 p-3 rounded-2xl text-xs text-stone-600 border border-stone-200/50">
                <div className="flex items-center justify-between text-stone-700 font-bold mb-1">
                  <span>东达景苑 2号楼张叔叔</span>
                  <span className="text-amber-500">★★★★★ 5.0</span>
                </div>
                <p>“给老人做服务非常有耐心，进门套好鞋套，自带垃圾袋把脏水全带走了，物业推荐的确实放心。”</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex gap-3">
          {onCallWorker && (
            <button
              id="call-worker-direct-btn"
              onClick={() => onCallWorker(worker)}
              className="flex-1 h-13 bg-white hover:bg-stone-100 active:bg-stone-200 border-2 border-orange-500 text-orange-600 font-bold text-base rounded-2xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              电话沟通
            </button>
          )}
          
          <button
            id="confirm-worker-select-btn"
            onClick={() => {
              if (onSelectWorker) onSelectWorker(worker);
              onClose();
            }}
            className="flex-1 h-13 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-md"
          >
            <CheckCircle2 className="w-5 h-5" />
            指定该师傅上门
          </button>
        </div>

      </div>
    </div>
  );
};
