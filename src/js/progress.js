/*
 * @Author: your name
 * @Date: 2021-09-01 15:57:13
 * @LastEditTime: 2021-09-03 01:00:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \QQ音乐d:\文档\课程练习\阶段性项目\music\dist\js\progress.js
 */
(function (root) {
  // 进度条
  class Progress {
    constructor(data) {
      this.durTime = 0; //存储总时长
      this.frameId = null; //定时器
      this.startTime = 0; //开始播放的时间
      this.lastPercent = 0; //暂停时已经走的百分比
      this.init();
      this.audio = new Audio();
      this.duration == NaN ? 0 : 0;
      this.currentTime = 0;
      this.startPointX = 0; //拖拽时按下的坐标的位置
      this.startLeft = 0; //按下时已经走的距离
      this.percent = 0; //拖拽的百分比
      this.backBgLeft = 0;
      this.backBgWidth = 0;
      this.isMove = false;
    }
    init() {
      this.getDom();
    }
    getDom() {
      this.curTime = document.querySelector(".curTime");
      this.circle = document.querySelector(".circle");
      this.frontBg = document.querySelector(".frontBg");
      this.totalTime = document.querySelector(".totalTime");
      this.backBg = document.querySelector(".backBg");
    }
    // 渲染页面时长
    renderAllTime(currentTime, duration) {
      this.durTime = duration;
      time = this.formatDate(currentTime, duration);
    }
    formatDate(currentTime, duration) {
      var endMin = parseInt(duration / 60);
      var endSec = parseInt(duration % 60);
      if (endMin < 10) {
        endMin = "0" + endMin;
      }
      if (endSec < 10) {
        endSec = "0" + endSec;
      }

      var startMin = parseInt(currentTime / 60);
      var startSec = parseInt(currentTime % 60);
      if (startMin < 10) {
        startMin = "0" + startMin;
      }
      if (startSec < 10) {
        startSec = "0" + startSec;
      }
      return {
        star: startMin + ":" + startSec,
        end: endMin + ":" + endSec,
      };
    }
    // 渲染进度条时间
    musicTimeUpdate() {
      let This = this;
      // console.log(player.music.audio.duration);
      player.music.audio.addEventListener("timeupdate", function () {
        This.duration = player.music.getMusicDuration();
        This.currentTime = player.music.getMusicCurrentTime();
        let timeStr = This.formatDate(This.currentTime, This.duration);
        This.curTime.innerHTML = timeStr.star;
        This.value = (This.currentTime / This.duration) * 100;
        This.setProgress(This.value);
      });
    }
    setProgress(value) {
      if (this.isMove) return;
      if (value < 0 || value > 100) return;
      this.frontBg.style.width = value + "%";
      this.circle.parentNode.style.left = value + "%";
    }

    // 拖拽移动
    progressMove() {
      let This = this;
      // 按下事件
      this.backBg.parentNode.addEventListener("touchstart", function (event) {
        This.isMove = true;
        This.backBgLeft = This.backBg.parentNode.offsetLeft; //获取的是背景到页面的距离
        This.startPointX = event.changedTouches[0].pageX; //当前点击的距离
        This.backBgWidth = This.backBg.parentNode.clientWidth;
        // 设置前景色
        This.frontBg.style.width = This.startPointX - This.backBgLeft + "px";
        This.circle.parentNode.style.left =
          This.startPointX - This.backBgLeft + "px";
        This.percent =
          parseInt(This.circle.parentNode.style.left) / This.backBgWidth; //计算进度条的比例
        player.music.playTo(This.percent);
        // 移动事件
        this.addEventListener("touchmove", function (event) {
          This.startPointX = event.changedTouches[0].pageX;
          let offset = This.startPointX - This.backBgLeft;
          if (offset >= 0 && offset <= This.backBgWidth) {
            This.frontBg.style.width =
              This.startPointX - This.backBgLeft + "px";
            This.circle.parentNode.style.left =
              This.startPointX - This.backBgLeft + "px";
          }
          This.percent =
            parseInt(This.circle.parentNode.style.left) / This.backBgWidth; //计算进度条的比例
          player.music.playTo(This.percent);
          player.music.pause();
        });
      });
      // 抬起事件
      This.circle.parentNode.addEventListener("touchend", () => {
        This.backBg.removeEventListener("touchmove", function () {});
        This.isMove = false;
        player.music.play();
      });
    }
  }
  //   实例化进度条
  function instanceProgress(obj) {
    return new Progress();
  }
  root.progress = {
    pro: instanceProgress,
  };
})(window.player || (window.player = {}));
