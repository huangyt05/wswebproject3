$('document').ready(function () {

    var players = [];
    //var playerIn = 1;
    var hands = [];

    var record = [];
    //var clickCount = 0;
    //var white = true;
    var turn = 1;
    var phase = 1;

    players.push('<div id="playerOne" class="player"></div>');
    players.push('<div id="playerTwo" class="player"></div>');


    hands.push('<div id="one" class="hands"><img></img></div>');
    hands.push('<div id="two" class="hands"><img></img></div>');
    hands.push('<div id="three" class="hands"><img></img></div>');
    hands.push('<div id="four" class="hands"><img></img></div>');

    let fists = [];

    class Fist {
        constructor(player, side, id) {
            this.player = player;
            this.side = side;
            this.num = 1;
            this.white = true;
            this.id = id;
        }

        makeMove(other) {
            if (this.player != other.player) {
                other.num += this.num;
                if (this.num > 10) {
                    this.num -= 10;
                }
            }
        }

        // win() {
        //     if (this.num == 10) {

        //     }
        // }

    }

    fists[0] = new Fist(1, 'left', 0);
    fists[1] = new Fist(1, 'right', 1);
    fists[2] = new Fist(2, 'left', 2);
    fists[3] = new Fist(2, 'right', 3);
    //console.log(fists[0]);

    //var count = 0;

    function findClass(object) {
        this.id = object.id
        if (this.id == 'one') {
            return 0;
        }
        if (this.id == 'two') {
            return 1;
        }
        if (this.id == 'three') {
            return 2;
        }
        if (this.id == 'four') {
            return 3;
        }
    }

    function findId(num) {
        if (num == 0) {
            return '#one';
        }
        if (num == 1) {
            return '#two';
        }
        if (num == 2) {
            return '#three';
        }
        if (num == 3) {
            return '#four';
        }
    }

    function updateHtml() {
        $('#one').html(fists[0].num);
        $('#two').html(fists[1].num);
        $('#three').html(fists[2].num);
        $('#four').html(fists[3].num);
    }

    $('#mainContainer').append(players[0]);
    $('#mainContainer').append(players[1]);

    for (i = 0; i < 2; i++) {
        $('#playerOne').append(hands[i]);
    }

    for (i = 2; i < 4; i++) {
        $('#playerTwo').append(hands[i]);
    }

    $('.hands').click(function () {
        if (fists[findClass(this)].player == turn && phase == 1) {
            if (fists[findClass(this)].white) {
                $(this).css('background-color', 'whitesmoke');
                !fists[findClass(this)].white;
                record.push(fists[findClass(this)]);
                phase++;
            }
        }
        else if (phase == 2) {
            if (fists[findClass(this)].player == turn) {
                if (fists[findClass(this)].white) {
                    $(this).css('background-color', 'whitesmoke');
                    record.push(fists[findClass(this)]);
                    fists[findClass(this)].white = false;
                    //console.log(fists[findClass(this)].white);
                    if (findClass(this) % 2 == 1) {
                        fists[findClass(this) - 1].white = true;
                        $(findId(findClass(this) - 1)).css('background-color', 'white');
                    }
                    else {
                        fists[findClass(this) + 1].white = true;
                        $(findId(findClass(this) + 1)).css('background-color', 'white');
                    }
                }
                else {
                    $(this).css('background-color', 'white');
                    fists[findClass(this)].white = true;
                    phase--;
                }
            }
            else {
                fists[findClass(this)].makeMove(record[record.length - 1]);
                $(this).css('background-color', 'whitesmoke');
                //$(findId(record[record.length - 1])).css('background-color', 'white');
                setTimeout(function () { $('.hands').css('background-color', 'white'); }, 200);
                //setTimeout(function () { $(findId(record[record.length - 1])).css('background-color', 'white'); }, 200);
                if (turn == 1) {
                    turn = 2;
                }
                else if (turn == 2){
                    turn = 1;
                }
                phase--;
            }
        }
        console.log(phase);
        updateHtml();
    });

});