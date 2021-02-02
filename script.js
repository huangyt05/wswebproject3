$('document').ready(function () {

    var players = [];
    //var playerIn = 1;
    var hands = [];

    var record = [];
    //var clickCount = 0;
    //var white = true;
    var turn = 1;
    var phase = 0;

    var winners = [];

    var start = '<div id="startBox" class="hoverbox"><div id="start"class="content"><button id="startgame"> start game</button></div></div>';
    var win = '<div id="winBox" class="hoverbox"><div id="win"class="content"><button id="wingame""> restart </button></div></div>';


    $('#hoverBoxes').append(start);
    $('#hoverBoxes').append(win);

    $('#start').prepend('Finger Bumping Game');




    players.push('<div id="playerOne" class="player"></div>');
    players.push('<div id="playerTwo" class="player"></div>');


    hands.push('<div id="one" class="hands"><img id="imgone" src="img/1_hand_0.png"></img></div>');
    hands.push('<div id="two" class="hands"><img id="imgtwo" src="img/1_hand_0.png"></img></div>');
    hands.push('<div id="three" class="hands"><img id="imgthree" src="img/1_hand_0.png"></img></div>');
    hands.push('<div id="four" class="hands"><img id="imgfour" src="img/1_hand_0.png"></img></div>');

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
                if (other.num + this.num > 10) {
                    other.num += this.num - 10;
                }
                else {
                    other.num += this.num;
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
    function setimage(num) {
        if (num == 0) {
            return 'img/0_hand_0.png';
        }
        if (num == 1) {
            return 'img/1_hand_0.png';
        }
        if (num == 2) {
            return 'img/2_hand_0.png';
        }
        if (num == 3) {
            return 'img/3_hand_0.png';
        }
        if (num == 4) {
            return 'img/4_hand_0.png';
        }
        if (num == 5) {
            return 'img/5_hand_0.png';
        }
        if (num == 6) {
            return 'img/6_hand_0.png';
        }
        if (num == 7) {
            return 'img/7_hand_0.png';
        }
        if (num == 8) {
            return 'img/8_hand_0.png';
        }
        if (num == 9) {
            return 'img/9_hand_0.png';
        }
        if (num == 10) {
            return 'img/0_hand_0.png';
        }
    }
    function update() {
        $('#imgone').attr('src', setimage(fists[0].num));
        $('#imgtwo').attr('src', setimage(fists[1].num));
        $('#imgthree').attr('src', setimage(fists[2].num));
        $('#imgfour').attr('src', setimage(fists[3].num));
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
                else if (turn == 2) {
                    turn = 1;
                }
                phase--;
                console.log(record[record.length - 1].num);
                //console.log(fists[findClass(this)].num);
                if (record[record.length - 1].num == 10) {
                    winners.push(record[record.length - 1].player);
                    $('#win').prepend('Player ' + winners[winners.length - 1] + ' Wins!');
                    $('#winBox').css('z-index', '1');
                    phase = 0;
                }
            }
        }
        // if (turn == 1) {
        //     $('#playerOne').css('background-color', 'rgb(186, 209, 186, 0.5)');
        // }
        // else if (turn == 1) {
        //     $('#playerTwo').css('background-color', 'rgb(186, 209, 186, 0.5)');
        // }
        //console.log(phase);
        update();

    });

    $('button').click(function () {
        phase = 1;
        $('.hoverbox').css('z-index', '-1');
        //console.log('clicked');
        for (i = 0; i < 4; i++) {
            fists[i].num = 1;
        }
        update();
    });


});