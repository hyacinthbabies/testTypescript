const format = (date, format) => {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468"
        : "") + week[date.getDay() + ""]
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};

const formatMsgTime = timespan => {
  var dateTime = new Date(timespan);

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now); //typescript转换写法

  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - timespan;
  console.log(milliseconds);
  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = "刚刚";
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + "分钟前";
  } else if (
    1000 * 60 * 60 * 1 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24
  ) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + "小时前";
  } else if (
    1000 * 60 * 60 * 24 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24 * 15
  ) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + "天前";
  } else if (
    milliseconds > 1000 * 60 * 60 * 24 * 15 &&
    year == now.getFullYear()
  ) {
    timeSpanStr = format(dateTime, "MM-dd hh:mm");
  } else {
    timeSpanStr = format(dateTime, "yyyy-MM-dd hh:mm");
  }
  return timeSpanStr;
};

const getName = id => {
  const arr = ["要闻", "社会", "娱乐", "体育", "军事", "明星", "其他"];
  return arr[id];
};

let map = {};
let headMap = { air: "1" };
let menuMap = {
  articleAdd: { subKey: "sub1", key: "1" },
  articleList: { subKey: "sub1", key: "2" },
  userList: { subKey: "sub2", key: "5" }
};

const getHeadKey = () => {
  const url = window.location.href;
  const head = url.split("/#/")[1].split("/")[0];
  return headMap[head];
};

const getMenuKeys = () => {
  const url = window.location.href;
  const menu = url.split("/")[url.split("/").length - 1];
  return menuMap[menu];
};

const DateFormat = (date, fmt) => {
  if (date === undefined || date === "" || date === null) {
    return "";
  }
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

export { formatMsgTime, getName, getHeadKey, getMenuKeys, DateFormat };
