import { handleZero } from "@/helpers/handleZero";

export const findTime = (): string => {
  const month = handleZero(new Date().getMonth() + 1);
  const day = handleZero(new Date().getDate());
  const hours = handleZero(new Date().getHours());

  return month + "-" + day + " " + hours + ":00:00";
};
