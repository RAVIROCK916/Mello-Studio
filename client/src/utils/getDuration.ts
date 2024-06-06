export const getDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secondsLeft}`;
};
