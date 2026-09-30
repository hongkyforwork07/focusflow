export function getDailyStats(sessions, tasks) {
  const today = new Date().toDateString();

  // 1. Lọc các phiên Pomodoro (focus) đã hoàn thành trong ngày hôm nay
  const todaySessions = sessions.filter(
    session => 
      new Date(session.endedAt).toDateString() === today && 
      session.completed && 
      session.mode === 'focus'
  );

  // 2. Tính số lượng Pomodoro và tổng số phút
  const pomodorosToday = todaySessions.length;
  const focusSecondsToday = todaySessions.reduce((total, session) => total + session.durationSeconds, 0);
  const focusMinutesToday = Math.floor(focusSecondsToday / 60);

  // 3. Tính tỷ lệ hoàn thành Task
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;

  return {
    pomodorosToday,
    focusMinutesToday,
    completedTasks,
    totalTasks
  };
}