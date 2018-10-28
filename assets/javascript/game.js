var brotherCol = ["Lazarus", "Candy", "Sunshine", "River", "Sorrow", "Blues", "Man", "Side", "Away", "Baby", "Highways", "Weary", "Death", "Jailhouse", "Whoop", "Valley", "Angel"];
var maxGuessCount = 10;

var brother = brotherCol;
var isPlaying = false;
var isPlaying = true;
var wins = 0;
var loss = 0;
var good = [];
var bad = [];
var answer;
var currentWordText = document.getElementById("current-word");
var guessesMadeText = document.getElementById("guesses-made");
var guessesLeftText = document.getElementById("guesses-left");
var winsText = document.getElementById("wins");
var missText = document.getElementById("miss");

console.debug(answer);
resetGameState();
setDisplay();

//Update display
function setDisplay() {
    var word = "";
    var guesses = "";

    for (let i = 0; i < answer.length; i++) {
        let letter = answer.charAt(i);
        if (letter === " ") {
            word += " ";

        } else if (good.includes(letter.toLowerCase())) {

            word += letter;
        } else {
            word += "_";
        }
    };

    bad.forEach(guess => {
        guesses += guess;
    });

    if (word === answer) {
        gameWin();
    }else if (bad.length >= maxGuessCount){
        gameLoss();
    }

    currentWordText.textContent = word;
    guessesMadeText.textContent = guesses;
    guessesLeftText.textContent = maxGuessCount - bad.length;
    winsText.textContent = wins;
    missText.textContent = loss;
}

document.onkeyup = function (event) {
    var key = event.key.toLowerCase();
    if(!isPlaying){
        resetGameState();
        setDisplay();
        return;
    }

    document.getElementById("commentTag").style.visibility = "hidden";

    if (!key.match("[a-z]")) {
        return;
    }
    else if (!good.includes(key) && answer.toLowerCase().includes(key)) {
        good.push(key);
    }
    else if (!bad.includes(key) && !answer.toLowerCase().includes(key)){
        bad.push(key);
    }
    setDisplay();
}

function gameWin() {
    var image = "./assets/images/" + answer + ".jpg";
    document.getElementById("game-img").src = image;
    wins++;
    isPlaying = false;
    remove(brother, answer);
    //playAudio(answer);
    document.getElementById("commentTag").style.visibility = "visible";
}
function playAudio(){
     //need to get audio files
    var audio = "./assets/audio/" + answer + ".flac";
}
function remove(){
    var newcol =[];
    brother.forEach(item => {
        if(item != answer){
            newcol.push(item);
        }
    });
    brother = newcol;
}

function resetGameState(){
    bad = [];
    good = [];
    if(brother.length<1){
        resetBrother();
    }
    answer = brother[Math.floor(Math.random() * brother.length)];
    isPlaying = true;
    
}

function resetBrother(){
    brother = brotherCol;
}

function gameLoss() {
    isPlaying = false;
    loss++;
    remove(brother, answer);
    document.getElementById("commentTag").style.visibility = "visible";
    var image = "./assets/images/loss.jpg";
    document.getElementById("game-img").src = image;
}


