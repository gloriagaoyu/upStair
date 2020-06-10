"use strict";
cc._RF.push(module, '5214f5FgUtN1rgdNiHHEI58', 'over');
// Script/over.js

'use strict';

var com = require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            default: null,
            type: cc.Label
        },

        rankListContent: {
            default: null,
            type: cc.Node
        },
        buttonAudioSource: {
            default: null,
            type: cc.AudioSource
        },
        overAudioSource: {
            default: null,
            type: cc.AudioSource
        }
    },

    onLoad: function onLoad() {
        this.rankListContent.active = false;
        this.overAudioSource.play();
        this.score.string = '分数：' + com.playerScore;
        wx.postMessage({ message: "updateScore", score: com.playerScore });
    },
    start: function start() {
        wx.showShareMenu({ withShareTicket: true });
        wx.onShareAppMessage(function () {
            var shareInfo = {
                title: "胖子来一起天天向上",
                imageUrl: "http://i-1-chuzhaobiao.qqxzb-img.com/2018/7/25/b628ab86-e2c0-4920-b1bc-824c21094a2b.jpg?imageView2/2/q/85",
                query: null
            };
            return shareInfo;
        });
    },


    rankList: function rankList() {
        this.buttonAudioSource.play();
        this.rankListContent.active = true;
        wx.postMessage({ message: "refresh" });
    },

    clickMainBg: function clickMainBg() {
        this.rankListContent.active = false;
        wx.postMessage({ message: "destory" });
    },

    rePlay: function rePlay() {
        this.buttonAudioSource.play();
        cc.director.loadScene('gameScene');
    },
    goBack: function goBack() {
        this.buttonAudioSource.play();
        cc.director.loadScene('mainScene');
    }

});

cc._RF.pop();