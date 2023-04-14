const env = process.env.NODE_ENV; //环境变量

// mysql配置
let MYSQL_CONF;
if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "gender",
  };
} else if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "gender",
  };
}

module.exports = {
  MYSQL_CONF,
};
