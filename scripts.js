var popperDisplay="POP";
var yellowCount="4";
var blueCount="4";
var greenCount="4";
var redCount="4";
var players = [];
var currentPlayer = "";
var fullPlayers = [];
var noPopAllowed = true;

$(document).ready(function(){
    $("#btnPopper").text(popperDisplay);
    $("#yellowCount").text(yellowCount);
    $("#greenCount").text(greenCount);
    $("#blueCount").text(blueCount);
    $("#redCount").text(redCount);
});

function popIt() {
    if(!currentPlayer){
        return;
    }
    if(noPopAllowed && popperDisplay!=6){
        return;
    }
    if(popperDisplay!=="POP" && popperDisplay!=6){
        document.getElementById("instructions").innerHTML = "It's not your turn anymore.  Click 'End of Turn' button.";
        return;
    }
    var die = 1 + Math.floor(Math.random() * 6);
    popperDisplay = die;
    $("#btnPopper").text(popperDisplay);
    if(popperDisplay === 6){
        // player able to move out of home or move 6 spaces
        document.getElementById("instructions").innerHTML = "Click home to move a piece into play OR click the piece you want to move.  Then pop again.";
        noPopAllowed = true;
    } else {
        if(this.currentPlayer.hasTokensOut){
            // select token to move
            document.getElementById("instructions").innerHTML = "Click the piece you want to move.";
            noPopAllowed = true;
        } else {
            // end of turn, trigger next player
            document.getElementById("instructions").innerHTML = "You do not have any pieces to move.  Click 'End of Turn' button.";
            noPopAllowed = false;
        }
    }
}

function resetPopper() {
    popperDisplay = "POP";
    $("#btnPopper").text(popperDisplay);
}

function clearInstructions() {
    document.getElementById("instructions").innerHTML = "";
}

function toggle(value) {
    if(!players.includes(value)){
        players.push(value);
    } else {
        var index = players.findIndex(player => player === value);
        players.splice(index, 1);
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
        if(players[i]=="blue"){
            fullPlayers[i] = bluePlayer;            
        } else if (players[i]=="red"){
            fullPlayers[i] = redPlayer;
        } else if (players[i]=="yellow"){
            fullPlayers[i] = yellowPlayer;
        } else if (players[i]=="green"){
            fullPlayers[i] = greenPlayer;
        }
    }
    $('#currentPlayer').addClass(players[0]);
    document.getElementById("instructions").innerHTML = "";
    currentPlayer = fullPlayers[0];
    $('#btnEndOfTurn').removeAttr("disabled");
    noPopAllowed = false;
}

function getNextPlayer() {
    var index = fullPlayers.findIndex(player => player.color === currentPlayer.color);
    if(index == players.length-1){
        $('#currentPlayer').removeClass(fullPlayers[index].color);
        currentPlayer = fullPlayers[0];
        $('#currentPlayer').addClass(fullPlayers[0].color);
    } else {
        $('#currentPlayer').removeClass(fullPlayers[index].color);
        currentPlayer = fullPlayers[index+1];
        $('#currentPlayer').addClass(fullPlayers[index+1].color);
    }
    noPopAllowed = false;
    document.getElementById("instructions").innerHTML = "Pop it!";
    resetPopper();
}

function clickOnHome(element){
    if(currentPlayer.color!==element.id){
        document.getElementById("instructions").innerHTML = "It is " + currentPlayer.color + "'s turn.";
    } else if(popperDisplay!==6){
        document.getElementById("instructions").innerHTML = "You must get a 6 to move a piece out of home.";
    } else {
        placePieceOnStart(element.id);
    }
}

function placePieceOnStart(startColor) {
    var startGameSquare = gameSquares.find(gameSquare => gameSquare.color===startColor && gameSquare.isStart===true);
    var id = startGameSquare.id;
    if(startGameSquare.isOccupied && startGameSquare.occupiedColor===startColor){
        document.getElementById("instructions").innerHTML = "You already have a piece on start.  You cannot move another piece into play.";
        return;
    } 
    if (startGameSquare.isOccupied && startGameSquare.occupiedColor!==startColor){
        var opponentColor = startGameSquare.occupiedColor;
        document.getElementById("instructions").innerHTML = opponentColor + " is sent back to home.";
        returnOpponentToHome(opponentColor, id);
    }

    switch(startColor) {
        case "blue":
            if(blueCount>0){
                blueCount--;
                $("#blueCount").text(blueCount);
                $('#'+id).append('<div class="occupied-blue"></div>');
                startGameSquare.occupiedColor="blue";
                startGameSquare.isOccupied = true;
                currentPlayer.hasTokensOut = true;
                document.getElementById("instructions").innerHTML = "Pop again";
                noPopAllowed = false;
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "red":
            if(redCount>0){
                redCount--;
                $("#redCount").text(redCount);
                $('#'+id).append('<div class="occupied-red"></div>');
                startGameSquare.occupiedColor="red";
                startGameSquare.isOccupied = true;
                currentPlayer.hasTokensOut = true;
                document.getElementById("instructions").innerHTML = "Pop again";
                noPopAllowed = false;
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "yellow":
            if(yellowCount>0){
                yellowCount--;
                $("#yellowCount").text(yellowCount);
                $('#'+id).append('<div class="occupied-yellow"></div>');
                startGameSquare.occupiedColor="yellow";    
                startGameSquare.isOccupied = true;
                currentPlayer.hasTokensOut = true;
                document.getElementById("instructions").innerHTML = "Pop again";
                noPopAllowed = false;
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
        case "green":
            if(greenCount>0){
                greenCount--;  
                $("#greenCount").text(greenCount);
                $('#'+id).append('<div class="occupied-green"></div>');
                startGameSquare.occupiedColor="green";
                startGameSquare.isOccupied = true;
                currentPlayer.hasTokensOut = true;
                document.getElementById("instructions").innerHTML = "Pop again";
                noPopAllowed = false;
            } else {
                document.getElementById("instructions").innerHTML = "You do not have any more pieces to move out of home";
            }
            break;
    }    
}

function selectAndMovePiece(element){
    if(!noPopAllowed){
        return;
    }
    var token = document.getElementById(element.id).children[0].classList[0];
    if(currentPlayer.color!=token.substring(9)){
        document.getElementById("instructions").innerHTML = "You can't move another player's piece.  Choose a different piece or click 'End of Turn' button";
        return;
    }
    var start = element.id;
    var end = Number(element.id) + Number(popperDisplay);
    var destinationGameSquare = getDestinationGameSquare(start, end);
    if(destinationGameSquare!==undefined){
        if(destinationGameSquare.isOccupied===true && destinationGameSquare.occupiedColor==currentPlayer.color){
            document.getElementById("instructions").innerHTML = "You already occupy that square.  Choose a different piece or click 'End of Turn' button";
            return;
        }
        else if (destinationGameSquare.isOccupied===true && destinationGameSquare.occupiedColor!==currentPlayer.color){
            var currentGameSquare = gameSquares.find(gameSquare => gameSquare.id==element.id);
            currentGameSquare.isOccupied = false;
            currentGameSquare.occupiedColor = "";
            var opponentColor = destinationGameSquare.occupiedColor;
            returnOpponentToHome(opponentColor, destinationGameSquare.id);
            
            destinationGameSquare.isOccupied = true;
            destinationGameSquare.occupiedColor = token.substring(9);
            var occupiedColor = "occupied-" + destinationGameSquare.occupiedColor;
            removePieceFromBoard(currentGameSquare.id);
            $('#'+destinationGameSquare.id).append('<div class="'+occupiedColor+'"></div>');
        } else {
            var currentGameSquare = gameSquares.find(gameSquare => gameSquare.id==element.id);
            currentGameSquare.isOccupied = false;
            currentGameSquare.occupiedColor = "";
            destinationGameSquare.isOccupied = true;
            destinationGameSquare.occupiedColor = token.substring(9);
            var occupiedColor = "occupied-" + destinationGameSquare.occupiedColor;
            removePieceFromBoard(currentGameSquare.id);
            $('#'+destinationGameSquare.id).append('<div class="'+occupiedColor+'"></div>');
        }

    } else {
        return;
    }
    if(popperDisplay==6){
        document.getElementById("instructions").innerHTML = "Pop again";
        noPopAllowed = false;
    }
    if(popperDisplay!=6){
        document.getElementById("instructions").innerHTML = "Click 'End of Turn' button";
        noPopAllowed = false;
    }
    this.checkIfWinner();
}

function getDestinationGameSquare(currentSquareId, end){
    var destinationId = 0;
    switch(currentPlayer.color) {
        case "blue":
            if(end>28 && currentSquareId<=28){
                var homeSlot = end-28;
                if(homeSlot>4){
                    document.getElementById("instructions").innerHTML = "You must go into home by exact count.  Choose another piece to move or click 'End of Turn' button";
                } else {
                    destinationId = 280 + homeSlot;     
                }
            } else if (currentSquareId>=281){
                if(end>284){
                    document.getElementById("instructions").innerHTML = "You must go into a home spot by exact count.  Choose another piece to move or if no available moves click 'End of Turn' button";
                } else {
                    destinationId = end;
                }
            } else {
                destinationId = end;
            }
            break;
        case "red":
            if(end>28 && currentSquareId<=28){
                destinationId = end - 28;
            } else if(end>7 && currentSquareId<=7){
                var homeSlot = end-7;
                if(homeSlot>4){
                    document.getElementById("instructions").innerHTML = "You must go into home by exact count.  Choose another piece to move or click 'End of Turn' button";
                } else {
                    destinationId = 70 + homeSlot; 
                }
            } else if (currentSquareId>=71){
                if(end>74){
                    document.getElementById("instructions").innerHTML = "You must go into a home spot by exact count.  Choose another piece to move or if no available moves click 'End of Turn' button";
                } else {
                    destinationId = end;
                } 
            } else {
                destinationId = end;
            }
            break;
        case "yellow":
            if(end>28 && currentSquareId<=28){
                destinationId = end - 28;
            } else if(end>14 && currentSquareId<=14){
                var homeSlot = end-14;
                if(homeSlot>4){
                    document.getElementById("instructions").innerHTML = "You must go into home by exact count.  Choose another piece to move or click 'End of Turn' button";
                } else {
                    destinationId = 140 + homeSlot; 
                }
            } else if (currentSquareId>=141){
                if(end>144){
                    document.getElementById("instructions").innerHTML = "You must go into a home spot by exact count.  Choose another piece to move or if no available moves click 'End of Turn' button";
                } else {
                    destinationId = end;
                } 
            } else {
                destinationId = end;
            }
            break;
        case "green":
            if(end>28 && currentSquareId<=28){
                destinationId = end - 28;
            } else if(end>21 && currentSquareId<=21){
                var homeSlot = end-21;
                if(homeSlot>4){
                    document.getElementById("instructions").innerHTML = "You must go into home by exact count.  Choose another piece to move or click 'End of Turn' button";
                } else {
                    destinationId = 210 + homeSlot; 
                }
            } else if (currentSquareId>=211){
                if(end>214){
                    document.getElementById("instructions").innerHTML = "You must go into a home spot by exact count.  Choose another piece to move or if no available moves click 'End of Turn' button";
                } else {
                    destinationId = end;
                }
            } else {
                destinationId = end;
            }
            break;
    }     
    var destinationGameSquare = gameSquares.find(gameSquare => gameSquare.id==destinationId);
    return destinationGameSquare;
}

function returnOpponentToHome(opponentColor, opponentSquareId) {
    document.getElementById("instructions").innerHTML = opponentColor + " is sent back to home.";
    switch(opponentColor){
        case "blue":
            if(blueCount<4){
                blueCount++;
            }
            $("#blueCount").text(blueCount);
            removePieceFromBoard(opponentSquareId);
            if(blueCount===4){
                bluePlayer.hasTokensOut = false;
            }
            break;
        case "red":
            if(redCount<4){
                redCount++;
            }
            $("#redCount").text(redCount);
            removePieceFromBoard(opponentSquareId);
            if(redCount===4){
                redPlayer.hasTokensOut = false;
            }
            break;
        case "yellow":
            if(yellowCount<4){
                yellowCount++;
            }
            $("#yellowCount").text(yellowCount);
            removePieceFromBoard(opponentSquareId);
            if(yellowCount===4){
                yellowPlayer.hasTokensOut = false;
            }
            break;
        case "green":
            if(greenCount<4){
                greenCount++; 
            }
            $("#greenCount").text(greenCount);
            removePieceFromBoard(opponentSquareId);
            if(greenCount===4){
                greenPlayer.hasTokensOut = false;
            }
            break;
    }
}

function checkIfWinner() {
    var homeRowSpotsFilled = 0;
    this.currentPlayer.homeRow.forEach(element => {
        var homeRowGameSquare = gameSquares.find(gameSquare => gameSquare.id==element && gameSquare.isHomeRow==true);
        if(homeRowGameSquare.isOccupied){
            homeRowSpotsFilled++;
        } 
    });
    if(homeRowSpotsFilled==4){
        $('#dialog').dialog({
            title: currentPlayer.color.toUpperCase() + " WINS!",
            modal: true,
            close: function() {
                location.reload();
            }
        });
    }
};

function removePieceFromBoard(pieceSquareId){   
    var currentSquareElement = document.getElementById(pieceSquareId);
    currentSquareElement.removeChild(currentSquareElement.childNodes[0]);
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

var gameSquares = [
    {
        id: 1,  // do not change
        color: "blue",  // do not change
        isStart: true,  // do not change
        isHomeRow: false,  // do not change
        isOccupied: false,  // this changes during game play
        occupiedColor: "",  // this changes during game play
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
        isStart: false,
        isHomeRow: false,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 141,
        color: "yellow",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 142,
        color: "yellow",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 143,
        color: "yellow",
        isStart: false,
        isHomeRow: true,
        isOccupied: false,
        occupiedColor: "",
    },
    {
        id: 144,
        color: "yellow",
        isStart: false,
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
        isStart: true,
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