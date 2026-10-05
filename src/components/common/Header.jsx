import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function Header({ onOpenSettings, level, expProgress }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center py-4 px-4 sm:px-8 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-500 tracking-tight">
          FocusFlow
        </h1>
        
        {/* Hệ thống Gamification: Huy hiệu và Thanh EXP */}
        {level !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded">
              Lv.{level}
            </span>
            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-500 ease-out"
                style={{ width: `${expProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <button onClick={onOpenSettings} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all font-medium text-sm flex items-center gap-1">
          ⚙️ <span className="hidden sm:inline">Cài đặt</span>
        </button>
        <button onClick={toggleTheme} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all font-medium text-sm flex items-center gap-2">
          {theme === 'dark' ? '☀' : '🌙'} <span className="hidden sm:inline">{theme === 'dark' ? 'Sáng' : 'Tối'}</span>
        </button>
      </div>
    </header>
  );
}