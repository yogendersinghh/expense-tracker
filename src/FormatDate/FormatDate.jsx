const FormatDate = (prevDate) => {
  let date = new Date(prevDate);
  let day = `${date.getDate()}`;
  let month = `${date.getMonth() + 1}`;
  let year = date.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }
  return [year, month, day].join("-");
};
export default FormatDate;
