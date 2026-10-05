import { useLocalStorage } from './useLocalStorage';

export function useGamification() {
  // Mặc định người dùng bắt đầu ở Cấp 1, 0 EXP
  const [exp, setExp] = useLocalStorage('ff:exp', 0);
  const [level, setLevel] = useLocalStorage('ff:level', 1);

  const gainExp = (amount) => {
    setExp((prevExp) => {
      const newExp = prevExp + amount;
      // Công thức: Cứ 100 EXP thì lên 1 cấp (Level)
      const newLevel = Math.floor(newExp / 100) + 1;
      
      if (newLevel > level) {
        setLevel(newLevel);
        // Tương lai bạn có thể thêm âm thanh hoặc hiệu ứng pháo hoa khi lên cấp ở đây
      }
      return newExp;
    });
  };

  // Tính toán % để vẽ thanh tiến trình kinh nghiệm
  const expProgress = (exp % 100); 

  return { exp, level, expProgress, gainExp };
}