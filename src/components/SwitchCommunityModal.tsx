import React from 'react';
import { COMMUNITIES } from '../mockData';
import { Building2, Check, X, MapPin } from 'lucide-react';

interface SwitchCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCommunity: string;
  onSelectCommunity: (name: string) => void;
}

export const SwitchCommunityModal: React.FC<SwitchCommunityModalProps> = ({
  isOpen,
  onClose,
  currentCommunity,
  onSelectCommunity,
}) => {
  if (!isOpen) return null;

  return (
    <div id="switch-community-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="switch-community-modal-card" className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col text-stone-800">
        
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-bold text-stone-900">切换服务小区</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-2.5 max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-stone-500 mb-2">
            优先展示已开通“为您服务家政帮”及物业焕新权益的试点小区：
          </p>

          {COMMUNITIES.map((name) => {
            const isCurrent = name === currentCommunity;
            return (
              <button
                key={name}
                onClick={() => {
                  onSelectCommunity(name);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all text-left ${
                  isCurrent
                    ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/60 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-5 h-5 ${isCurrent ? 'text-orange-600' : 'text-stone-400'}`} />
                  <div>
                    <div className="text-lg font-bold">{name}</div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {name === '东达景苑' ? '当前已绑定 3号楼2单元501 (100㎡)' : '支持家政保洁与焕新权益'}
                    </div>
                  </div>
                </div>
                {isCurrent && (
                  <span className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
          如需新增合作小区，可由小区业委会或物业联系小钥匙平台
        </div>

      </div>
    </div>
  );
};
