import React from 'react';
import { getDailyStats } from '../../features/statistics/statsService';

export default function StatsCards({ sessions, tasks }) {
  const stats = getDailyStats(sessions, tasks);

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
        <div className="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-400">
          {stats.focusMinutesToday}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-1">Phút tập trung</div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
        <div className="text-xl sm:text-2xl font-bold text-amber-500">
          {stats.pomodorosToday}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-1">Pomodoro</div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
        <div className="text-xl sm:text-2xl font-bold text-green-500">
          {stats.completedTasks}/{stats.totalTasks}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-1">Task hoàn thành</div>
      </div>
    </div>
  );
}