import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, X, UserCheck, ShieldCheck, Clock } from 'lucide-react';
import { HOTLINE_NUMBER } from '../mockData';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName?: string;
  targetRole?: string;
  phoneNumber?: string;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  targetName = '小钥匙物业官方客服',
  targetRole = '社区24小时人工协助',
  phoneNumber = HOTLINE_NUMBER,
}) => {
  const [callState, setCallState] = useState<'dialing' | 'connected' | 'ended'>('dialing');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isOpen) {
      setCallState('dialing');
      setTimer(0);
      const dialTimer = setTimeout(() => {
        setCallState('connected');
      }, 1500);

      return () => clearTimeout(dialTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: any;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div id="call-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="call-modal-card" className="w-full max-w-sm bg-stone-900 text-white rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center relative border border-stone-800">
        
        {/* Top Close Button for ease */}
        <button
          id="close-call-btn"
          onClick={handleEndCall}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full bg-stone-800/80"
          aria-label="关闭通话"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 rounded-full bg-orange-600/20 border-2 border-orange-500/40 flex items-center justify-center mb-4 mt-2">
          {callState === 'dialing' ? (
            <PhoneCall className="w-10 h-10 text-orange-400 animate-bounce" />
          ) : (
            <Phone className="w-10 h-10 text-emerald-400" />
          )}
        </div>

        <h3 id="call-target-name" className="text-2xl font-bold tracking-tight text-white mb-1">
          {targetName}
        </h3>
        
        <p id="call-target-role" className="text-stone-300 text-base mb-2">
          {targetRole}
        </p>

        <div id="call-phone-number" className="inline-block bg-stone-800/90 text-orange-400 font-mono text-xl font-bold px-4 py-1.5 rounded-full mb-3 tracking-wider">
          {phoneNumber}
        </div>

        {callState === 'dialing' && (
          <div className="flex items-center text-stone-300 text-base py-2">
            <span className="inline-block w-2.5 h-2.5 bg-orange-500 rounded-full mr-2 animate-ping" />
            正在呼叫，请稍候...
          </div>
        )}

        {callState === 'connected' && (
          <div className="w-full bg-stone-800/70 rounded-2xl p-4 my-2 border border-stone-700/60 text-left text-sm">
            <div className="flex items-center justify-between text-emerald-400 font-semibold mb-2">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                通话中
              </span>
              <span className="font-mono text-base">{formatTime(timer)}</span>
            </div>
            <p className="text-stone-200 text-base leading-relaxed">
              “您好！这里是为您服务家政帮客服专线。请问您需要帮您预约擦玻璃、保洁，还是咨询物业100元优惠券呢？”
            </p>
            <div className="mt-3 pt-2 border-t border-stone-700/80 flex items-center text-xs text-stone-400 gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
              <span>本通话由东达景苑物业全程录音保障</span>
            </div>
          </div>
        )}

        {callState === 'ended' && (
          <div className="text-stone-400 py-3 text-lg font-medium">
            通话已结束
          </div>
        )}

        <div className="w-full mt-4 flex flex-col gap-2">
          <button
            id="end-call-action-btn"
            onClick={handleEndCall}
            className="w-full h-14 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <Phone className="w-6 h-6 rotate-[135deg]" />
            挂断电话
          </button>
        </div>

      </div>
    </div>
  );
};
