$(document).ready(function () {

    $(window).keydown(function (e) {
        $("#key").text(e.keyCode);
        return false;
    });

});