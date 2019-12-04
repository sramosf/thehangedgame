// CONFIG
var words = ["DYSNEY", "PHONE", "IGNORANT", "HOUSE", "SISTER", "INTERNATIONAL", "TERRIBLE", "ANDROID", "PIG", "ELEPHANT"];
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var countdown = 100;
var penalty = 10;

// SET UP GAME INI
var count2Win = Number(0);
var word = words[Math.floor(Math.random() * (words.length))];


// ON PLAY
function play() {

    setUpGame();

    function setUpGame() {
        $("#play").hide();
        $("#canvas").removeAttr("hidden");
        $("#message").hide();
        $("#penalty").hide();
        $("#penalty h5").html("-" + penalty)
        $("#countdown h1").html(countdown);
        showLetters();

        // CREATE TABLE
        var table = $("#table tr");
        for (i = 0; i < word.length; i++) {
            table.append("<td><a class='invisible'>" + word[i] + "</a></td>");
        }

        function showLetters() {
            for (i = 0; i < letters.length - 1; i++) {
                $("#letters").append(`<a  class="btn let btn-default" id="btn_` + letters[i].toLowerCase() + `">` + letters[i] + `</a>`);
            }
        }
    }

    // ON LETTER PRESSED
    $(".let").click(function() {
        var id = $(this).attr("id").charAt(4);
        check(id);
    })

    // START COUNTDOWN
    var t = setInterval(function() {
        $("#countdown h1").html(Number($("#countdown h1").html()) - Number(1));
        checkCountDown();
    }, 1000);

    function checkCountDown() {
        if ($("#countdown h1").html() < Number(1)) {
            lose();
        }
    }

    function win() {
        var message = $("#message");
        message.show();
        message.addClass("alert-success");
        message.html("You WIN! <a onclick='playAgain();'>Play again.</a>");
        gameover();
    }

    function lose() {
        var message = $("#message");
        message.show();
        message.addClass("alert-danger");
        message.html("You Lose! <a onclick='playAgain();'>Play again.</a>");
        $("td a").removeClass("invisible");
        gameover();
    }

    function gameover() {
        $("#letters .btn").addClass("disabled");
        clearInterval(t);
    }

    // CHECKING WORDS
    function check(l) {
        l = l.toUpperCase();
        for (i = 0; i < word.length; i++) {
            if (word[i] == l) {
                $("#table tr td").each(function() {
                    if ($(this).text() == l) {
                        if (count2Win == word.length - 1) {
                            win();
                        }
                        $(this).addClass("btn-success");
                        $(this).children("a").removeClass("invisible");
                        count2Win = count2Win + Number(1);
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
        penalt();

        //ON WRONG WORD
        function penalt() {
            if ($("#countdown h1").html() < Number(penalty)) {
                $("#countdown h1").html("1");
            } else {
                $("#countdown h1").html(Number($("#countdown h1").html()) - Number(penalty));
                $("#penalty").show();
                $("#penalty").fadeOut("slow");
            }

        }
    }
} // END PLAY()

//PLAY AGAIN
function playAgain() {
    reset();
    play();

    function reset() {
        count2Win = Number(0);
        word = words[Math.floor(Math.random() * (words.length))];
        $("#table tr").html("");
        $("#letters").html("");
    }
}
// END PLAY AGAIN