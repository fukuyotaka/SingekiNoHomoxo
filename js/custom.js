var move = new Array(false, false, false, false);
//move[]={left,right,down,up}
var wire = new Array(false,false);
//wire[]={left,right}
var posx = 300
var posy = 300

var grabity = 3

$(function () {
    refresh()
});

$(function flip(){
    refresh();
    if(posy<370){
        posy = posy + grabity;
    }
    setTimeout(function(){
        flip();
    },30);
});

$(window).keydown(function (e) {
    $("#key").text(e.keyCode);
    if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 87 || e.KeyCode == 81 || e.KeyCode == 69) {
        if (e.keyCode == 65) {
            move[0] = true
        }
        if (e.keyCode == 68) {
            move[1] = true
        }
        if (e.keyCode == 83) {
            move[2] = true
        }
        if (e.keyCode == 87) {
            move[3] = true
        }

        if (e.keyCode == 81) {
            wire[0] = true
        }
        if (e.keyCode == 69) {
            wire[0] = true
        }
        refresh()
    }
    return false;
});


$(window).keyup(function (e) {
    if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 87) {
        if (e.keyCode == 65) {
            move[0] = false
        }
        if (e.keyCode == 68) {
            move[1] = false
        }
        if (e.keyCode == 83) {
            move[2] = false
        }
        if (e.keyCode == 87) {
            move[3] = false
        }
        if(e.KeyCode == 81) {
            wire[0] = false
        }
        if(e.KeyCode ==69) {
            wire[1] = false
        }
        refresh()
    }
    return false;
});

function refresh() {
    if (move[0] == true) {
        posx = posx - 10
    }
    if (move[1] == true) {
        posx = posx + 10
    }
    if (move[2] == true) {
        posy = posy + 10
    }
    if (move[3] == true) {
        posy = posy - 10
    }
    if (wire[0] == true) {

    }else if (wire[1] == true) {

    }

    $("canvas").clearCanvas()
    $("canvas").drawText({
        fillStyle: "#9cf",
        strokeWidth: 2,
        x: posx, y: posy,
        fontSize: "10pt",
        text: "┌(┌^o^)┐"
    });

    $("canvas").drawLine({
     strokeStyle: "#000",
     strokeWidth: 1,
     strokeCap: "round",
     strokeJoin: "round",

     x1: 50, y1: 50,
     x2: posx-10, y2: posy-10
 });

    $("canvas").drawRect({
        fillStyle: "#fc9",
        x:0,
        y:400,
        width: 1600,
        height: 50
    });


}