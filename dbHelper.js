/**
 * Created by Kseniya on 30.03.14.
 */
function DBHelper() {
  var mydb = openDatabase("statistic_db_2", "0.2", "BlaBla", 1024 * 1024);

  this.callbackError = function (transaction, result) {
    console.log(result);
  }

  this.create = function () {
    mydb.transaction(function (t) {
      t.executeSql("CREATE TABLE IF NOT EXISTS 'date_statistic'( id INTEGER PRIMARY KEY, 'period' DATE NOT NULL, 'option_id' INT(11) NOT NULL, 'duration' INT(11) NOT NULL); ", [], null, this.callbackError);
      t.executeSql("CREATE TABLE IF NOT EXISTS 'options' ( id INTEGER PRIMARY KEY, 'options_name' TEXT NOT NULL);", [], null, this.callbackError);
      t.executeSql("INSERT INTO options (id, options_name) VALUES (?,?)", [1, 'work'], null, this.callbackError);
      t.executeSql("INSERT INTO options (id, options_name) VALUES (?,?)", [2, 'study'], null, this.callbackError);
      t.executeSql("INSERT INTO options (id, options_name) VALUES (?,?)", [3, 'video'], null, this.callbackError);
      t.executeSql("INSERT INTO options (id, options_name) VALUES (?,?)", [4, 'games'], null, this.callbackError);

    });
  }

  this.insertInStatistic = function (valPeriod, valOption_id, valDuration) {
    mydb.transaction(function (t) {
      t.executeSql("INSERT INTO date_statistic ('period', 'option_id', 'duration') VALUES (?, ?, ?)", [valPeriod, valOption_id, valDuration], null, this.callbackError);
    });
  }

  this.selectFromStatistic = function (from1, to1, callbackResult) {
    console.log(from1 + ' ' + to1);
    mydb.transaction(function (t) {
      t.executeSql("SELECT *, SUM(duration) AS count FROM date_statistic INNER JOIN options ON date_statistic.option_id = options.id WHERE period BETWEEN ? AND ? GROUP BY option_id", [from1, to1], callbackResult, this.callbackError);
    });
  }

  this.selectOptions = function (callbackResult) {
    mydb.transaction(function (t) {
      t.executeSql("SELECT * FROM options", [], callbackResult, this.callbackError);
    });
  }

}