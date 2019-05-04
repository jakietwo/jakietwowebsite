function handleCreateTime(data) {
  data.forEach(item => {
    item.createtime = transferTimeToLocalTime(item.createTime);
  });
  return data;
}
function transferTimeToLocalTime(date) {
  let datetime = new Date(date);
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const day = datetime.getDate();
  const hh = datetime.getHours();
  const mm = datetime.getMinutes();
  const ss = datetime.getSeconds();
  let result = year + "-" + month + "-" + day + " " + hh + ":" + mm;
  return result;
}
export { handleCreateTime };
