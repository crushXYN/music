/*
 * @Author: your name
 * @Date: 2021-08-31 22:25:31
 * @LastEditTime: 2021-09-01 23:22:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\music\src\js\listControl.js
 */
(function (root) {
  function listControl(data, warp) {
    let list = document.createElement("div"),
      dl = document.createElement("dl"),
      dt = document.createElement("dt"),
      close = document.createElement("div"),
      musicList = []; //存储所有歌曲的dom
    list.className = "list";
    dt.innerHTML = "播放列表";
    close.className = "close";
    close.innerHTML = "关闭";
    dl.appendChild(dt);
    data.forEach((item, index) => {
      let dd = document.createElement("dd");
      dd.addEventListener("touchend", function () {
        changeSelect(index);
      });
      dd.innerHTML = item.name;
      dl.appendChild(dd);
      musicList.push(dd);
    });
    list.appendChild(dl);
    list.appendChild(close);
    warp.appendChild(list);
    changeSelect(0); //默认第一首歌选中
    list.style.height = "0vh";
    close.style.display = "none";
    // 点击关闭隐藏列表
    close.addEventListener("touchend", slideDown);
    // 切换选中元素
    function changeSelect(index) {
      for (let i = 0; i < musicList.length; i++) {
        musicList[i].className = "";
      }
      musicList[index].className = "active";
    }
    //列表滑出显示
    function slideUp() {
      list.style.transition = "0.2s";
      list.style.height = "43vh";
      close.style.display = "block";
    }
    // 列表滑出隐藏
    function slideDown() {
      list.style.transition = "0.2s";
      list.style.height = "0";
      close.style.display = "none";
    }
    return {
      dom: list,
      musicList: musicList,
      slideUp: slideUp,
      slideDown: slideDown,
      changeSelect: changeSelect,
    };
  }
  root.listControl = listControl;
})(window.player || (window.player = {}));
