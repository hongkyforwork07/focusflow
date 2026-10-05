import React from 'react';
import { useTimer } from '../../features/timer/useTimer';
import { formatTime } from '../../utils/formatTime';

export default function Timer({ durationSeconds, onComplete }) {
  const { status, remainingSeconds, duration, mode, start, pause, reset } = useTimer(durationSeconds);

  // Session Complete
  React.useEffect(() => {
    if (status === 'completed') {
      onComplete(duration, mode); 
    }
  }, [status]);

  const isRunning = status === 'running';
  const isCompleted = status === 'completed';

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 max-w-md mx-auto w-full">
      <div className="flex gap-2 mb-8 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
        <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm">
          Tập trung
        </button>
      </div>

      <div className={`text-7xl sm:text-8xl font-bold font-mono tabular-nums tracking-tight mb-8 transition-colors ${
        isCompleted ? 'text-green-500' : 'text-slate-800 dark:text-slate-100'
      }`}>
        {formatTime(remainingSeconds)}
      </div>

      <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium h-6">
        {status === 'idle' && 'Sẵn sàng bắt đầu!'}
        {status === 'running' && 'Đang tập trung cao độ...'}
        {status === 'paused' && 'Đã tạm dừng.'}
        {status === 'completed' && 'Hoàn thành phiên!'}
      </p>

      <div className="flex items-center gap-4 w-full">
        {!isRunning ? (
          <button 
            onClick={start}
            disabled={isCompleted}
            className="flex-1 py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 text-lg"
          >
            BẮT ĐẦU
          </button>
        ) : (
          <button 
            onClick={pause}
            className="flex-1 py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 text-lg"
          >
            TẠM DỪNG
          </button>
        )}
        
        {(status === 'paused' || status === 'completed') && (
          <button 
            onClick={reset}
            className="p-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-all"
            title="Làm mới lại đồng hồ"
          >
            🔄
          </button>
        )}
      </div>
    </div>
  );
}