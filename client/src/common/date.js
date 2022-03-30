function dateToLocaleStr(date) {
  return new Date(date.toISOString().split("Z")[0] + "-08:00").toISOString();
}

export default dateToLocaleStr;
