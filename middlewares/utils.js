// exports.dateTimeConvertor = (dateTime) => {
//   const str_date = dateTime.split("T")[0];
//   const str_year = str_date.split("-")[0];
//   const str_month = str_date.split("-")[1];
//   const str_day = str_date.split("-")[2];
//   const str_time = dateTime.split("T")[1];
//   const str_hour = str_time.split(":")[0];
//   const str_minute = str_time.split(":")[1];
//   const str_second = str_time.split(":")[2];
//   const date = new Date(
//     str_year,
//     str_month,
//     str_day,
//     str_hour,
//     str_minute,
//     str_second
//   );
//   return date;
// };

exports.successmessage = (message, payload = true) => {
  return {
    success: true,
    message,
    data: payload,
  };
};
exports.errormessage = (error) => {
  return {
    success: false,
    error,
  };
};
