import React, { useState } from 'react';
import { resetAppData } from '../../storage/storageService';

export default function SettingsModal({ isOpen, onClose, focusDuration, onSaveDuration }) {
  const [minutes, setMinutes] = useState(focusDuration / 60); // Đổi từ giây ra phút để người dùng dễ nhìn
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const newSeconds = Math.max(1, parseInt(minutes) || 25) * 60; // Tối thiểu 1 phút
    onSaveDuration(newSeconds);
    onClose();
  };

  const handleResetClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 4000);
    } else {
      resetAppData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-slate-700">
        
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            ⚙️ Cài đặt thời gian
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1">✕</button>
        </div>

        {/* Time Configuring */}
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Thời gian tập trung (Phút)
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
            />
            <p className="text-xs text-slate-500 mt-1">Mặc định: 25 phút. Thay đổi sẽ áp dụng ngay cho phiên tiếp theo.</p>
          </div>

          {/* Reset Data */}
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl">
            <h3 className="text-red-600 dark:text-red-400 font-bold text-sm mb-1">Vùng nguy hiểm</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-3">Xóa sạch toàn bộ task và lịch sử pomodoro.</p>
            <button
              type="button"
              onClick={handleResetClick}
              className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                isConfirming ? 'bg-red-600 text-white animate-pulse' : 'bg-white dark:bg-slate-800 border border-red-300 text-red-600'
              }`}
            >
              {isConfirming ? '⚠️ Bấm lần nữa để xác nhận XÓA!' : '🗑️ Reset toàn bộ dữ liệu'}
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-semibold">
              Lưu thay đổi
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}