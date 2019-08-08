const axios = require("axios");
// axios.defaults.baseURL = "http://localhost:8080";

// // 设置 baseURL 后，后面请求直接使用对应接口路径即可
// axios
//   .get("/test3", { name: "mmnn" }, { baseURL: "http://localhost:8080" })
//   .then(res => {
//     console.log(res.data);
//   });

var instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" }
});

instance.interceptors.request.use(function(config) {
  /*...*/
  console.log(1232);
  return config
});
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response.data)
  response.data.mm = 998
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
instance.get("/comment").then(res => {
  console.log(res.data);
});
