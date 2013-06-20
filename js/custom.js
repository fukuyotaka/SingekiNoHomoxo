var move = new Array(false, false, false, false);
//move[]={left,right,down,up}
var posx = 300
var posy = 300

$(function () {
    refresh()
});

$(window).keydown(function (e) {
    $("#key").text(e.keyCode);
    if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 87) {
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
    $("canvas").clearCanvas()
    $("canvas").drawText({
        fillStyle: "#9cf",
        strokeWidth: 2,
        x: posx, y: posy,
        fontSize: "36pt",
        text: "┌(┌^o^)┐"
    });
}