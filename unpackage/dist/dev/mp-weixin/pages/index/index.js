"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
const baseUrl = "https://uapis.cn";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const ipData = common_vendor.ref("");
    const ipInfo = common_vendor.ref("");
    async function test() {
      const res = await utils_http.http(baseUrl + "/api/v1/network/myip");
      ipData.value = res.region;
    }
    async function getWeather() {
      const res = await utils_http.http(baseUrl + "/api/v1/misc/weather", {
        city: ipData.value,
        extended: true,
        indices: true,
        forecast: true
      });
      ipInfo.value = res;
    }
    common_vendor.onMounted(async () => {
      await test();
      await getWeather();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(ipData.value),
        b: common_vendor.t(ipInfo.value)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
