"use strict";
function aMap() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://webapi.amap.com/maps?v=2.0&key=2d9034ba3c26ff38f06b91304781ce39`;
    script.async = true;
    window.initAMap = () => {
      resolve(window.AMap);
      delete window.initAMap;
    };
    script.onerror = () => {
      reject(new Error("高德地图API加载失败"));
    };
    document.body.appendChild(script);
  });
}
exports.aMap = aMap;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/aMap.js.map
