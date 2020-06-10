
var com=require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        score:{
            default:null,
            type:cc.Label
        },

        rankListContent:{
            default:null,
            type:cc.Node,
        },
        buttonAudioSource:{
            default:null,
            type:cc.AudioSource,
        },
        overAudioSource:{
            default:null,
            type:cc.AudioSource,
        },
    },

   

    onLoad () {
        this.rankListContent.active=false;
        this.overAudioSource.play();
        this.score.string='分数：'+com.playerScore;
        wx.postMessage({message:"updateScore",score:com.playerScore});
    },

    start(){
        wx.showShareMenu({withShareTicket: true});
        wx.onShareAppMessage(()=>{
            let shareInfo={
                title:"胖子来一起天天向上",
                imageUrl:"http://i-1-chuzhaobiao.qqxzb-img.com/2018/7/25/b628ab86-e2c0-4920-b1bc-824c21094a2b.jpg?imageView2/2/q/85",
                query:null
            };
            return shareInfo;
        });
    },


    rankList:function(){
        this.buttonAudioSource.play();
        this.rankListContent.active=true;
        wx.postMessage({message:"refresh"});
    },

    clickMainBg:function(){
        this.rankListContent.active=false;
        wx.postMessage({message:"destory"});
    },

    rePlay:function(){
        this.buttonAudioSource.play();
        cc.director.loadScene('gameScene');
    },
    goBack:function(){
        this.buttonAudioSource.play();
        cc.director.loadScene('mainScene');
    },

});
