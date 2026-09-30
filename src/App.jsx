import React, { useState } from 'react';
import Header from './components/common/Header';
import Timer from './components/timer/Timer';
import TaskList from './components/task/TaskList';
import StatsCards from './components/stats/StatsCards';
import SettingsModal from './components/settings/SettingsModal';

import { useTasks } from './hooks/useTasks';
import { useSessions } from './hooks/useSessions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { playAlarmSound } from './utils/sound';

export default function App() {
  const { tasks, addTask, toggleTaskDone, deleteTask, incrementTaskProgress } = useTasks();
  const { sessions, addSession } = useSessions();
  
  // State quản lý task đang được chọn làm mục tiêu cho Timer
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // State quản lý đóng/mở Modal Cài đặt
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // State quản lý thời gian tập trung tùy chỉnh (mặc định 25 phút = 1500 giây)
  const [customFocusSeconds, setCustomFocusSeconds] = useLocalStorage('ff:focusDuration', 1500);

  // Tìm task đang được chọn
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  // Xử lý an toàn khi xóa task: Nếu task đang chọn bị xóa thì gỡ khỏi Timer
  const handleDeleteTask = (id) => {
    deleteTask(id);
    if (selectedTaskId === id) {
      setSelectedTaskId(null);
    }
  };

  // Hàm xử lý khi Timer chạy hết thời gian
  const handleTimerComplete = (durationSeconds, mode) => {
    // Phát âm thanh báo hiệu
    playAlarmSound();

    // 1. Ghi lại lịch sử Session
    addSession({
      taskId: selectedTask?.id,
      taskTitle: selectedTask?.title,
      mode: mode,
      durationSeconds: durationSeconds,
      completed: true
    });

    // 2. Nếu đang ở mode 'focus' và có chọn Task, cộng pomodoro cho task đó
    if (selectedTask && mode === 'focus') {
      incrementTaskProgress(selectedTask.id, durationSeconds);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors flex flex-col">
      {/* Header điều hướng */}
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Nội dung chính */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* Lưới chia cột: Timer (7 phần) & TaskList (5 phần rộng rãi) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Cột trái: Thống kê & Timer */}
          <div className="lg:col-span-7 flex flex-col min-h-[400px]">
            {/* Thẻ thống kê nhanh */}
            <StatsCards sessions={sessions} tasks={tasks} />

            {/* Hiển thị mục tiêu task đang chọn */}
            <div className="mb-4 text-center">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Mục tiêu hiện tại: </span>
              <span className="text-brand-600 dark:text-brand-400 font-bold text-lg">
                {selectedTask ? selectedTask.title : "Phiên làm việc tự do (Chưa chọn task)"}
              </span>
            </div>
            
            {/* Đồng hồ Timer */}
            <Timer 
              durationSeconds={customFocusSeconds} 
              onComplete={handleTimerComplete} 
            />
          </div>

          {/* Cột phải: Danh sách công việc */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 flex flex-col min-h-[400px]">
            <TaskList 
              tasks={tasks}
              addTask={addTask}
              toggleTaskDone={toggleTaskDone}
              deleteTask={handleDeleteTask}
              selectedTaskId={selectedTaskId}
              onSelectTask={setSelectedTaskId}
            />
          </div>

        </div>
      </main>

      {/* Cửa sổ Cài đặt & Tùy chỉnh thời gian */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        focusDuration={customFocusSeconds}
        onSaveDuration={(newSeconds) => setCustomFocusSeconds(newSeconds)}
      />
    </div>
  );
}