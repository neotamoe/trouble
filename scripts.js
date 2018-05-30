function popIt() {
    console.log("dice rolled");
    var die = 1 + Math.floor(Math.random() * 6);
    popperText = die;
    $("#btnPopper").text(popperText);
    setTimeout(resetPopper,1000);
}

var popperText="POP";
var yellowCount="4";
var blueCount="4";
var greenCount="4";
var redCount="4";
var players = [];
var currentPlayer = "";

$(document).ready(function(){
   $("#btnPopper").text(popperText);
   $("#yellowCount").text(yellowCount);
   $("#greenCount").text(greenCount);
   $("#blueCount").text(blueCount);
   $("#redCount").text(redCount);
});

function resetPopper() {
    $("#btnPopper").text("POP");
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
    console.log(players);
    $('input.players').attr('disabled', true);    
    $('#btnPlay').attr('disabled', true);
    for(var i=0; i < players.length; i++){
        var element = document.getElementById(players[i]);
        console.log(element);
        element.classList.remove('notPlaying');
    }
    $('#currentPlayer').addClass(players[0]);
}

function Player(color, startSquare, homeRow) {
    this.color = color;
    this.startSquare = startSquare;
    this.homeRow = homeRow;
}

var bluePlayer = new Player('blue', 1, ['29', '30', '31', '32']);
var redPlayer = new Player('red', 8, ['8','9','10','11']);
var yellowPlayer = new Player('yellow', 15, ['15','16','17','18']);
var greenPlayer = new Player('green', 22, ['22','23','24','25']);

// Player.prototype.functionNameHere = function () {

// }