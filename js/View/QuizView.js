const PAGE_TITLE = "Quiz Demo";
const QUEST_FRAME = "questFrame";
var radioCount = 1;

function setTitle() {
    var title = document.getElementById("title");
    title.innerText = PAGE_TITLE;
}

function createQuiz() {
    let quizContainer = document.getElementById("quizContainer");
    
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
    buttContainer.appendChild(createSubmitButton());
}

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

function createLabel(index, choiceDesc) {
    let myLbl = document.createElement("label");
    myLbl.innerText =  (Number(index) + 1) + ". " + choiceDesc;
    return myLbl;
}

function createRadioBtns(choiceNumber) {
    radioCount = radioCount + 1;
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "choice");
    radio.id = "radioCheck" + choiceNumber;
    radio.className = "checkbox";
    console.log(radio.id);
    radio.setAttribute("value", choiceNumber);
    return radio;
}


function createForm() {
    let form = document.createElement("form");
    form.id = "answerRadioForm";
    return form;
}

function createBR() {
    return document.createElement("br");
}

function createSubmitButton() {
    let btn = document.createElement("button");
    btn.id = "submitButtonID";
    btn.className = "btn btn-success submitButt";
    btn.setAttribute("onclick", "markQuiz()");
    btn.innerText = "Submit Quiz";
    return btn;
}

function changeToResetButton() {
    let btn = document.getElementById("submitButtonID");
    btn.setAttribute("onclick", "reloadPage()");
}

function reloadPage() {
    
}