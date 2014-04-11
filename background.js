var lastSelectOption = 0;
var currentOptionDate = 0;
var newDate = 0;
var period = 0;
var prevPeriod = 0;

var DBHelper = new DBHelper;

DBHelper.create();

function midnFunc() {
  period = +new Date() - currentOptionDate;
  prevPeriod = period;
  console.log(prevPeriod);
  insertInStatistic(newDate, lastSelectOption, period);
}

function callfunc(diff) {
  setTimeout(midnFunc, diff);
}

var now = new Date();
hours = now.getHours();
if (hours < 10) hours = '0' + hours;
minutes = now.getMinutes();
if (minutes < 10) minutes = '0' + minutes;
sec = now.getSeconds();
if (sec < 10) sec = '0'+sec;
now = hours + ':' + minutes + ':' + sec;
console.log(now);

var midnight = '23:59:59';

var time = +new Date("January 01, 1970 " + now);
midnight = +new Date("January 01, 1970 " + midnight);
var diff = midnight - time;

callfunc(diff);


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