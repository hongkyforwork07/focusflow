import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { generateId } from '../utils/id';

export function useTasks() {
  // Đổi useState thành useLocalStorage, truyền vào KEY và mảng rỗng mặc định
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.TASKS, []);

  const addTask = (title, priority = 'medium') => {
    if (!title.trim()) return;
    const newTask = {
      id: generateId(),
      title: title.trim(),
      status: "todo",
      priority,
      completedPomodoros: 0,
      totalFocusedSeconds: 0,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTaskDone = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'done' ? 'todo' : 'done' } 
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const incrementTaskProgress = (id, durationSeconds) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: task.status === 'todo' ? 'in-progress' : task.status,
            completedPomodoros: (task.completedPomodoros || 0) + 1,
            totalFocusedSeconds: (task.totalFocusedSeconds || 0) + durationSeconds
          } 
        : task
    ));
  };

  // Đừng quên export hàm này ở dòng return cuối cùng:
  return { tasks, addTask, toggleTaskDone, deleteTask, incrementTaskProgress };

}