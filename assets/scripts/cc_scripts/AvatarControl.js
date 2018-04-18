// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var KBEngine = require("kbengine");


cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad () {
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
        cc.log("234 AvatarControl onLoad");
        this.createEventListener();
        // cc.eventManager.addListener({
        //     event: cc.EventListener.KEYBOARD,
        //     onKeyPressed: this.onKeyPressed.bind(this),
        //     onKeyReleased: this.onKeyReleased.bind(this),
        // }, this.node);

    },

    createEventListener: function () {
            var self = this;
            var keyBoardListener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(keyCode, event){
                    cc.log("789 press key=%f", keyCode);
                    switch(keyCode) {
                        case cc.KEY.a: 
                            self.player.leftWalk();
                            break;
            
                        case cc.KEY.d:
                            self.player.rightWalk();
                            break;
            
                        case cc.KEY.w:
                            self.player.jump();
                            break;
                    };
                },
                onKeyReleased: function(keyCode, event){
                    // cc.log("999 release key=%f", keyCode);
                    switch(keyCode) {
                        case cc.KEY.a: 
                        case cc.KEY.d:
                            self.player.stopWalk();                          
                            break;
                        };
                },
            }
        );  

        cc.eventManager.addListener(keyBoardListener, 1);
    },

    onKeyPressed: function (keyCode, event) {
        cc.log("789 press key: ", keyCode);
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                if(this.player) {
                    this.player.leftWalk();
                }
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                if(this.player) {
                    this.player.rightWalk();
                }
                break;
            case cc.KEY.w:
            case cc.KEY.up:
                if(this.player) {
                    this.player.jump();
                }
                break;
        }
    },
    
    onKeyReleased: function (keyCode, event) {
        cc.log("789 release key: ", keyCode);
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                if(this.player){
                    this.player.stopWalk();
                }
                
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                if(this.player) {
                    this.player.stopWalk();
                }
                break;
        }
    },

    setPlayer: function(player) {
        if(player) {
            this.player = player.getComponent("AvatarAction");
        }
    },

    update: function (dt) {
        var player = KBEngine.app.player();
        if(player == undefined || !player.inWorld)
            return;
    
        player.position.x = this.node.x/SCALE;
        player.position.y = 0;
        player.position.z = this.node.y/SCALE;
        player.isOnGround = this.player.isOnGround;
    },
});
