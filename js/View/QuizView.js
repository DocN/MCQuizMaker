const PAGE_TITLE = "Quiz Demo";
const QUEST_FRAME = "questFrame";
var radioCount = 1;

//sets the title of the page
function setTitle() {
    var title = document.getElementById("title");
    title.innerText = PAGE_TITLE;
}

function optionSelect() {
    let quizContainer = document.getElementById("quizContainer");
    quizContainer.appendChild(createBootstrapContainer());
}

function createEasyHardBtn(container) {
    let easy = document.createElement("button");
    easy.setAttribute("onclick", "selectEasy()");
    easy.className = "btn btn-success bigbutton";
    easy.innerText = "Easy";

    let hard = document.createElement("button");
    hard.setAttribute("onclick", "selectHard()");
    hard.className = "btn btn-danger btnmargin bigbutton";
    hard.innerText = "Hard";
    container.innerHTML = "";
    container.appendChild(easy);
    container.appendChild(hard);
    return container;
}

function createBootstrapContainer() {
    let container = document.createElement("div");
    container.className = "container";

    let row = document.createElement("div");
    row.className = "row";
    let col12 = document.createElement("div");
    col12.className = "col-12 difficultyDiv";
    
    row.appendChild(createEasyHardBtn(col12));
    container.appendChild(row);
    return container;
}

//creates the quiz to answer
function createQuiz() {
    radioCount = 1;
    let quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = "";
    if(questions.length <= 0) {
        let noQuizHere = noQuiz();
        quizContainer.appendChild(noQuizHere);
        return;
    }
    for(let i =0; i < questions.length; i++) {
        let currentQuestFrame = document.createElement("div");
        currentQuestFrame.id = QUEST_FRAME + i;
        let currentQuest = document.createElement("b");
        currentQuest.innerText = (Number(i) + 1) + " " + questions[i].question;
        
        currentQuestFrame.appendChild(currentQuest);
        let currentForm = createRadioAns(questions[i]);
        currentQuestFrame.appendChild(currentForm);
        quizContainer.appendChild(currentQuestFrame);
    }
    let buttContainer = document.getElementById("buttonSubmit");
    buttContainer.innerHTML = "";
    buttContainer.appendChild(createSubmitButton());
}

//called when there's no quiz
function noQuiz() {
    let noQuiz = document.createElement("h1");
    noQuiz.className = "noQuiz";
    noQuiz.innerText = "There's no quiz here buddy";
    return noQuiz;
}

//called to create the radio buttons to answer mc
function createRadioAns(question) {
    let questionview = document.createElement("div");
    let form = createForm();
    for(let i =0; i < question.choices.length; i++) {
        let radio = createRadioBtns(radioCount);
        form.appendChild(radio);
        let label = createLabel(i, question.choices[i]);
        form.appendChild(label);
        form.appendChild(createBR());
    }
    return form;
}

//creates a label for the choice
function createLabel(index, choiceDesc) {
    let myLbl = document.createElement("label");
    myLbl.innerText =  (Number(index) + 1) + ". " + choiceDesc;
    return myLbl;
}

//creates a radio button
function createRadioBtns(choiceNumber) {
    radioCount = radioCount + 1;
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "choice");
    radio.id = "radioCheck" + choiceNumber;
    radio.className = "checkbox";
    radio.setAttribute("value", choiceNumber);
    return radio;
}

//creates a form for radio buttons
function createForm() {
    let form = document.createElement("form");
    form.id = "answerRadioForm";
    return form;
}

//next line element
function createBR() {
    return document.createElement("br");
}

//creates a submit button for submitting results
function createSubmitButton() {
    let btn = document.createElement("button");
    btn.id = "submitButtonID";
    btn.className = "btn btn-success submitButt";
    btn.setAttribute("onclick", "markQuiz()");
    btn.innerText = "Submit Quiz";
    return btn;
}

//changes to reset button after quiz is done
function changeToResetButton() {
    let btn = document.getElementById("submitButtonID");
    btn.setAttribute("onclick", "reloadPage()");
    btn.className = "btn btn-primary submitButt";
    btn.innerText = "Retake Quiz";
}
