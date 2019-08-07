const axios = require("axios");
// axios.defaults.baseURL = "http://localhost:8080";

// // 设置 baseURL 后，后面请求直接使用对应接口路径即可
// axios
//   .get("/test3", { name: "mmnn" }, { baseURL: "http://localhost:8080" })
//   .then(res => {
//     console.log(res.data);
//   });

var instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

instance.get("/test2").then(res => {
  console.log(res.data)
});
