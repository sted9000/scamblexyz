/*** File to format dates and times with moment.js */
import moment from "moment";

export const dateToMMMDDYYYY = (date) => {
  return moment(date).format("MMM DD, YYYY");
};

export const differenceInDates = (date1, date2) => {
  // set in weeks
  // Note: This includes the unit in the return string
  const diff = moment(date1).diff(moment(date2), "weeks");
  return `${diff} weeks`;
};
