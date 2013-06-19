function movingViewProcedure(dstHomoxo){
    images = dstHomoxo.images;
    images.body.x = dstHomoxo.pos.x;
    images.body.y = dstHomoxo.pos.y;

    images.frontArm.x = dstHomoxo.pos.x + homoxoData.frontArm.gap.x;
    images.frontArm.y = dstHomoxo.pos.y + homoxoData.frontArm.gap.y;
    images.midArm.x = dstHomoxo.pos.x + homoxoData.midArm.gap.x;
    images.midArm.y = dstHomoxo.pos.y + homoxoData.midArm.gap.y;
    images.rearArm.x = dstHomoxo.pos.x + homoxoData.rearArm.gap.x;
    images.rearArm.y = dstHomoxo.pos.y + homoxoData.rearArm.gap.y;

    if(dstHomoxo.moving){
        images.frontArm.rotation += 8 * dstHomoxo.armAspect;
        images.midArm.rotation += 8 * dstHomoxo.armAspect;
        images.rearArm.rotation += 8 * dstHomoxo.armAspect;
    }
    if(images.frontArm.rotation > 35){
        dstHomoxo.armAspect = -1;
    }else if(images.frontArm.rotation < -35){
        dstHomoxo.armAspect = 1;
    }
}
function screenObjectsViewProcedure(){
    for(var i=0;i<screenObjects.length;i++){

    }
}

function mainLoop(){
    movingLogicProcedure(homoxoHolder.mainHomoxo);
    movingViewProcedure(homoxoHolder.mainHomoxo);
    equipageLogicProcedure(homoxoHolder.mainHomoxo);
//    screenObjectsLogicProcedure();
    screenObjectsViewProcedure();
    var key;
    for(key in homoxoHolder.homoxoes){
        movingLogicProcedure(homoxoHolder.homoxoes[key]);
        movingViewProcedure(homoxoHolder.homoxoes[key]);
    }
}

function keyInputProcedure(dstHomoxo,pressKeyCode,isKeyDown){
    var dstInputStat = dstHomoxo.inputStat;
    var keyCodes = gameData.keyCodes;
    var returnCode = true;
    if(pressKeyCode == keyCodes.up){
        dstInputStat.up = isKeyDown;
        returnCode = false;
    }
    if(pressKeyCode == keyCodes.down){
        dstInputStat.down = isKeyDown;
        returnCode = false;
    }
    if(pressKeyCode == keyCodes.right){
        dstInputStat.right = isKeyDown;
        returnCode = false;
    }
    if(pressKeyCode == keyCodes.left){
        dstInputStat.left = isKeyDown;
        returnCode = false;
    }
    if(pressKeyCode == keyCodes.superSpeed){
        dstInputStat.superSpeed = isKeyDown;
        returnCode = false;
    }
    if(pressKeyCode == keyCodes.posiRifle){
        dstInputStat.posiRifle = isKeyDown;
        returnCode = false;
    }
    if(dstInputStat.inputBreak){
        dstInputStat.unbuttonAll();
    }
    if(dstInputStat.up || dstInputStat.down || dstInputStat.right || dstInputStat.left){
        dstHomoxo.moving = true;
    }else{
        dstHomoxo.moving = false;
    }
    return returnCode;
}

function keyUpEventListener(ev){
    return keyInputProcedure(homoxoHolder.mainHomoxo,ev.keyCode,false);
}

function keyDownEventListener(ev){
    return keyInputProcedure(homoxoHolder.mainHomoxo,ev.keyCode,true);
}

function stageClickListener(ev){
    /*
    print(ev.pageX - $(this).offset().left);
    print(ev.pageY - $(this).offset().top);
    */
}

function stageMoveListener(ev){
    homoxoHolder.mainHomoxo.targetDst.x = ev.pageX - $(this).offset().left;
    homoxoHolder.mainHomoxo.targetDst.y = ev.pageY - $(this).offset().top;
}

function homoxoLoad(){
    var homoxo = new Homoxo();
    homoxo.images.body = new Bitmap(gameData.images.body);
    homoxo.images.frontArm = new Bitmap(gameData.images.frontArm);
    homoxo.images.midArm = new Bitmap(gameData.images.midArm);
    homoxo.images.rearArm = new Bitmap(gameData.images.rearArm);

    homoxo.images.frontArm.regX = homoxoData.frontArm.reg.x;
    homoxo.images.frontArm.regY = homoxoData.frontArm.reg.y;
    homoxo.images.midArm.regX = homoxoData.midArm.reg.x;
    homoxo.images.midArm.regY = homoxoData.midArm.reg.y;
    homoxo.images.rearArm.regX = homoxoData.rearArm.reg.x;
    homoxo.images.rearArm.regY = homoxoData.rearArm.reg.y;
    print(homoxoData.rearArm.reg.y);

    gameData.stage.addChild(homoxo.images.body);
    gameData.stage.addChild(homoxo.images.frontArm);
    gameData.stage.addChild(homoxo.images.midArm);
    gameData.stage.addChild(homoxo.images.rearArm);

    return homoxo;
}

$(document).ready(function(){
    gameData.canvas = document.getElementById(gameData.dstCanvasId);
    gameData.stage  = new Stage(gameData.canvas);
    
    try{
        homoxoHolder.addMain(homoxoLoad());
    }catch(e){
        print(e.message);
    }

    Ticker.setFPS(60);
    Ticker.addListener(gameData.stage);
    $(window).keydown(keyDownEventListener);
    $(window).keyup(keyUpEventListener);
    $(gameData.canvas).click(stageClickListener);
    $(gameData.canvas).mousemove(stageMoveListener);
    setInterval(mainLoop,gameData.loopInterval);
});
