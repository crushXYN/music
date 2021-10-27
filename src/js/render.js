/*
 * @Author: your name
 * @Date: 2021-08-27 23:20:36
 * @LastEditTime: 2021-09-02 01:21:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\music\src\js\render.js
 */
// 渲染功能
(function (root) {
  // 渲染图片
  function renderImg(src) {
    root.blurImg(src);
    let img = document.querySelector(".songImg img");
    img.src = src;
  }
  //渲染音乐信息
  function renderInfo(data) {
    let songInfoChildren = document.querySelector(".songInfo").children;
    songInfoChildren[0].innerHTML = data.name;
    songInfoChildren[1].innerHTML = data.singer;
    songInfoChildren[2].innerHTML = data.album;
  }
  //是否喜欢
  function renderIsLike(isLike) {
    let lis = document.querySelectorAll(".control li");
    lis[0].className = isLike ? "liking" : "";
  }
  // 渲染总时长
  function renderAllTime(data) {
    let totalTime = document.querySelector(".totalTime");
    totalTime.innerHTML = data.time;
  }
  root.render = function (data) {
    renderImg(data.image);
    // console.log(data.image);
    renderInfo(data);
    renderIsLike(data.isLike);
    renderAllTime(data);
  };
})(window.player || (window.player = {}));
