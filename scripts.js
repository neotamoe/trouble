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
        document.getElementById("instructions").innerHTML = "It is " + this.currentPlayer.color + "'s turn.";
        return;
    }
    var color = element.id;
    switch(color){
        case "blue":
            if(this.blueCount>0){
                this.blueCount--;
                $("#blueCount").text(this.blueCount);
                placePieceOnStart("blue");
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

function placePieceOnStart(startColor) {
    console.log('in placePieceOnStart function: ' + startColor);
    var startGameSquare = this.gameSquares.find(gameSquare => gameSquare.color===startColor && gameSquare.isStart===true);
    console.log(startGameSquare);
    startGameSquare.isOccupied = true;
    console.log(startGameSquare);
    var id = startGameSquare.id;
    
    switch(startColor) {
        case "blue":
            $('#'+id).append('<div class="occupied-blue"></div>');
            break;
        case "red":
            $('#'+id).append('<div class="occupied-red"></div>');

            break;
        case "yellow":
            $('#'+id).append('<div class="occupied-yellow"></div>');

            break;
        case "green":
            $('#'+id).append('<div class="occupied-green"></div>');

            break;
    }
}

function Player(color, startSquare, homeRow) {
    this.color = color;
    this.startSquare = startSquare;
    this.homeRow = homeRow;
    this.hasTokensOut = false;
    this.numberOfTokensOut = 0;
}

var bluePlayer = new Player('blue', 1, [281, 282, 283, 284]);
var redPlayer = new Player('red', 8, [71, 72, 73, 74]);
var yellowPlayer = new Player('yellow', 15, [141, 142, 143, 144]);
var greenPlayer = new Player('green', 22, [211, 212, 213, 214]);

// Player.prototype.functionNameHere = function () {

// }

var gameSquares = [
    {
        id: 1,
        color: "blue",
        isStart: true,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 2,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 3,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 4,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 5,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 6,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 7,
        color: "red",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 71,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 72,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 73,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 74,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 8,
        color: "red",
        isStart: true,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 9,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 10,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 11,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 12,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 13,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 14,
        color: "yellow",
        isStart: true,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 141,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 142,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 143,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 144,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 15,
        color: "yellow",
        isStart: true,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 16,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 17,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 18,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 19,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 20,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 21,
        color: "green",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 211,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 212,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 213,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 214,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 22,
        color: "green",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 23,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 24,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 25,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 26,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 27,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 28,
        color: "blue",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
    },
    {
        id: 281,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 282,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 283,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    },
    {
        id: 284,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
    }
]