/*
 * @Author: your name
 * @Date: 2021-08-30 16:04:48
 * @LastEditTime: 2021-09-02 23:02:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\music\src\js\audio.js
 */
(function (root) {
  class AudioManage {
    constructor() {
      this.audio = new Audio(); //创建一个audio实例
      this.status = "pause";
    }
    // 加载音乐
    load(src) {
      this.audio.src = src;
      this.audio.load(); //加载音乐
    }
    // 获取总时长
    getMusicDuration() {
      return this.audio.duration;
    }
    getMusicCurrentTime() {
      return this.audio.currentTime;
    }
    // 播放音乐
    play() {
      this.audio.play();
      this.status = "play";
    }
    // 暂停音乐
    pause() {
      this.audio.pause();
      this.status = "pause";
    }
    // 音乐播放完成时的状态
    end(fn) {
      this.audio.onended = fn;
    }
    //跳到某个音乐的播放点
    playTo(value) {
      this.audio.currentTime = this.audio.duration * value;
      this.audio.play();
    }
  }
  root.music = new AudioManage();
})(window.player || (window.player = {}));
