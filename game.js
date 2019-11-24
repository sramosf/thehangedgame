var words = ["SANDY", "PHONE", "IGNORANT", "HOUSE", "SISTER", "INTERNATIONAL", "TERRIBLE", "ANDROID", "PIG", "ELEPHANT"];
var word = words[Math.floor(Math.random() * (words.length))];
var countdown = 100;
var penalty = 10;

//---------------------------
var t = setInterval(function() {
    $("#countdown h1").html(Number($("#countdown h1").html()) - Number(1));
    if ($("#countdown h1").html() < Number(0)) {
        $("#message").removeClass("invisible");
        $("#message").addClass("alert-danger");
        $("#message").html("You Lose! <a href=''>Play again.</a>");
        $("td a").removeClass("invisible");
        gameover();
    }
}, 1000);

var count = Number(0);
$(document).ready(function() {

})

function play() {
    $("#play").hide();
    $("#canvas").removeAttr("hidden");
    start();
}
function start() {
    $("#countdown h1").html(countdown);
    var table = $("#table tr");
    for (i = 0; i < word.length; i++) {
        table.append("<td><a class='invisible'>" + word[i] + "</a></td>");
    }
    start_countdown();
}

function start_countdown() {


}


function gameover() {
    $("#letters .btn").addClass("disabled");
    clearInterval(t);
}


function check(l) {
    for (i = 0; i < word.length; i++) {
        if (word[i] == l) {
            $("#table tr td").each(function() {
                if ($(this).text() == l) {
                    if (count == word.length - 1) {
                        $("#message").removeClass("invisible");
                        $("#message").addClass("alert-success");
                        $("#message").html("You WIN! <a href=''>Play again.</a>");
                        gameover();
                    }
                    $(this).addClass("btn-success");
                    $(this).children("a").removeClass("invisible");
                    count = count + Number(1);
                } else {
                    
                }
            });

            $("#btn_" + l.toLowerCase()).removeClass("btn-default");
            $("#btn_" + l.toLowerCase()).addClass("btn-success");
            return;
        }
    }
    $("#btn_" + l.toLowerCase()).removeClass("btn-default");
    $("#btn_" + l.toLowerCase()).addClass("btn-danger");
    $("#btn_" + l.toLowerCase()).addClass("disabled");
    $("#countdown h1").html(Number($("#countdown h1").html()) - Number(penalty));
}