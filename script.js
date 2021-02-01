$('document').ready(function(){

    var player = [];
    var playerIn = 1;

    player[0] = '<div id="left" class="playerOne"><img></img></div>';
    player[1] = '<div id="right" class="playerOne"><img></img></div>';
    player[2] = '<div id="left" class="playerTwo"><img></img></div>';
    player[3] = '<div id="right" class="playerTwo"><img></img></div>';

    for (i = 0; i < 4; i++) {
		$('#mainContainer').append(player[i]);
	}

class fist{
    constructor (id, side){
        this.player = id;
        this.side = side;
        this.num = 1;
    }

    makeMove (other){
        if (this.player != other.player){
            this.num += other.num;
        }
    }

    win (){
        if (this.num == 10){

        }
    }

}

});