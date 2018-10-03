//loaded word bank and smaller word bank set of 10
var words = []; 
var tenWords = [];
const NUMBER_OF_WORDS = 10;
const NUMBER_OF_WORDS_TOTAL = 8080;
const USER_SCORE = "User Score: ";

var myWord = "";
var wordArray = [];
var wordHint = "";
var myDesc = "";
var wordContainer = "";
var clicked = [];
var gallowCount = 0;
var score = 0;
var discovery = 0;

// Get the modal
var winModal = document.getElementById('winModal');
// Get the modal
var loseModal = document.getElementById('loseModal');



//functions being called after page is loaded
function onLoaded() {
    button();
    readTextFile();
    get10Words();
    setCurrentWord();
}

//function for loading buttons
function button() {
    //repeat for all lettters
    for(let i =0; i < 26; i++) {
        let currentchar = String.fromCharCode('A'.charCodeAt() + i);
        let btn = document.createElement("BUTTON");
        let t = document.createTextNode(currentchar);
        clicked[i] = false;
        btn.appendChild(t);
        btn.id = currentchar;
        btn.className = "btn btn-primary alphabetbox";
        btn.setAttribute("onClick", "clickLetter(this)");
        //grab alphabet frame
        let element = document.getElementById("alphabetFrame");
        //add letter
        element.appendChild(btn);
    }
}

//function for restarting game
function restart() {
    location.reload();
}

//function for reading words from text
function readTextFile()
{
    let file = "http://localhost/hangyourself/data/words.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                words = allText.split("\n");
            }
        }
    }
    rawFile.send(null);
}

//function for getting 10 words to randomly choose from
function get10Words() {
    for(let i =0; i < NUMBER_OF_WORDS; i++) {
        let newWord = words[getRandomInt(NUMBER_OF_WORDS_TOTAL)];
        
        let currentWord = new Word(newWord, "");
        tenWords.push(currentWord);
        definitionAPI(newWord, i);
    }
}

//function for when a letter is clicked 
function clickLetter(input) {
    console.log(input.innerHTML);
    input.setAttribute("onClick", "");
    input.className = "btn btn-info alphabetbox";
    let letterFound = false;

    for(let i =0; i < myWord.length; i++) {
        if(wordArray[i] == false) {
            if(myWord[i].toUpperCase() == input.innerHTML) {
                discovery = Number(discovery) + 1;
                wordArray[i] = true;
                regenWordHint();
                letterFound = true;
                gainScore();
            }
        }
    }

    //when the gallow is complete and user still hasn't won
    if(gallowCount >= 5){
        loseModal.style.display = "block";
        let t = document.createTextNode("Your word was " + myWord);
        let yourword = document.createElement("P");
        yourword.appendChild(t);
        document.getElementById("ans").appendChild(yourword);
        return;
    }
    //display loss
    if(discovery == (wordArray.length -1)) {
        winModal.style.display = "block";
        return;
    }
    //next gallow step
    if(letterFound == false && gallowCount < 6) {
        let gallow = document.getElementById("gallow");
        gallowCount = Number(gallowCount) + 1;
        gallow.setAttribute("src", "images/gallow" + gallowCount + ".png");
        loseScore();
    }
}

//score update when winning
function gainScore() {
    score = Number(score) + 1;
    updateScore();
}

//score update when losing
function loseScore() {
    score = Number(score) - 1;
    updateScore();
}

//changes the score value on screen
function updateScore() {
    document.getElementById("score").innerHTML = USER_SCORE + score;
}

//sets the selected word in the view wordContainer
function setCurrentWord() {
    let wordCount = getRandomInt(NUMBER_OF_WORDS -1);
    myWord = tenWords[wordCount].word;
    myDesc = tenWords[wordCount].description;
    document.getElementById("defFrame").innerHTML = myDesc;
    wordContainer = document.getElementById("wordContainer");
    console.log(myWord);
    generateWordBlank();
    regenWordHint();
}

//generates a blank word (not revealed word yet)
function generateWordBlank() {
    wordHint = "";
    wordArray = [];
    for(let i =0; i < myWord.length; i++) {
        wordArray[i] = false;
    }
}

//update word hint in word container
function regenWordHint() {
    wordHint = "";
    for(let i =0; i < (wordArray.length - 1); i++) {
        if(wordArray[i] == true) {
            wordHint = wordHint + myWord[i] + " ";
        }
        else {
            wordHint = wordHint + "_ ";
        } 
    }
    let letter = document.createElement("P");
    let t = document.createTextNode(wordHint);
    letter.appendChild(t);
    letter.className = "currentLetter";
    wordContainer.innerHTML = "";
    wordContainer.appendChild(letter);
}

//random math memes
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//grab definition from dictionary api
function definitionAPI(word, i) {
    const url = 'https://api.datamuse.com/words?sp=' + word + '&md=d';
    $.ajax({
        async: false,
        type: 'GET',
        url: url,
        success: function(data) {
            //callback
            let f = tenWords[i];
            if(data[0].defs[0]) {
                f.description = data[0].defs[0];
            }
        }
    });
}

