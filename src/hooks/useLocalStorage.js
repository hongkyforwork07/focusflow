import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. Đọc dữ liệu 1 lần khi khởi tạo
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // 2. Parse JSON an toàn, nếu có thì trả về, không thì dùng initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 5. Fallback nếu JSON bị hỏng
      console.error(`Lỗi đọc localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 4. Hàm setValue mới: Cập nhật state VÀ lưu xuống localStorage
  const setValue = (value) => {
    try {
      // Cho phép truyền vào function giống như useState gốc
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Ghi xuống localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Lỗi lưu localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}