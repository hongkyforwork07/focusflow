import React, { useState } from 'react';

export default function TaskList({ tasks, addTask, toggleTaskDone, deleteTask, selectedTaskId, onSelectTask }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue("");
  };

  const todoCount = tasks.filter(t => t.status !== 'done').length;

  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-700/60">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
          DANH SÁCH CÔNG VIỆC
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
          {todoCount} việc cần làm
        </span>
      </div>

      {/* Task Update */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Thêm việc mới cần làm..."
          className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shrink-0 active:scale-95"
        >
          Thêm
        </button>
      </form>

      {/* Task List */}
      <ul className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar max-h-[480px]">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`flex flex-col p-3.5 rounded-xl border transition-all ${
              selectedTaskId === task.id 
                ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-900/15 shadow-sm' 
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === 'done'}
                onChange={() => toggleTaskDone(task.id)}
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
              />
              
              <span className={`flex-1 text-sm font-medium ${task.status === 'done' ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                {task.title}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 p-1.5 rounded-lg transition-colors text-xs font-bold"
                title="Xóa công việc"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/50 pl-7">
              <span className="text-[11px] text-slate-500 font-medium">
                🍅 {task.completedPomodoros || 0} phiên
              </span>
              <button 
                onClick={() => onSelectTask(task.id)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  selectedTaskId === task.id 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {selectedTaskId === task.id ? 'Đang chọn' : 'Chọn tập trung'}
              </button>
            </div>
          </li>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            Chưa có công việc nào.<br/>Hãy thêm task mới để bắt đầu!
          </div>
        )}
      </ul>
    </div>
  );
}