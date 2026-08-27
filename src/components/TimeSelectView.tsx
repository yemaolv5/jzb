import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Phone, ArrowRight, Info } from 'lucide-react';

interface TimeSelectViewProps {
  selectedTime: string;
  isLargeFont: boolean;
  onBack: () => void;
  onSelectTime: (timeStr: string) => void;
  onProceedToConfirm: () => void;
  onCallHelp: () => void;
}

export const TimeSelectView: React.FC<TimeSelectViewProps> = ({
  selectedTime,
  isLargeFont,
  onBack,
  onSelectTime,
  onProceedToConfirm,
  onCallHelp,
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customDate, setCustomDate] = useState('2026-10-29');
  const [customSlot, setCustomSlot] = useState('上午 (09:00 - 11:30)');

  // Quick options matching the prompt specifications
  const QUICK_OPTIONS = [
    { id: 'today_pm', label: '今天下午', sub: '14:00 - 17:00' },
    { id: 'tomorrow_am', label: '明天上午', sub: '09:00 - 11:30' },
    { id: 'tomorrow_pm', label: '明天下午', sub: '14:00 - 17:00' },
    { id: 'custom', label: '其他时间', sub: '自定义选择日期' },
  ];

  const handleSelectQuick = (opt: typeof QUICK_OPTIONS[0]) => {
    if (opt.id === 'custom') {
      setIsCustomMode(true);
      onSelectTime(`${customDate} ${customSlot}`);
    } else {
      setIsCustomMode(false);
      onSelectTime(`${opt.label} (${opt.sub})`);
    }
  };

  const handleCustomChange = (date: string, slot: string) => {
    setCustomDate(date);
    setCustomSlot(slot);
    onSelectTime(`${date} ${slot}`);
  };

  return (
    <div id="page-time-select" className="min-h-full bg-stone-50 text-stone-800 flex flex-col animate-in fade-in pb-24">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3.5 flex items-center justify-between">
        <button
          id="time-back-btn"
          onClick={onBack}
          className="flex items-center gap-1 text-stone-700 hover:text-orange-600 font-bold p-1 rounded-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-base">上一步</span>
        </button>
        <h2 className="font-bold text-lg text-stone-900">
          选择预约上门时间
        </h2>
        <button
          onClick={onCallHelp}
          className="text-orange-600 font-bold text-xs flex items-center gap-1 bg-orange-50 px-2.5 py-1.5 rounded-full border border-orange-200"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>客服</span>
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* Step Indicator */}
        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100 flex items-center justify-between text-xs font-bold text-orange-950">
          <span>第 3 / 4 步：选择期望时间</span>
          <span className="text-orange-700">大按钮快捷点选</span>
        </div>

        {/* 4 Big Quick Option Buttons */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-stone-700 px-1">
            推荐快捷时间（点击直接选定）：
          </label>

          <div className="grid grid-cols-1 gap-3">
            {QUICK_OPTIONS.map((opt) => {
              const isSelected = !isCustomMode
                ? selectedTime.includes(opt.label)
                : opt.id === 'custom';

              return (
                <button
                  key={opt.id}
                  id={`quick-time-btn-${opt.id}`}
                  type="button"
                  onClick={() => handleSelectQuick(opt)}
                  className={`w-full p-4.5 rounded-3xl border-2 transition-all flex items-center justify-between text-left shadow-xs ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold ring-2 ring-orange-400/20'
                      : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isSelected ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {opt.id === 'custom' ? (
                        <Calendar className="w-6 h-6" />
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className={`font-black ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>
                        {opt.label}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5 font-medium">
                        {opt.sub}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Date & Slot Selection Panel (if selected other time) */}
        {isCustomMode && (
          <div className="bg-white rounded-3xl p-5 border-2 border-orange-300 shadow-sm space-y-4 animate-in fade-in">
            <h4 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              选择其他日期与时间段
            </h4>

            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">
                上门日期
              </label>
              <input
                id="custom-date-input"
                type="date"
                value={customDate}
                min="2026-10-28"
                max="2026-12-31"
                onChange={(e) => handleCustomChange(e.target.value, customSlot)}
                className="w-full h-12 px-4 border border-stone-300 rounded-2xl text-base font-bold text-stone-800 bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">
                时间段
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {['上午 (09:00 - 11:30)', '下午 (14:00 - 17:00)'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleCustomChange(customDate, slot)}
                    className={`p-3 rounded-2xl text-sm font-bold border transition-all ${
                      customSlot === slot
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-stone-200 bg-stone-50 text-stone-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 辅助提示 (Required per spec) */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-950">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">温馨提示</h4>
            <p className="text-xs leading-relaxed mt-0.5 text-amber-900">
              具体上门时间由服务人员在接单后提前与您电话联系确认，请保持电话畅通。
            </p>
          </div>
        </div>

      </div>

      {/* Fixed Bottom Next Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 p-4 shadow-xl z-40">
        <button
          id="proceed-to-confirm-btn"
          onClick={onProceedToConfirm}
          className={`w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all ${
            isLargeFont ? 'h-14 text-2xl' : 'h-13 text-xl'
          }`}
        >
          <span>下一步：确认订单信息</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};
