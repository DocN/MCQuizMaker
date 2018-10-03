var questions = [];
const RADIOBUTTS = "radioCheck";

//load stuff on start
function loadView() {
    console.log("quiz loaded");
    setTitle();
    createNavs();
    loadStorage();
    createQuiz();
    //load overview questions
    
}

//load local storage quiz questions
function loadStorage() {
    questions = JSON.parse(localStorage.getItem('quiz'));
    if(questions == null) {
        questions = [];
    }
    console.log(questions);
}

//mark the quiz 
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

//make sure all radio boxes have been selected for all answers
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

//gets the answers that the user submitted
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

//compares the answers with the answer key
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

//show results after the quiz is taken
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

//turns off all radio buttons
function disableRadios() {
    var x = document.getElementsByClassName("checkbox");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].disabled = true;
    }
}

//reset the page
function reloadPage() {
    location.reload();
}

//show errors when submitting
function showError() {
    let error = document.createElement("h1");
    error.innerText = "PLEASE ANSWER ALL THE QUESTIONS";
    let errorcontainer = document.getElementById("error");
    errorcontainer.appendChild(error);
}

//show the result
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

//calculate score
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
