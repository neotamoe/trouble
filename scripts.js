function popIt() {
    if(!this.currentPlayer){
        return;
    }
    console.log("dice rolled for " + this.currentPlayer.color);
    var die = 1 + Math.floor(Math.random() * 6);
    popperDisplay = die;
    console.log(popperDisplay);
    $("#btnPopper").text(popperDisplay);
    if(popperDisplay === 6){
        // player able to move out of home or move 6 spaces
        document.getElementById("instructions").innerHTML = "Click home to move a piece into play OR click the piece you want to move.";
        setTimeout(clearInstructions,1000);
        resetPopper();
    } else {
        if(this.currentPlayer.hasTokensOut){
            // select token to move
            document.getElementById("instructions").innerHTML = "Click the piece you want to move.";
            setTimeout(clearInstructions,1000);
            resetPopper();
        } else {
            // end of turn, trigger next player
            document.getElementById("instructions").innerHTML = "";
            resetPopper();
        }
    }
    if(gameHasWinner){
        document.getElementById("instructions").innerHTML = "GAME OVER -- " + winner + " wins!";
    } else {
        getNextPlayer();
    }
}

var popperDisplay="POP";
var yellowCount="4";
var blueCount="4";
var greenCount="4";
var redCount="4";
var players = [];
var currentPlayer = "";
var fullPlayers = [];
var gameHasWinner = false;
var winner = "";

$(document).ready(function(){
   $("#btnPopper").text(popperDisplay);
   $("#yellowCount").text(yellowCount);
   $("#greenCount").text(greenCount);
   $("#blueCount").text(blueCount);
   $("#redCount").text(redCount);
});

function resetPopper() {
    $("#btnPopper").text("POP");
}

function clearInstructions() {
    document.getElementById("instructions").innerHTML = "";
}

function toggle(value) {
    console.log(value);
    if(!players.includes(value)){
        players.push(value);
        console.log(players);
    } else {
        var index = players.findIndex(player => player === value);
        console.log(index);
        players.splice(index, 1);
        console.log(players);
    }
}

function play(players) {
    if(players.length<1){
        return;
    } 
    $('input.players').attr('disabled', true);    
    $('#btnPlay').attr('disabled', true);
    for(var i=0; i < players.length; i++){
        var element = document.getElementById(players[i]);
        element.classList.remove('notPlaying');
        var color = players[i];
        switch(color) {
            case "blue":
                this.fullPlayers[i] = this.bluePlayer;
                break;
            case "red":
                this.fullPlayers[i] = this.redPlayer;
                break;
            case "yellow":
                this.fullPlayers[i] = this.yellowPlayer;
                break;
            case "green":
                this.fullPlayers[i] = this.greenPlayer;
                break;
        }
    }
    $('#currentPlayer').addClass(players[0]);
    document.getElementById("instructions").innerHTML = "";
    this.currentPlayer = this.fullPlayers[0];
}

function getNextPlayer() {
    var index = this.fullPlayers.findIndex(player => player.color === this.currentPlayer.color);
    console.log(index);
    if(index == this.players.length-1){
        $('#currentPlayer').removeClass(this.fullPlayers[index].color);
        this.currentPlayer = this.fullPlayers[0];
        $('#currentPlayer').addClass(this.fullPlayers[0].color);
    } else {
        $('#currentPlayer').removeClass(this.fullPlayers[index].color);
        this.currentPlayer = this.fullPlayers[index+1];
        $('#currentPlayer').addClass(this.fullPlayers[index+1].color);
    }
}

function clickOnHome(element){
    if(this.currentPlayer.color!==element.id){
        console.log('not your turn!');
        document.getElementById("instructions").innerHTML = "It is " + this.currentPlayer.color + "'s turn.";
        return;
    }
    console.log('home clicked for ' + element.id);
    var color = element.id;
    switch(color){
        case "blue":
            if(this.blueCount>0){
                this.blueCount--;
                $("#blueCount").text(this.blueCount);
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "red":
            if(this.redCount>0){
                this.redCount--;
                $("#redCount").text(this.redCount);
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "yellow":
            if(this.yellowCount>0){
                this.yellowCount--;
                $("#yellowCount").text(this.yellowCount);
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "green":
            if(this.greenCount>0){
                this.greenCount--;
                $("#greenCount").text(this.greenCount);
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        // default:
        //     document.getElementById("instructions").innerHTML = "";
    }
    console.log(this.blueCount);

}

function Player(color, startSquare, homeRow) {
    this.color = color;
    this.startSquare = startSquare;
    this.homeRow = homeRow;
    this.hasTokensOut = false;
    this.numberOfTokensOut = 0;
}

var bluePlayer = new Player('blue', 1, ['29', '30', '31', '32']);
var redPlayer = new Player('red', 8, ['8','9','10','11']);
var yellowPlayer = new Player('yellow', 15, ['15','16','17','18']);
var greenPlayer = new Player('green', 22, ['22','23','24','25']);

// Player.prototype.functionNameHere = function () {

// }