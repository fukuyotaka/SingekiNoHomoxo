var print = function(v){console.log(v)};

function Coord2D(x,y){
    if(x != undefined && y != undefined){
        this.x = x;
        this.y = y;
    }
}

Coord2D.prototype = {
    x:0,
    y:0
}

function HomoxoImages(){};
Homoxo.prototype = {
    body:null,
    frontArm:null,
    midArm:null,
    rearArm:null,
    posiRifle:new Array()
}

function HomoxoInputStat(){};
HomoxoInputStat.prototype = {
    up:false,
    down:false,
    left:false,
    right:false,
    superSpeed:false,
    posiRifle:false,
    inputBreak:false,
    clickDst:new Coord2D(),
    unbuttonAll:function(){
        this.up = 
            this.down =
            this.left =
            this.right = 
            this.superSpeed = 
            this.posiRifle =
            false;
    }
}

function Homoxo(){};
Homoxo.prototype = {
    pos:new Coord2D(),
    armAspect:1,
    moving:false,
    images:new HomoxoImages(),
    inputStat:new HomoxoInputStat(),
    targetDst:new Coord2D(),
    equipage:{
        posiRifle:{
                      stat:0,
                      bullet:120,
                      enabled:1
                  }
    }
}

var homoxoData = {
    moveSpeed:5,
    frontArm:{
        gap:new Coord2D(192,12),
        reg:new Coord2D(0,0)
    },
    midArm:{
               gap:new Coord2D(64,12),
               reg:new Coord2D(32,0)
           },
    rearArm:{
               gap:new Coord2D(0,12),
               reg:new Coord2D(32,0)
            },
    mouth:{
              gap:new Coord2D(112,16)
          },
    posiRifle:{
                  speed:18,
                  radius:8,
                  color:{
                      beam:{r:255,g:255,b:0}
                  }
              },
    arm:{
            armRotateAngleSpeed:8,
            armMaxAngle:35,
            armMaxAngleNegative:-35
        }
}

var gameData ={
    loopInterval:20,
    fps:60,
    dstCanvasId:'SCREEN',
    canvas:null,
    stage:null,
    keyCodes:{
                 up:87,
                 down:83,
                 right:68,
                 left:65,
                 superSpeed:69,
                 posiRifle:81
             },
    images:{
               body:'./img/homoxo_body.png',
               frontArm:'./img/homoxo_arm1.png',
               midArm:'./img/homoxo_arm2.png',
               rearArm:'./img/homoxo_arm2.png'
           },
    maxOtherHomoxoNum:4
}

var homoxoHolder = {
    mainHomoxo:null,
    homoxoes:{},
    homoxoesNum:0,
    addMain:function(homoxo){
        if(this.mainHomoxo == null){
            this.mainHomoxo = homoxo;
        }else{
            throw new Error('AddMainHomoxo Failure.');
        }
    },
    addOther:function(homoxo,name){
        if(this.homoxoesNum < gameData.maxOtherHomoxoNum){
            this.homoxoesNum++
            this.homoxoes[name] = homoxoes;
        }else{
            throw new Error('AddOtherHomoxo Failure.');
        }
    }
}

var graphicLayer = {
    layers:new Array()
}

function ScreenObject(){
    //recommend that constructor impliments
}
ScreenObject.prototype = {
    belonged:"",
    procedure:null, //must impliments.
    deleteJudge:null, //must impliments.if take delete,return true.
    screenBmp:null
}

function PosiRifleObject(dstX,dstY){
    
}
PosiRifleObject.prototype = new ScreenObject();
PosiRifleObject.prototype = {
    pos:new Coord2D,
    dst:new Coord2D,
    speed:new Coord2D,
    aspectQuadrant:0, //1~4
    procedure:function(){
        x += speedX;
        y += speedY;
    },
    deleteJudge:function(){
        return false;
    }
}

var staticScreenObjects = new Array(); //deleteJudge always false
var screenObjects = new Array();
