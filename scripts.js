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

function toggle(id) {
    console.log(id);
    if(!players.includes(id)){
        players.push(id);
        console.log(players);
    } else {
        var index = players.findIndex(player => player === id);
        console.log(index);
        players.splice(index, index+1);
        console.log(players);
    }
}

function play(players) {
    console.log(players);
    $('.players').attr('disabled', true);
    for (var i = 0; i < players.length; i++) {
        var element = document.getElementsByClassName(players[i]);
        element[0].classList.remove('notPlaying');        
    }
    
}