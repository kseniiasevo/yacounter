var lastSelectOption = 0;
var currentOptionDate = 0;

var DBHelper = new DBHelper;

DBHelper.create();

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


chrome.windows.onRemoved.addListener(function (windowId) {
  //document.getElementById('test').innerHTML = 'test';
  //console.log ('test');
});

chrome.tabs.getAllInWindow(null, function (tabs) {
  num_tabs = tabs.length;

});

chrome.tabs.onCreated.addListener(function (tab) {
  num_tabs++;

});

chrome.tabs.onRemoved.addListener(function (tabId) {

  num_tabs--;

  if (num_tabs == 0) {
    //alert('ok');
  }
});