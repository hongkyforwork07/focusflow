import { useReducer, useEffect } from 'react';
import { timerReducer, initialTimerState } from './timerReducer';

export function useTimer(customDuration = 1500) {
  const [state, dispatch] = useReducer(timerReducer, {
    ...initialTimerState,
    remainingSeconds: customDuration,
    duration: customDuration,
  });

  useEffect(() => {
    let intervalId;
    if (state.status === 'running') {
      intervalId = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.status]);

  const start = () => dispatch({ type: 'START' });
  const pause = () => dispatch({ type: 'PAUSE' });
  const reset = () => dispatch({ type: 'RESET' });
  
  // Hàm chuyển chế độ
  const switchMode = (mode, duration) => {
    dispatch({ type: 'SWITCH_MODE', payload: { mode, duration } });
  };

  return { 
    ...state, 
    start, 
    pause, 
    reset,
    switchMode 
  };
}