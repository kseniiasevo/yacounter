var lastSelectOption = 0,
  currentOptionDate = 0,
  newDate = 0,
  period = 0,
  prevPeriod = 0,
  DBHelper = new DBHelper;

DBHelper.create();


var now = new Date(),
  hours = now.getHours(),
  minutes = now.getMinutes(),
  sec = now.getSeconds(),
  midnight = '23:59:59';

if (hours < 10) hours = '0' + hours;
if (minutes < 10) minutes = '0' + minutes;
if (sec < 10) sec = '0' + sec;
now = hours + ':' + minutes + ':' + sec;


var time = +new Date("January 01, 1970 " + now);
midnight = +new Date("January 01, 1970 " + midnight);
var diff = midnight - time;



function midnFunc() {
  period = +new Date() - currentOptionDate;
  prevPeriod = period;
  insertInStatistic(newDate, lastSelectOption, period);
  console.log(newDate+' '+lastSelectOption+' '+period);
  diff = 86400000;
  setTimeout(midnFunc, diff);
}

function callfunc(diff) {
  console.log(diff);
  setTimeout(midnFunc, diff);
}

function getOptions(callback) {
  DBHelper.selectOptions(function (transaction, result) {
    callback(result.rows);
  })
}

function insertInStatistic(valPeriod, valOption_id, valDuration) {
  DBHelper.insertInStatistic(valPeriod, valOption_id, valDuration);
}

function selectFromStatistic(from, to, callback) {
  DBHelper.selectFromStatistic(from, to, function (transaction, result) {
    console.log(result.rows);
    callback(result.rows);
  })
}

chrome.tabs.getAllInWindow(null, function (tabs) {
  num_tabs = tabs.length;

});

chrome.tabs.onCreated.addListener(function (tab) {
  num_tabs++;

});

chrome.tabs.onRemoved.addListener(function (tabId) {

  num_tabs--;

  if (num_tabs == 0) {

  }
});


callfunc(diff);