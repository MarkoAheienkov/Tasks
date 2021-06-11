import addZero from "./addZero";

const dateToTime = (dateStr) => {
  const  date = new Date(dateStr);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  return `${hours}:${minutes}`;
};

export default dateToTime;
