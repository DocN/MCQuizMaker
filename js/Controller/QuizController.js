var questions = [];
const RADIOBUTTS = "radioCheck";

function loadView() {
    console.log("quiz loaded");
    setTitle();
    createNavs();
    loadStorage();
    createQuiz();
    //load overview questions
    
}
function loadStorage() {
    questions = JSON.parse(localStorage.getItem('quiz'));
    if(questions == null) {
        questions = [];
    }
    console.log(questions);
}

function markQuiz() {
    if(validateSelection()) {
        let answers = getAnswers();
        let marked = compareAnswers(answers);
        postResults(marked);
        showScore(marked);
        disableRadios();
        changeToResetButton();
    }
    else {
        showError();
    }
}

function validateSelection() {
    for(let i =1; i<=questions.length*4; i+=4) {
        let foundFour = false;
        for(let j =0; j < 4; j++) {
            let currentRadio = document.getElementById(RADIOBUTTS + (Number(i) + Number(j)));
            if(currentRadio.checked) {
                foundFour = true;
            }
        }
        if(foundFour == false) {
            return false;
        }
    }
    return true;
}

function getAnswers() {
    let answersList = [];
    for(let i =1; i<=questions.length*4; i+=4) {
        let foundFour = false;
        for(let j =0; j < 4; j++) {
            let currentRadio = document.getElementById(RADIOBUTTS + (Number(i) + Number(j)));
            if(currentRadio.checked) {
                answersList.push(j+1);
            }
        }
    }
    return answersList;
}

function compareAnswers(answers) {  
    let marked = [];
    for(let i =0; i< questions.length; i++) {
        if(questions[i].answer == answers[i]) {
            marked.push(true);
        }
        else {
            marked.push(false);
        }
    }
    return marked;
}

function postResults(marked) {
    for(let i=0; i < marked.length; i++) {
        let currentQuestion = document.getElementById(QUEST_FRAME + i);
        let correct = document.createElement("div");
        if(marked[i] == true) {
            correct.className = "correct";
            correct.innerText = "Correct!";
        }
        else {
            correct.className = "wrong";
            correct.innerText = "WRONG!";
            correct.innerText = correct.innerText + " The correct answer was: " + questions[i].answer;
        }
        currentQuestion.appendChild(correct);
    }
}

function disableRadios() {
    var x = document.getElementsByClassName("checkbox");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].disabled = true;
    }
}

function reloadPage() {
    location.reload();
}

function showError() {
    let error = document.createElement("h1");
    error.innerText = "PLEASE ANSWER ALL THE QUESTIONS";
    let errorcontainer = document.getElementById("error");
    errorcontainer.appendChild(error);
}

function showScore(marked) {
    let score = document.createElement("h1");
    let myScore = checkMarked(marked);
    score.innerText = "You scored " + myScore + "%";
    let errorcontainer = document.getElementById("error");
    errorcontainer.innerHTML = "";
    errorcontainer.appendChild(score);
    if(myScore >= 50) {
        errorcontainer.style.color = "green";
    }
    else {
        errorcontainer.style.color = "red";
    }
    
}

function checkMarked(marked) {
    let wrong = 0;
    let correct = 0;
    for(let i =0; i < marked.length; i++) {
        if(marked[i] == true) {
            correct++;
        }
        else {
            wrong++;
        }
    }  
    return ((correct)/(wrong+correct)*100);
}
