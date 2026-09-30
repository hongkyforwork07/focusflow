import { STORAGE_KEYS } from './storageKeys';

export function resetAppData() {
  try {
    // Xóa tất cả các key thuộc ứng dụng FocusFlow dựa trên STORAGE_KEYS
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Hoặc bạn có thể dùng localStorage.clear() nếu muốn xóa toàn bộ ổ cứng trình duyệt của trang web
    // localStorage.clear();

    // Tải lại trang để các Hook React tự động nạp lại giá trị khởi tạo rỗng
    window.location.reload();
  } catch (error) {
    console.error("Lỗi khi reset dữ liệu:", error);
  }
}