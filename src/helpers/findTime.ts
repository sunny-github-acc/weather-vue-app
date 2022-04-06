export const findTime = (): string => {
  const handleZero = (time: number) => (time < 10 ? "0" + time : time);

  const month = handleZero(new Date().getMonth() + 1);
  const day = handleZero(new Date().getDate());
  const hours = handleZero(new Date().getHours());

  return month + "-" + day + " " + hours + ":00:00";
};
