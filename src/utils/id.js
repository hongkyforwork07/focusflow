// Dùng API có sẵn của trình duyệt để tạo chuỗi ID ngẫu nhiên
export function generateId() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10);
}