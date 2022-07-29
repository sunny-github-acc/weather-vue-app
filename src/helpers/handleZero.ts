export const handleZero = (time: number): string =>
  time < 10 ? "0" + time : time.toString();
