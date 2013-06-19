function posiRifleLogicProcedure(dstHomoxo){
    var equip = dstHomoxo.equipage;
    if(equip.posiRifle.bullet > 0){
        screenObjects.push(new PosiRifleObject());
    }
}

function equipageLogicProcedure(dstHomoxo){
    var inputStat = dstHomoxo.inputStat;
    if(inputStat.posiRifle == true){
        posiRifleLogicProcedure(dstHomoxo)
    }
}

function movingLogicProcedure(dstHomoxo){
    var inputStat = dstHomoxo.inputStat;
    if(inputStat.up == true){
        dstHomoxo.pos.y -= 5;
    }
    if(inputStat.down == true){
        dstHomoxo.pos.y += 5;
    }
    if(inputStat.left == true){
        dstHomoxo.pos.x -= 5;
    }
    if(inputStat.right == true){
        dstHomoxo.pos.x += 5;
    }
}

