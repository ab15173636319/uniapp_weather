"use strict";
const common_vendor = require("../common/vendor.js");
function http(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    method = method.toLocaleUpperCase();
    try {
      if (method === "GET" && !data) {
        url = url + "?";
        for (var key in data) {
          url += `${key}=${data[key]}`;
        }
        data = {};
      }
      common_vendor.index.request({
        url,
        data,
        method,
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        }
      });
    } catch (error) {
      common_vendor.index.__f__("error", "at utils/http.js:25", `请求【${url}】时发生错误`, error);
    }
  });
}
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/http.js.map
