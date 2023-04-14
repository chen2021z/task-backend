const handleRouter = require("./src/router/user");
const querystring = require("querystring");

// 处理 post data
const getPostData = (req) => {
  return new Promise((reslove, reject) => {
    // 不是post请求
    if (req.method !== "POST") {
      reslove({});
      return;
    }
    // post请求，但传入的不是json
    if (req.headers["content-type"] != "application/json") {
      reslove({});
      return;
    }
    let postData = "";

    req.on("data", (chunck) => {
      postData += chunck.toString();
    });
    req.on("end", () => {
      // 如果没有数据
      if (!postData) {
        reslove({});
        return;
      }
      // 有数据转成对象
      reslove(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("COntent-type", "application/json");
  const url = req.url;
  // req.path作为路由
  req.path = url.split("?")[0];
  // 解析query
  req.query = querystring.parse(url.split("?")[1]);
  // 处理postData
  console.log(url);
  getPostData(req).then((postData) => {
    // 此时已经将postdata 放入req中
    req.body = postData;
    // 处理路由1
    const userResult = handleRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        console.log(userData);
        // 返回结果
        res.end(JSON.stringify(userData));
        return;
      });
      return
    }


    // 未命中上面路由
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle;
