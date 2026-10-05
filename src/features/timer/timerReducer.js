export const initialTimerState = {
  mode: "focus", 
  status: "idle", 
  remainingSeconds: 1500, 
  duration: 1500, 
  endAt: null,
};

export function timerReducer(state, action) {
  const now = Date.now();
  
  switch (action.type) {
    case 'START':
      if (state.status === 'running') return state;
      return {
        ...state,
        status: 'running',
        endAt: now + state.remainingSeconds * 1000,
      };
      
    case 'PAUSE':
      if (state.status !== 'running') return state;
      return {
        ...state,
        status: 'paused',
        remainingSeconds: Math.max(0, Math.ceil((state.endAt - now) / 1000)),
        endAt: null,
      };
      
    case 'TICK':
      if (state.status !== 'running') return state;
      const remaining = Math.max(0, Math.ceil((state.endAt - now) / 1000));
      
      if (remaining <= 0) {
        return { ...state, status: 'completed', remainingSeconds: 0, endAt: null };
      }
      return { ...state, remainingSeconds: remaining };
      
    case 'RESET':
      return { 
        ...state, 
        status: 'idle', 
        remainingSeconds: state.duration, 
        endAt: null 
      };

    // Hành động chuyển đổi chế độ
    case 'SWITCH_MODE': {
      const newMode = action.payload.mode; 
      const newDuration = action.payload.duration; 
      return {
        ...state,
        mode: newMode,
        status: 'idle',
        remainingSeconds: newDuration,
        duration: newDuration,
        endAt: null,
      };
    }
      
    default:
      return state;
  }
}