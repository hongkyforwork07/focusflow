import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { generateId } from '../utils/id';

export function useSessions() {
  const [sessions, setSessions] = useLocalStorage(STORAGE_KEYS.SESSIONS, []);

  const addSession = ({ taskId, taskTitle, mode, durationSeconds, completed }) => {
    const newSession = {
      id: generateId(),
      taskId: taskId || null,
      taskTitleSnapshot: taskTitle || "Phiên tự do", // Lưu lại tên phòng khi task bị xóa
      mode,
      durationSeconds,
      startedAt: new Date(Date.now() - durationSeconds * 1000).toISOString(),
      endedAt: new Date().toISOString(),
      completed
    };
    setSessions(prev => [newSession, ...prev]);
  };

  return { sessions, addSession };
}