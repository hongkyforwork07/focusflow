import React from 'react';
import { useTimer } from '../../features/timer/useTimer';
import { formatTime } from '../../utils/formatTime';

export default function Timer({ durationSeconds, onComplete }) {
  const { status, remainingSeconds, duration, mode, start, pause, reset, switchMode } = useTimer(durationSeconds);

  // Kích hoạt ghi nhận khi hoàn thành phiên
  React.useEffect(() => {
    if (status === 'completed') {
      onComplete(duration, mode); 
    }
  }, [status]);

  const isRunning = status === 'running';
  const isCompleted = status === 'completed';

  // Tính toán phần trăm tiến độ (từ 0 đến 1)
  const progress = duration > 0 ? 1 - (remainingSeconds / duration) : 0;
  
  // Xác định giai đoạn của cây dựa trên %
  let treeEmoji = "🌱"; // Hạt giống (dưới 30%)
  if (isCompleted) {
    treeEmoji = "🌳"; // Trưởng thành
  } else if (progress > 0.7) {
    treeEmoji = "🌲"; // Cây lớn (trên 70%)
  } else if (progress > 0.3) {
    treeEmoji = "🌿"; // Cây non (trên 30%)
  }

  // Nếu tạm dừng, đổi cây thành héo úa
  if (status === 'paused') treeEmoji = "🥀"; 
  // ----------------------------------------------------------------

  // Định nghĩa các chế độ thời gian (tính bằng giây)
  const modes = [
    { id: 'focus', label: 'Tập trung', duration: durationSeconds },
    { id: 'shortBreak', label: 'Nghỉ ngắn', duration: 5 * 60 },
    { id: 'longBreak', label: 'Nghỉ dài', duration: 15 * 60 },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 max-w-md mx-auto w-full transition-all">
      
      {/* Thanh chọn chế độ trực tiếp */}
      <div className="flex gap-1.5 mb-6 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl w-full max-w-xs">
        {modes.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => switchMode(m.id, m.duration)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive 
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* --- HIỂN THỊ CÂY TRỒNG --- */}
      <div className="text-6xl mb-4 animate-bounce-slow transition-all duration-500 hover:scale-110 cursor-default" title="Trồng một cái cây bằng cách tập trung">
        {mode === 'focus' ? treeEmoji : '☕'} {/* Nếu chế độ nghỉ, hiển thị cốc cà phê */}
      </div>
      {/* --------------------------------------------------- */}

      {/* Mặt đồng hồ */}
      <div className={`text-6xl sm:text-7xl font-bold font-mono tabular-nums tracking-tight mb-6 transition-colors ${
        isCompleted ? 'text-green-500' : 'text-slate-800 dark:text-slate-100'
      }`}>
        {formatTime(remainingSeconds)}
      </div>

      {/* Trạng thái chữ */}
      <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium text-sm h-6">
        {status === 'idle' && (mode === 'focus' ? 'Sẵn sàng tập trung cao độ!' : 'Đã đến giờ nghỉ ngơi thư giãn.')}
        {status === 'running' && (mode === 'focus' ? 'Đang trong phiên làm việc...' : 'Đang trong thời gian nghỉ...')}
        {status === 'paused' && 'Đã tạm dừng.'}
        {status === 'completed' && 'Hoàn thành phiên!'}
      </p>

      {/* Các nút điều khiển */}
      <div className="flex items-center gap-3 w-full">
        {!isRunning ? (
          <button 
            onClick={start}
            disabled={isCompleted}
            className="flex-1 py-3.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 text-base"
          >
            BẮT ĐẦU
          </button>
        ) : (
          <button 
            onClick={pause}
            className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 text-base"
          >
            TẠM DỪNG
          </button>
        )}
        
        {/* Nút Reset / Làm mới */}
        {(status === 'paused' || status === 'completed' || status === 'running') && (
          <button 
            onClick={reset}
            className="p-3.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold rounded-xl transition-all active:scale-95"
            title="Làm mới thời gian"
          >
            🔄
          </button>
        )}
      </div>
    </div>
  );
}