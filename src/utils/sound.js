export function playAlarmSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Tạo âm thanh nốt nhạc thông báo dễ chịu
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // Nốt D5
    
    // Điều chỉnh âm lượng nhỏ lại để không bị giật mình
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5); // Kéo dài 0.5 giây
  } catch (error) {
    console.error("Trình duyệt chặn phát âm thanh tự động:", error);
  }
}