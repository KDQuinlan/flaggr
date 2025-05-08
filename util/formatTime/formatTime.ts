const formatTime = (seconds: number, displayMs: boolean = false): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const secondsStr = displayMs
    ? remainingSeconds.toFixed(1)
    : Math.floor(remainingSeconds).toString();
  return `${minutes.toString().padStart(2, '0')}:${secondsStr.padStart(secondsStr.includes('.') ? 4 : 2, '0')}`;
};

export default formatTime;
