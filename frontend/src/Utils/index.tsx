const SECOND = 1000;
const MINUTE = SECOND * 60;
const TEN_MINUTE = MINUTE * 10;

export const TIME = {
  SECOND,
  MINUTE,
  TEN_MINUTE,
};

export function getTimeAfter(ms: number): Date {
  const date = new Date();
  date.setTime(date.getTime() + ms);
  return date;
}
