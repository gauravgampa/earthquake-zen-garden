const replaceAll = (mapObj, str) => {
  const regex = new RegExp(Object.keys(mapObj).join("|"), "gi");
  return str.replace(regex, function (matched) {
    return mapObj[matched] || "";
  });
};

const formatDateNumeric = (n, option) => {
  if (option === "numeric") {
    return n.toString();
  }
  if (n < 10) {
    return "0" + n;
  }
  return n.toString();
};

const getDayFromDate = (date, option) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (option === "short") {
    return days[date.getDay()].substr(0, 3);
  }
  return days[date.getDay()];
};

const getMonthFromDate = (date, option) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (option === "numeric" || option === "2-digit") {
    return formatDateNumeric(date.getMonth() + 1, option);
  }
  if (option === "short") {
    return months[date.getMonth()].substr(0, 3);
  }
  return months[date.getMonth()];
};

const getYearFromDate = (date, option) => {
  if (option === "2-digit") {
    return date.getFullYear().toString().substr(-2);
  }
  return date.getFullYear().toString();
};

const getHourFromDate = (date, option, clockType) => {
  let hours = date.getHours();
  if (clockType === "12-hr") {
    const timeFormat = hours >= 12 ? "PM" : "AM";
    if (hours > 12) hours -= 12;
    return [formatDateNumeric(hours === 0 ? 12 : hours, option), timeFormat];
  }
  return [formatDateNumeric(hours, option), undefined];
};

/***
 *
 * ========= valid date options ===========
 *   date: numeric, 2-digit
 *   month: numeric, 2-digit, short
 *   year: numeric, 2-digit
 *   day: short, long
 *   hr: numeric, 2-digit
 *   min: numeric, 2-digit
 *   sec: numeric, 2-digit
 *   clockType: 12-hr, 24-hr
 */

export const getFormattedDate = (date, formatString, dateOptions) => {
  const dateOptionKeys = [
    "date",
    "month",
    "year",
    "day",
    "hr",
    "min",
    "sec",
    "clockType",
  ];
  const optionObj = dateOptions || { clockType: "12-hr" };
  const fmtString = "day month date, year hr:min:sec";
  const newDate = typeof date === "number" ? new Date(date) : date;
  if (newDate) {
    const mapObj = {};
    dateOptionKeys.forEach((key) => {
      if (key === "clockType" || !fmtString.includes(key)) {
        return;
      }
      switch (key) {
        case "day":
          mapObj[key] = getDayFromDate(newDate, optionObj[key]);
          return;
        case "month":
          mapObj[key] = getMonthFromDate(newDate, optionObj[key]);
          return;
        case "year":
          mapObj[key] = getYearFromDate(newDate, optionObj[key]);
          return;
        case "date":
          mapObj[key] = formatDateNumeric(newDate.getDate(), optionObj[key]);
          return;
        case "hr":
          const [hour, timeFormat] = getHourFromDate(
            newDate,
            optionObj[key],
            optionObj["clockType"]
          );
          mapObj[key] = hour;
          if (timeFormat) mapObj["clockType"] = timeFormat;
          return;
        case "min":
          mapObj[key] = formatDateNumeric(newDate.getMinutes(), optionObj[key]);
          return;
        case "sec":
          mapObj[key] = formatDateNumeric(newDate.getSeconds(), optionObj[key]);
          return;
      }
    });
    return replaceAll(
      mapObj,
      formatString || "day month date, year hr:min:sec clockType"
    );
  }
  return undefined;
};
