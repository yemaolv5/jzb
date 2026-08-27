import React, { useState } from 'react';
import { OrderItem, OrderReview } from '../types';
import { Smile, Meh, Frown, CheckCircle2, Phone, X, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';

interface ReviewModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (orderId: string, review: OrderReview) => void;
  onCallHelp: () => void;
}

const REVIEW_TAGS = [
  '干得干净',
  '服务态度好',
  '准时上门',
  '工具专业',
  '沟通顺畅',
  '收拾利索',
  '着装规范',
  '没有额外收费',
];

export const ReviewModal: React.FC<ReviewModalProps> = ({
  order,
  isOpen,
  onClose,
  onSubmitReview,
  onCallHelp,
}) => {
  const [satisfaction, setSatisfaction] = useState<'satisfied' | 'neutral' | 'unsatisfied'>('satisfied');
  const [selectedTags, setSelectedTags] = useState<string[]>(['干得干净', '服务态度好']);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const review: OrderReview = {
        satisfaction,
        tags: selectedTags,
        comment: comment.trim(),
        createdAt: new Date().toLocaleDateString('zh-CN'),
      };
      onSubmitReview(order.id, review);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div id="review-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div id="review-modal-card" className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-orange-50 border-b border-orange-100 p-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-stone-900">服务评价</h3>
            <p className="text-sm text-stone-600 mt-0.5">
              {order.serviceName} · {order.worker?.name || '平台认证服务师傅'}
            </p>
          </div>
          <button
            id="close-review-modal-btn"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-stone-800">
          
          {/* Step 1: Big satisfaction buttons */}
          <div>
            <label className="block text-base font-bold text-stone-900 mb-3 text-center">
              第1步：这次服务您满意吗？
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* Satisfied */}
              <button
                id="review-btn-satisfied"
                type="button"
                onClick={() => setSatisfaction('satisfied')}
                className={`py-4 px-2 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                  satisfaction === 'satisfied'
                    ? 'border-orange-500 bg-orange-50/80 text-orange-700 font-bold ring-2 ring-orange-400/30'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Smile className={`w-10 h-10 mb-1.5 ${satisfaction === 'satisfied' ? 'text-orange-500' : 'text-stone-400'}`} />
                <span className="text-lg">满意</span>
              </button>

              {/* Neutral */}
              <button
                id="review-btn-neutral"
                type="button"
                onClick={() => setSatisfaction('neutral')}
                className={`py-4 px-2 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                  satisfaction === 'neutral'
                    ? 'border-amber-500 bg-amber-50/80 text-amber-700 font-bold ring-2 ring-amber-400/30'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Meh className={`w-10 h-10 mb-1.5 ${satisfaction === 'neutral' ? 'text-amber-500' : 'text-stone-400'}`} />
                <span className="text-lg">一般</span>
              </button>

              {/* Unsatisfied */}
              <button
                id="review-btn-unsatisfied"
                type="button"
                onClick={() => setSatisfaction('unsatisfied')}
                className={`py-4 px-2 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                  satisfaction === 'unsatisfied'
                    ? 'border-red-500 bg-red-50/80 text-red-700 font-bold ring-2 ring-red-400/30'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Frown className={`w-10 h-10 mb-1.5 ${satisfaction === 'unsatisfied' ? 'text-red-500' : 'text-stone-400'}`} />
                <span className="text-lg">不满意</span>
              </button>
            </div>
          </div>

          {/* Unsatisfied Complaint Banner */}
          {satisfaction === 'unsatisfied' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm animate-in fade-in">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 text-base">非常抱歉给您带来不便！</h4>
                  <p className="text-red-700 mt-1 text-sm leading-relaxed">
                    东达景苑物业平台提供售后协调兜底保障，支持免费返工重擦或极速赔付。
                  </p>
                  <button
                    id="complaint-call-btn"
                    type="button"
                    onClick={onCallHelp}
                    className="mt-3 w-full h-11 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Phone className="w-4 h-4" />
                    立即联系客服协助
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Quick tags */}
          <div>
            <label className="block text-base font-bold text-stone-900 mb-2.5">
              第2步：请选择服务特点（可多选）
            </label>
            <div className="flex flex-wrap gap-2.5">
              {REVIEW_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`h-11 px-4 rounded-xl text-base font-medium transition-all ${
                      isSelected
                        ? 'bg-orange-600 text-white font-bold shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/80'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Optional Text Area */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-stone-500" />
              其他想对师傅或物业说的话（可选填）
            </label>
            <textarea
              id="review-comment-input"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="例如：师傅做事很细心，窗台边角都清理干净了..."
              className="w-full p-3.5 border border-stone-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500 bg-stone-50/50"
            />
          </div>

        </div>

        {/* Footer Submit */}
        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <button
            id="submit-review-btn"
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full h-14 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 text-white font-bold text-xl rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <CheckCircle2 className="w-6 h-6" />
            {isSubmitting ? '正在提交...' : '提交评价'}
          </button>
        </div>

      </div>
    </div>
  );
};
