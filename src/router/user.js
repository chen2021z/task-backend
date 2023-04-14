const { getGenderList } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleRouter = (req, res) => {
  const method = req.method;
  const path = req.path;

  //
  if (method === "GET" && path === "/api/user/getGenderList") {
    const result = getGenderList();
    return result.then((data) => {
      // console.log(data);
      if (data.id) {
        const {boy, girl} = data
        return new SuccessModel({ boy, girl }, "获取成功");
      } else {
        return new ErrorModel("获取失败");
      }
    });
  }
};

module.exports = handleRouter;
