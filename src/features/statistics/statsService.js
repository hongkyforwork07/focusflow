export function getDailyStats(sessions, tasks) {
  const today = new Date().toDateString();

  // Task Filter
  const todaySessions = sessions.filter(
    session => 
      new Date(session.endedAt).toDateString() === today && 
      session.completed && 
      session.mode === 'focus'
  );

  // Calculate Statistics
  const pomodorosToday = todaySessions.length;
  const focusSecondsToday = todaySessions.reduce((total, session) => total + session.durationSeconds, 0);
  const focusMinutesToday = Math.floor(focusSecondsToday / 60);

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;

  return {
    pomodorosToday,
    focusMinutesToday,
    completedTasks,
    totalTasks
  };
}