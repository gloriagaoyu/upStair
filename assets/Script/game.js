
var com=require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        audioSource:{
            default:null,
            type:cc.AudioSource,
        },
        tyAudioSource:{
            default:null,
            type:cc.AudioSource,
        },
        player:{
            default:null,
            type:cc.Node
        },
        qwPlayer:{
            default:null,
            type:cc.Node
        },
        xmPlayer:{
            default:null,
            type:cc.Node
        },
        stair:{
            default:null,
            type:cc.Prefab
        },
        dgStair:{
            default:null,
            type:cc.Prefab
        },
        lyStair:{
            default:null,
            type:cc.Prefab
        },
        nodeView:{
            default:null,
            type:cc.Node
        },
        timer:{
            default:null,
            type:cc.Label
        },
        stairIsLeft:true,
        preStairX:0,
        preStairY:0,
        stairWidth:192,
        stairHeight:87,
        playersPos:0,
        nowSelectPlayer:0,
        timers:60,
    },

    

    onLoad () {
        var manager=cc.director.getCollisionManager();
        manager.enabled=false;
        this.player.active=false;
        this.qwPlayer.active=false;
        this.xmPlayer.active=false;
        var showPlayerRandom=Math.random();
        //this.nowSelectPlayer=showPlayerRandom>0.5?this.player:this.qwPlayer;
        if(com.playerIndex==0){
            this.nowSelectPlayer=this.qwPlayer;
        }else if(com.playerIndex==1){
            this.nowSelectPlayer=this.player;
        }else{
            this.nowSelectPlayer=this.xmPlayer;
        }
        //this.nowSelectPlayer=com.playerIndex==1?this.player:this.qwPlayer;
        this.nowSelectPlayer.active=true;
        this.nowSelectPlayer.setPosition(0,-250);
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.newFirstStair();
        this.audioSource.play();
        this.timer.string=this.timers+"s";
        this.updateTimes();
        
    },

    updateTimes:function(){
        var that=this;
        var times=setInterval(function(){
            that.timers=that.timers-1;
            if(that.timers<0){
                that.gameOverThen();
                clearInterval(times);
            }else{
                that.timer.string=that.timers+"s";
            }
            
        },1000);
    },

    newFirstStair:function(){
        var newStair=cc.instantiate(this.stair);
        this.nodeView.addChild(newStair,-1);
        newStair.setPosition(this.nowSelectPlayer.x,this.nowSelectPlayer.y-125);
        this.preStairX=newStair.x;
        this.preStairY=newStair.y;
        for(var i=0;i<10;i++){
            var randDirector=Math.random();
            this.newOtherStair(randDirector);
        }
    },

    newOtherStair:function(randomNum){
        this.stairIsLeft=randomNum<0.5?false:true;
        var randStair=Math.random();
        var nextStair;
        if(randStair<0.33){
            nextStair=this.stair;
        }else if(randStair>0.33&&randStair<0.66){
            nextStair=this.dgStair;
        }else{
            nextStair=this.lyStair;
        }
        var newOtherStair=cc.instantiate(nextStair);
        newOtherStair.direction=this.stairIsLeft;
        this.nodeView.addChild(newOtherStair);

        if(this.stairIsLeft) {
            newOtherStair.setPosition(this.preStairX-this.stairWidth/2,this.preStairY+100);
        }else{
            newOtherStair.setPosition(this.preStairX+this.stairWidth/2,this.preStairY+100);
        }
        this.preStairX=newOtherStair.x;
        this.preStairY=newOtherStair.y;
    },

    playTyMusic:function(){
        this.tyAudioSource.play();
    },


    playerMove:function(toRight){
        var up=cc.moveTo(0.1,cc.p(this.nowSelectPlayer.x,this.nowSelectPlayer.y+this.stairHeight));
        var down=cc.moveTo(0.1,cc.p(this.nowSelectPlayer.x,this.nowSelectPlayer.y));
        this.nowSelectPlayer.runAction(cc.sequence(up,down,cc.callFunc(this.playTyMusic())));
        var scaleX=1;
        var viewMoveX=96;
        if(toRight){
            scaleX=-1;
            viewMoveX=-96;
        } 
        this.nowSelectPlayer.scaleX=scaleX;
        this.nodeView.runAction(cc.moveBy(0.1,cc.p(viewMoveX,-100)));
        this.playersPos+=1;
        var that=this;
        if(!this.checkMoveIsRight(!toRight,this.playersPos)){
            this.gameOverThen();
        }else{
            var randDirector=Math.random();   
            this.newOtherStair(randDirector);
            setTimeout(function() {
                 that.node.on(cc.Node.EventType.TOUCH_START,that.onTouchStart,that)
             }, 200);
        }
    },

    onTouchStart:function(event){ 
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        var touchLoction=event.touch.getLocation();
        var isRight=touchLoction.x>this.node.width/2;
        this.playerMove(isRight);
    },

    checkMoveIsRight:function(toLeft,nextStairPos){
        var childrens=this.nodeView.children;
        for(var i=0;i<childrens.length;i++){
            if(childrens[nextStairPos].direction==toLeft){
                return true;
            }
        }
        return false;
    },

    gameOverThen:function(){
        com.playerScore = this.playersPos-1;
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        var up=cc.moveTo(0.1,cc.p(this.nowSelectPlayer.x,this.nowSelectPlayer.y+this.stairHeight));
        var down=cc.moveTo(0.5,cc.p(this.nowSelectPlayer.x,this.nowSelectPlayer.y-400));
        this.nowSelectPlayer.runAction(cc.sequence(up,down,cc.callFunc(this.gameOver)));
    },

    gameOver:function(){
        cc.director.loadScene('gameOver');
    },

    // update (dt) {},
});
