import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface VoiceAssistantBannerProps {
  currentText?: string;
  isLargeFont: boolean;
  onToggleLargeFont: () => void;
}

export const VoiceAssistantBanner: React.FC<VoiceAssistantBannerProps> = ({
  currentText = '为您服务家政帮，放心找服务，就在咱小区。您有100元物业家庭焕新优惠券，全屋擦玻璃只需支付50元。',
  isLargeFont,
  onToggleLargeFont,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('您的浏览器暂不支持语音播报功能');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9; // slightly slower for elderly
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-amber-100/90 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900 shrink-0">
      <div className="flex items-center gap-2">
        <button
          id="voice-read-btn"
          onClick={handleSpeak}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition-colors ${
            isPlaying ? 'bg-amber-500 text-white animate-pulse' : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'
          }`}
          title="点击语音朗读当前页面重点"
        >
          {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-orange-600" />}
          <span>{isPlaying ? '停止语音播报' : '🔊 语音读屏'}</span>
        </button>
        <span className="text-[11px] text-amber-800/80 hidden sm:inline">长辈关怀辅助模式</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          id="toggle-elder-font-btn"
          onClick={onToggleLargeFont}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${
            isLargeFont
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
              : 'bg-white text-stone-700 border-amber-300 hover:bg-amber-50'
          }`}
        >
          {isLargeFont ? '超大关怀字号：开' : '大字关怀模式'}
        </button>
      </div>
    </div>
  );
};
