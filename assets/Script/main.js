
var com=require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        audioSource:{
            default:null,
            type:cc.AudioSource,
        },
        playerAudioSource:{
            default:null,
            type:cc.AudioSource,
        },
        startBtn:{
            default:null,
            type:cc.Button,
        },
       
        peopleNode0:{
            default:null,
            type:cc.Node
        },
        peopleNode1:{
            default:null,
            type:cc.Node
        },
        peopleNode2:{
            default:null,
            type:cc.Node
        },

        peopleHg0:{
            default:null,
            type:cc.Node
        },
        peopleHg1:{
            default:null,
            type:cc.Node
        },
        peopleHg2:{
            default:null,
            type:cc.Node
        },
        playerNum:2,
    },

    

    onLoad () {
        this.changePeople();
        
    },

    start () {
        wx.showShareMenu({withShareTicket: true});
        wx.onShareAppMessage(()=>{
            let shareInfo={
                title:"胖子来一起天天向上",
                //imageUrl:"../resources/shareBanner.png",
                imageUrl:"http://i-1-chuzhaobiao.qqxzb-img.com/2018/7/25/b628ab86-e2c0-4920-b1bc-824c21094a2b.jpg?imageView2/2/q/85",
                query:null

            };
            return shareInfo;
        });
    },


    clickPeople0:function(){
        this.playerAudioSource.play();
        com.playerIndex=0;
        this.changePeople();
    },
    clickPeople1:function(){
        this.playerAudioSource.play();
        com.playerIndex=1;
        this.changePeople();
    },
    clickPeople2:function(){
        this.playerAudioSource.play();
        com.playerIndex=2;
        this.changePeople();
    },

    changePeople:function(){
        this.peopleNode0.active=com.playerIndex==0;
        this.peopleHg0.active=com.playerIndex==0;
        this.peopleNode1.active=com.playerIndex==1;
        this.peopleHg1.active=com.playerIndex==1;
        this.peopleNode2.active=com.playerIndex==2;
        this.peopleHg2.active=com.playerIndex==2;
    },


    startGame:function(){
        this.audioSource.play();
        cc.director.loadScene('gameScene');
    },

    // update (dt) {},
});
