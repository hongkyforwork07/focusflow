import { useReducer, useEffect } from 'react';
import { timerReducer, initialTimerState } from './timerReducer';

export function useTimer() {
  const [state, dispatch] = useReducer(timerReducer, initialTimerState);

  // Vòng lặp tick mỗi 500ms (thay vì 1s để phản hồi UI nhạy hơn và tránh trôi mili-giây)
  useEffect(() => {
    let intervalId;
    if (state.status === 'running') {
      intervalId = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 500);
    }
    // Cleanup function: Tự động xóa interval khi dừng hoặc unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.status]);

  const start = () => dispatch({ type: 'START' });
  const pause = () => dispatch({ type: 'PAUSE' });
  const reset = () => dispatch({ type: 'RESET' });

  return { 
    ...state, 
    start, 
    pause, 
    reset 
  };
}