export const makeDate = () => {
  let date = new Date();
  let yyyy = date.getFullYear().toString();
  let MM = (date.getMonth() + 1).toString();
  let DD = date.getDate().toString();
  let HH = date.getHours().toString();
  let mm = date.getMinutes().toString();
  var ss = date.getSeconds().toString();
  var sss = date.getMilliseconds().toString();
  return (
    yyyy +
    (MM[1] ? MM : "0" + MM[0]) +
    (DD[1] ? DD : "0" + DD[0]) +
    (HH[1] ? HH : "0" + HH[0]) +
    (mm[1] ? mm : "0" + mm[0]) +
    (ss[1] ? ss : "0" + ss[0]) +
    sss
  );
};
