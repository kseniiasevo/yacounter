var BGPage = chrome.extension.getBackgroundPage();

function getDurationByMillis(sec) {
  var result = '';
  var date = new Date(sec);

  var year = date.getUTCFullYear() - 1970;
  var month = date.getUTCMonth();
  var day = date.getUTCDate() - 1;
  var hour = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds();

  if (hour < 1) hour = 0;
  if (hour < 10) hour = '0' + hour;

  if (minutes < 1) minutes = 0;
  if (minutes < 10) minutes = '0' + minutes;

  if (seconds < 10) seconds = '0' + seconds;

  if (day < 1) {
    day = 0;
    result = hour + ':' + minutes + ':' + seconds;
  } else {
    result = day + 'd ' + hour + ':' + minutes + ':' + seconds;
  }

  if (month < 1) {
    month = 0;
  } else {
    result = month + 'm ' + day + 'd ' + hour + ':' + minutes + ':' + seconds;
  }

  if (year < 1) {
    year = 0;
  } else {
    result = year + 'y ' + month + 'm ' + day + 'd ' + hour + ':' + minutes + ':' + seconds;
  }
  return result;

}


function getStatistic(fromDate, toDate, className) {
  console.log(fromDate + ' ' + toDate + ' ' + className);
  BGPage.selectFromStatistic(fromDate, toDate, function (result) {
    console.log(result.length);
    for (var i = 0; i < result.length; i++) {
      var row = result.item(i);
      var s = getDurationByMillis(row.count);
      document.getElementsByClassName(row.options_name)[0].getElementsByClassName(className)[0].innerHTML = s;
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var BGPage = chrome.extension.getBackgroundPage();
  var day;

  var todayDate = new Date();
  todayDate.setMonth(todayDate.getMonth() + 1);
  day = todayDate.getUTCDate();
  if (day < 10) day = '0'+day;
  todayDate = todayDate.getUTCFullYear() + "-" + todayDate.getUTCMonth() + "-" + day;
  console.log(todayDate);

  var weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);
  weekAgoDate.setMonth(weekAgoDate.getMonth() + 1);
  day = weekAgoDate.getUTCDate();
  if (day < 10) day = '0'+day;
  weekAgoDate = weekAgoDate.getUTCFullYear() + "-" + weekAgoDate.getUTCMonth() + "-" + day;
  console.log(weekAgoDate);

  var monthAgoDate = new Date();
  monthAgoDate.setDate(monthAgoDate.getDate() - 30);
  monthAgoDate.setMonth(monthAgoDate.getMonth() + 1);
  day = monthAgoDate.getUTCDate();
  if (day < 10) day = '0'+day;
  monthAgoDate = monthAgoDate.getUTCFullYear() + "-" + monthAgoDate.getUTCMonth() + "-" + day;

  var allTime = new Date(0);
  allTime.setMonth(allTime.getMonth() + 1);
  day = allTime.getUTCDate();
  if (day < 10) day = '0'+day;
  allTime = allTime.getUTCFullYear() + "-" + allTime.getUTCMonth() + "-" + day;

  getStatistic(todayDate, todayDate, 'today');
  getStatistic(weekAgoDate, todayDate, 'week');
  getStatistic(monthAgoDate, todayDate, 'month');
  getStatistic(allTime, todayDate, 'all-time');

  document.getElementsByName('backBut')[0].addEventListener('click', function () {
    chrome.browserAction.setPopup({popup: 'popup.html'});
    window.location.href = "popup.html";
  });

});
