import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function Header({ onOpenSettings }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center py-4 px-4 sm:px-8 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-500 tracking-tight">
          FocusFlow
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Nút mở Cài đặt */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all font-medium text-sm flex items-center gap-1"
          title="Cài đặt"
        >
          ⚙️ <span className="hidden sm:inline">Cài đặt</span>
        </button>

        {/* Nút đổi Theme */}
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all font-medium text-sm flex items-center gap-2"
        >
          {theme === 'dark' ? '☀️️' : '🌙'} <span className="hidden sm:inline">{theme === 'dark' ? 'Sáng' : 'Tối'}</span>
        </button>
      </div>
    </header>
  );
}