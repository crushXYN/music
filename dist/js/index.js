/*
 * @Author: your name
 * @Date: 2021-08-26 19:52:19
 * @LastEditTime: 2021-09-03 00:54:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\music\src\js\index.js
 */
(function ($, player) {
  class MusicPlayer {
    constructor(dom) {
      this.warp = dom;
      this.dataList = [];
      this.indexObj = null; //索引值对象，用于切歌
      this.rotateTimer = null;
      this.list = null;
      this.curIndex = 0; //当前播放歌曲的索引值
      this.progress = player.progress.pro(); //实例化一个进度条组件
    }
    // 初始化
    init() {
      this.getDom();
      this.getData("../mock/data.json"); //请求数据
    }
    // 获取页面上的元素
    getDom() {
      this.record = document.querySelector(".songImg img"); //旋转图片
      this.controlBtns = document.querySelectorAll(".control li"); //底部按钮
    }
    // 加载数据
    async getData(url) {
      const data = await (await fetch(url, { method: "get" })).json();
      this.dataList = data;
      this.listPlay(); //列表切歌
      this.indexObj = new player.controlIndex(data.length); //给索引对象赋值
      this.loadMusic(this.indexObj.index);
      this.musicControl(); //添加音乐播放功能
    }
    // 加载音乐
    loadMusic(index) {
      player.render(this.dataList[index]); //渲染图片...
      player.music.load(this.dataList[index].audioSrc); //加载音乐
      // 播放音乐
      if (player.music.status == "play") {
        player.music.play();
        this.controlBtns[2].className = "playing"; //按钮状态变成播放状态
        this.imgRotate(0); //切歌的时候进行旋转
      }
      this.progress.musicTimeUpdate(); //进度条时间同步
      // this.progress.progressClick(); //拖拽功能
      this.progress.progressMove();
      // 列表中的歌曲和界面上的歌曲高亮一致
      this.list.changeSelect(index);
      this.curIndex = index; //存储当前歌曲的索引值
    }
    // 控制音乐
    musicControl() {
      let This = this;
      // 上一首
      this.controlBtns[1].addEventListener("touchend", () => {
        player.music.status = "play";
        this.loadMusic(this.indexObj.prev());
        let backBg = This.progress.backBg;
        backBg.parentNode.removeEventListener("touchstart", function () {});
      });
      // 播放暂停状态
      this.controlBtns[2].addEventListener("touchend", function () {
        if (player.music.status == "play") {
          player.music.pause(); //歌曲暂停
          console.log(12);

          this.className = ""; //按钮状态变成暂停状态
          This.imgStop(); //停止旋转照片
        } else {
          player.music.play(); //歌曲播放
          // this.musicTimeUpdate();
          this.className = "playing"; //按钮状态变成播放状态
          let deg = This.record.dataset.rotate || 0;
          This.imgRotate(deg); //旋转图片
        }
      });
      // 下一首
      this.controlBtns[3].addEventListener("touchend", () => {
        player.music.status = "play";
        this.loadMusic(this.indexObj.next());
        let backBg = This.progress.backBg;
        backBg.parentNode.removeEventListener("touchstart", function () {});
      });
    }
    // 旋转唱片
    imgRotate(deg) {
      clearInterval(this.rotateTimer);
      this.rotateTimer = setInterval(() => {
        deg = +deg + 0.2; //前面的加号主要作用是将字符串转化成数字
        this.record.style.transform = `rotate(${deg}deg)`;
        this.record.dataset.rotate = deg;
      }, 1000 / 60);
    }
    // 暂停唱片
    imgStop() {
      clearInterval(this.rotateTimer);
    }
    // 歌曲列表
    listPlay() {
      this.list = player.listControl(this.dataList, this.warp);
      this.controlBtns[4].addEventListener("touchend", () => {
        this.list.slideUp();
      });
      // 歌曲列表添加事件
      this.list.musicList.forEach((item, index) => {
        item.addEventListener("touchend", () => {
          // 如果点击的是当前的那首歌，不管它是播放还是暂停都无效
          if (this.curIndex == index) {
            return;
          }
          player.music.status = "play";
          this.indexObj.index = index;
          this.loadMusic(index);
          this.list.slideDown();
        });
      });
    }
    // 控制进度条
    dragProgrss() {
      var cutTime = this.dataList[this.indexObj.index].duration;
    }
  }
  let musicPlayer = new MusicPlayer(document.getElementById("warp"));
  musicPlayer.init();
})(window.Zepto, window.player);
