const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect();

// 统一执行sql语句
function exec(sql) {
  return new Promise((res, rej) => {
    con.query(sql, (err, result) => {
      if (err) {
        rej(err);
        return;
      }
      // console.log(result);
      res(result);
    });
  });
}

module.exports = {
  exec,
};
