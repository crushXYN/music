/*
 * @Author: your name
 * @Date: 2021-08-31 21:48:23
 * @LastEditTime: 2021-08-31 22:19:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\music\src\js\indexControl.js
 */
(function (root) {
  class Index {
    constructor(len) {
      this.index = 0; //当前的索引值
      this.len = len; //数据的长度，用于做判断
    }
    // 用于获取上一个索引
    prev() {
      return this.get(-1);
    }
    // 用于获取下一个索引
    next() {
      return this.get(1);
    }
    get(val) {
      this.index = (this.index + val + this.len) % this.len;
      return this.index;
    }
  }
  root.controlIndex = Index;
})(window.player || (window.player = {}));
