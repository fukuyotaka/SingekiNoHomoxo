var homoxoes = {};
var canvas = null;
var stage = null;
var homoxoData = {
    x:0,
    y:0,
    armAspect:1,
    positoronRifleStat:0
};
var positoronRifle = {
    dstX:0,
    dstY:0,
    nowX:0,
    nowY:0,
    speedX:0,
    speedY:0,
    charge:0,
    armoryReady:0
};
var delayCounter = 0;
var homoxoStaticData = {
    frontArmGap:{x:192,y:12},
    rearArm1Gap:{x:0,y:12},
    rearArm2Gap:{x:64,y:12},
    mouthGap:{x:112,y:16}
};
var keyes = {
    up:false,
    down:false,
    left:false,
    right:false,
    spss:false,
    positoron:false
};

function addLoadEvent(func){
    if (window.addEventListener) { //for W3C DOM
        window.addEventListener("load", func, false);
    } else if (window.attachEvent) { //for IE
        window.attachEvent("onload", func);
    } else  {
        window.onload = func;
    }
}

function display(){
    var moving = false;

    if(homoxoData.positoronRifleStat == 0){
        if(keyes.up == true){
            homoxoData.y -= 5;
            moving = true;
        }
        if(keyes.down == true){
            homoxoData.y += 5;
            moving = true;
        }
        if(keyes.left == true){
            homoxoData.x -= 5;
            moving = true;
        }
        if(keyes.right == true){
            homoxoData.x += 5;
            moving = true;
        }

        homoxoes.body.x = homoxoData.x;
        homoxoes.body.y = homoxoData.y;

        homoxoes.frontArm.x = homoxoData.x + homoxoStaticData.frontArmGap.x;
        homoxoes.frontArm.y = homoxoData.y + homoxoStaticData.frontArmGap.y;
        homoxoes.rearArm1.x = homoxoData.x + homoxoStaticData.rearArm1Gap.x;
        homoxoes.rearArm1.y = homoxoData.y + homoxoStaticData.rearArm1Gap.y;
        homoxoes.rearArm2.x = homoxoData.x + homoxoStaticData.rearArm2Gap.x;
        homoxoes.rearArm2.y = homoxoData.y + homoxoStaticData.rearArm2Gap.y;

        if(moving == true){
            homoxoes.frontArm.rotation += 8 * homoxoData.armAspect;
            homoxoes.rearArm1.rotation += 8 * homoxoData.armAspect;
            homoxoes.rearArm2.rotation += 8 * homoxoData.armAspect;
        }
        if(homoxoes.frontArm.rotation > 35){
            homoxoData.armAspect = -1;
        }else if(homoxoes.frontArm.rotation < -35){
            homoxoData.armAspect = 1;
        }
    }

    if(homoxoData.positoronRifleStat != 0){
        if(homoxoData.positoronRifleStat == 1 && positoronRifle.armoryReady <7){
            delayCounter += 1;
            if(delayCounter % 4 == 0){
                homoxoes.frontArm.rotation = 0;
                homoxoes.rearArm1.rotation = 0;
                homoxoes.rearArm2.rotation = 0;

                homoxoes.body.y += 1;
                homoxoes.frontArm.y -= 1;
                homoxoes.rearArm1.y -= 1;
                homoxoes.rearArm2.y -= 1;
                positoronRifle.armoryReady += 1;
            }
        }else if(homoxoData.positoronRifleStat == 1  && positoronRifle.armoryReady < 21 && positoronRifle.armoryReady > 6){
            delayCounter += 1;
            if(delayCounter % 4 == 0){
                homoxoes.frontArm.rotation = 0;
                homoxoes.rearArm1.rotation = 0;
                homoxoes.rearArm2.rotation = 0;

                homoxoes.body.y -= 1;
                homoxoes.frontArm.y += 1;
                homoxoes.rearArm1.y += 1;
                homoxoes.rearArm2.y += 1;
                positoronRifle.armoryReady += 1;
            }
        }else if(homoxoData.positoronRifleStat == 1){
            homoxoData.positoronRifleStat = 2;
            delayCounter = 0;
            positoronRifle.armoryReady = 0;
            homoxoes.positoronLight = new Shape(new Graphics());
            stage.addChild(homoxoes.positoronLight);
        }
        if(homoxoData.positoronRifleStat == 2 && positoronRifle.charge <= 100){
            delayCounter += 1;

            if(delayCounter % 4 == 0){
                homoxoes.positoronLight.graphics.beginFill(Graphics.getRGB(255,215,0)).drawCircle(homoxoData.x + homoxoStaticData.mouthGap.x,homoxoData.y + homoxoStaticData.mouthGap.y,positoronRifle.charge / 2).endFill();
                positoronRifle.charge += 2
            }
        }else if(homoxoData.positoronRifleStat == 2 && positoronRifle.charge >= 100){
            positoronRifle.nowX = homoxoData.x + homoxoStaticData.mouthGap.x;
            positoronRifle.nowY = homoxoData.y + homoxoStaticData.mouthGap.y;
            positoronRifle.speedX =  (positoronRifle.dstX - positoronRifle.nowX) / 25;
            positoronRifle.speedY =  (positoronRifle.dstY - positoronRifle.nowY) / 25;
            homoxoData.positoronRifleStat = 3;
            positoronRifle.charge = 0;
        }
        if(homoxoData.positoronRifleStat == 3 && Math.abs(positoronRifle.dstX-positoronRifle.nowX) > 5 ){
            homoxoes.positoronLight.graphics.setStrokeStyle(35,1).beginStroke(Graphics.getRGB(255,255,0)).moveTo(homoxoData.x + homoxoStaticData.mouthGap.x,homoxoData.y + homoxoStaticData.mouthGap.y).lineTo(positoronRifle.nowX,positoronRifle.nowY).endStroke();
            positoronRifle.nowX += positoronRifle.speedX;
            positoronRifle.nowY += positoronRifle.speedY;
        }else if(homoxoData.positoronRifleStat == 3){
            homoxoData.positoronRifleStat = 0;
            homoxoes.positoronLight.graphics.clear();
        }
    }
}

function keyUpEventListener(ev){
    k = ev.keyCode;
    if(k == 87){
        keyes.up = false;
    }
    if(k == 83){
        keyes.down = false;
    }
    if(k == 68){
        keyes.right = false;
    }
    if(k == 65){
        keyes.left = false;
    }
    if(k == 69){
        keyes.spss = false;
    }
    if(k == 81){
        keyes.positoron = false;
    }
    if(homoxoData.positoronRifleStat != 0){
        keyes.up = false;
        keyes.down =  false;
        keyes.right = false;
        keyes.left = false;
        keyes.spss = false;
        keyes.positoron = false;
    }
    return false;
}

function keyDownEventListener(ev){
    k = ev.keyCode;
    if(k == 87){
        keyes.up = true;
    }
    if(k == 83){
        keyes.down = true;
    }
    if(k == 68){
        keyes.right = true;
    }
    if(k == 65){
        keyes.left = true;
    }
    if(k == 69){
        keyes.spss = true;
    }
    if(k == 81){
        keyes.positoron = true;
    }
    if(homoxoData.positoronRifleStat != 0){
        keyes.up = false;
        keyes.down =  false;
        keyes.right = false;
        keyes.left = false;
        keyes.spss = false;
        keyes.positoron = false;
    }
    return false;
}

function stageClickListener(ev){
    if(keyes.positoron == true && homoxoData.positoronRifleStat == 0){
        console.log('positoron start');
        homoxoData.positoronRifleStat = 1;
        positoronRifle.dstX = ev.layerX - this.offsetLeft;
        positoronRifle.dstY = ev.layerY - this.offsetTop;
        keyes.up = false;
        keyes.down =  false;
        keyes.right = false;
        keyes.left = false;
        keyes.spss = false;
        keyes.positoron = false;
    }
}

addLoadEvent(function(){
    canvas = document.getElementById("SCREEN");
    stage  = new Stage(canvas);
    homoxoes.body = new Bitmap('./img/homoxo_body.png');
    homoxoes.frontArm = new Bitmap('./img/homoxo_arm1.png');
    homoxoes.rearArm1 = new Bitmap('./img/homoxo_arm2.png');
    homoxoes.rearArm2 = new Bitmap('./img/homoxo_arm2.png');

    homoxoes.frontArm.regX = 0;
    homoxoes.frontArm.regY = 0;
    homoxoes.rearArm1.regX = 32;
    homoxoes.rearArm1.regY = 0;
    homoxoes.rearArm2.regX = 32;
    homoxoes.rearArm2.regY = 0;

    stage.addChild(homoxoes.body);
    stage.addChild(homoxoes.frontArm);
    stage.addChild(homoxoes.rearArm1);
    stage.addChild(homoxoes.rearArm2);
    Ticker.setFPS(60);
    Ticker.addListener(stage);
    window.onkeydown = keyDownEventListener;
    window.onkeyup = keyUpEventListener;
    canvas.onclick = stageClickListener;
    setInterval(display,20);
});
