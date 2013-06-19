$(document).ready(function () {
    var posx = 300
    var posy = 300

    $("canvas").drawText({
        fillStyle: "#9cf",
        strokeWidth: 2,
        x: posx, y: posy,
        fontSize: "36pt",
        text: "┌(┌^o^)┐"
    });

    $(window).keydown(function (e) {
        $("#key").text(e.keyCode);
        if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 87) {

            $("canvas").clearCanvas()
            if (e.keyCode == 65) {
                posx = posx - 5
            }
            if (e.keyCode == 68) {
                posx = posx + 5
            }
            if (e.keyCode == 83) {
                posy = posy + 5
            }
            if (e.keyCode == 87) {
                posy = posy - 5
            }
            $("canvas").drawText({
                fillStyle: "#9cf",
                strokeWidth: 2,
                x: posx, y: posy,
                fontSize: "36pt",
                text: "┌(┌^o^)┐"
            });
        }
        return false;
    });

});