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

function popIt() {
    if(!this.currentPlayer){
        return;
    }
    var die = 1 + Math.floor(Math.random() * 6);
    popperDisplay = die;
    console.log(popperDisplay);
    $("#btnPopper").text(popperDisplay);
    if(popperDisplay === 6){
        // player able to move out of home or move 6 spaces
        document.getElementById("instructions").innerHTML = "Click home to move a piece into play OR click the piece you want to move.  Then pop again.";
    } else {
        if(this.currentPlayer.hasTokensOut){
            // select token to move
            document.getElementById("instructions").innerHTML = "Click the piece you want to move.";
        } else {
            // end of turn, trigger next player
            document.getElementById("instructions").innerHTML = "You do not have any pieces to move.  Click 'End of Turn' button.";
        }
    }
}

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
    $('#btnEndOfTurn').removeAttr("disabled");
}

function getNextPlayer() {
    var index = this.fullPlayers.findIndex(player => player.color === this.currentPlayer.color);
    if(index == this.players.length-1){
        $('#currentPlayer').removeClass(this.fullPlayers[index].color);
        this.currentPlayer = this.fullPlayers[0];
        $('#currentPlayer').addClass(this.fullPlayers[0].color);
    } else {
        $('#currentPlayer').removeClass(this.fullPlayers[index].color);
        this.currentPlayer = this.fullPlayers[index+1];
        $('#currentPlayer').addClass(this.fullPlayers[index+1].color);
    }
    document.getElementById("instructions").innerHTML = "Pop it!";
    resetPopper();
}

function clickOnHome(element){
    if(popperDisplay!==6){
        document.getElementById("instructions").innerHTML = "You must get a 6 to move a piece out of home.";
        return;
    }
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
                placePieceOnStart("red");
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "yellow":
            if(this.yellowCount>0){
                this.yellowCount--;
                $("#yellowCount").text(this.yellowCount);
                placePieceOnStart("yellow");
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "green":
            if(this.greenCount>0){
                this.greenCount--;
                $("#greenCount").text(this.greenCount);
                placePieceOnStart("green");
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
    }
}

function placePieceOnStart(startColor) {
    var startGameSquare = this.gameSquares.find(gameSquare => gameSquare.color===startColor && gameSquare.isStart===true);
    var id = startGameSquare.id;
    if(startGameSquare.isOccupied && startGameSquare.occupiedColor===startColor){
        document.getElementById("instructions").innerHTML = "You already have a piece on start.  You cannot move another piece into play.";
        return;
    } 
    if (startGameSquare.isOccupied && startGameSquare.occupiedColor!==startColor){
        var opponentColor = startGameSquare.occupiedColor;
        document.getElementById("instructions").innerHTML = opponentColor + " is sent back to home.";
        switch(opponentColor){
            case "blue":
                this.blueCount++;
                $("#blueCount").text(this.blueCount);
                $('#'+id).remove('<div class="occupied-blue"></div>');
                if(this.blueCount===4){
                    this.bluePlayer.hasTokensOut = false;
                }
                break;
            case "red":
                this.redCount++;
                $("#redCount").text(this.redCount);
                $('#'+id).remove('<div class="occupied-red"></div>');
                if(this.redCount===4){
                    this.redPlayer.hasTokensOut = false;
                }
                break;
            case "yellow":
                this.yellowCount++;
                $("#yellowCount").text(this.yellowCount);
                $('#'+id).remove('<div class="occupied-yellow"></div>');
                if(this.yellowCount===4){
                    this.yellowPlayer.hasTokensOut = false;
                }
                break;
            case "green":
                this.greenCount++;
                $("#greenCount").text(this.greenCount);
                $('#'+id).remove('<div class="occupied-green"></div>');
                if(this.greenCount===4){
                    this.greenPlayer.hasTokensOut = false;
                }
                break;
        }
    }
    startGameSquare.isOccupied = true;
    switch(startColor) {
        case "blue":
            $('#'+id).append('<div class="occupied-blue"></div>');
            startGameSquare.occupiedColor="blue";
            break;
        case "red":
            $('#'+id).append('<div class="occupied-red"></div>');
            startGameSquare.occupiedColor="red";
            break;
        case "yellow":
            $('#'+id).append('<div class="occupied-yellow"></div>');
            startGameSquare.occupiedColor="yellow";
            break;
        case "green":
            $('#'+id).append('<div class="occupied-green"></div>');
            startGameSquare.occupiedColor="green";
            break;
    }    
    this.currentPlayer.hasTokensOut = true;
}

function moveSelectedPiece(element){
    console.log("you clicked on " + element.id);
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
        occupiedColor: "",
    },
    {
        id: 2,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 3,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 4,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 5,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 6,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 7,
        color: "red",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 71,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 72,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 73,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 74,
        color: "red",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 8,
        color: "red",
        isStart: true,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 9,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 10,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 11,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 12,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 13,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 14,
        color: "yellow",
        isStart: true,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 141,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 142,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 143,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 144,
        color: "yellow",
        isStart: true,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 15,
        color: "yellow",
        isStart: true,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 16,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 17,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 18,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 19,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 20,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 21,
        color: "green",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 211,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 212,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 213,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 214,
        color: "green",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 22,
        color: "green",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 23,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 24,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 25,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 26,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 27,
        color: "gray",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 28,
        color: "blue",
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 281,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 282,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 283,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 284,
        color: "blue",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    }
]