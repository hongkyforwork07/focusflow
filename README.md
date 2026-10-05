# FocusFlow - Pomodoro Task Manager 🍅

![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**FocusFlow** là một ứng dụng quản lý thời gian theo phương pháp Pomodoro kết hợp với quản lý danh sách công việc (Task Manager). Ứng dụng được thiết kế theo kiến trúc SPA (Single Page Application) với giao diện tối giản, tích hợp hệ thống lưu trữ bền vững và thuật toán đồng hồ chống sai lệch thời gian.

---

## 🚀 Tính năng nổi bật (Core Features)

- **Anti-Drift Timer Algorithm:** Thuật toán đồng hồ đếm ngược sử dụng mốc thời gian tuyệt đối (`Date.now() + duration`). Khắc phục triệt để tình trạng sai lệch thời gian hoặc đồng hồ bị dừng khi trình duyệt rơi vào trạng thái ngủ đông (Background Tab Throttling).
- **Task Management Integration:** Cho phép quản lý công việc (CRUD) và gắn trực tiếp một công việc vào phiên Pomodoro. Tự động cộng dồn số phiên tập trung (🍅) cho từng công việc.
- **State Machine Architecture:** Bộ máy Timer được quản lý chặt chẽ bằng `useReducer`, kiểm soát các vòng đời trạng thái an toàn (`idle` $\rightarrow$ `running` $\rightarrow$ `paused` $\rightarrow$ `completed`).
- **Data Persistence:** Toàn bộ dữ liệu (Tasks, Sessions, Settings) được đồng bộ hóa thời gian thực xuống `localStorage` qua Custom Hook bọc `try/catch`, đảm bảo an toàn dữ liệu ngay cả khi ứng dụng bị ngắt đột ngột.
- **Native Web Audio API:** Hệ thống thông báo âm thanh sử dụng bộ dao động sóng (Oscillator) tích hợp sẵn của trình duyệt, không phụ thuộc vào các tệp tin media vật lý bên ngoài.
- **Dynamic Theming:** Hỗ trợ chuyển đổi mượt mà giữa chế độ Sáng/Tối (Light/Dark mode) và lưu tùy chọn của người dùng.

---

## 🛠 Công nghệ sử dụng (Tech Stack)

- **Core:** React.js, Vite
- **Styling:** Tailwind CSS (v4)
- **State Management:** React Hooks (`useState`, `useReducer`, Custom Hooks)
- **Deployment:** GitHub Pages (`gh-pages`)

---

## 📁 Cấu trúc thư mục (Folder Structure)

Dự án áp dụng kiến trúc Modular, tách biệt rõ ràng giữa UI, Logic và Storage:

```text
focusflow/
├── src/
│   ├── components/      # Các UI Component độc lập (Timer, TaskList, StatsCards, Modal)
│   ├── features/        # Business logic phân chia theo tính năng (timerReducer, statsService)
│   ├── hooks/           # Các Custom Hooks xử lý logic state (useTasks, useSessions, useLocalStorage)
│   ├── storage/         # Tầng giao tiếp với cơ sở dữ liệu trình duyệt (Storage Keys, Reset Service)
│   ├── utils/           # Các hàm tiện ích hỗ trợ (formatTime, id generator, sound API)
│   ├── App.jsx          # Entry point điều phối dữ liệu và Layout chính
│   └── main.jsx         # DOM rendering