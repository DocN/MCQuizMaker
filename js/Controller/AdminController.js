var questions = [];
const quizChoiceInput = "quizChoiceInput";
const radioCheck = "radioCheck";
var currentEdit = 0;
//start admin page functions onload
function onload() {
    loadStorage();
    loadView();
    showQuestions();
}

//clears the input textboxes for the quiz creation
function clearQuizCreate() {
    document.getElementById("quizQuestion").value = "";
    let id = "quizChoiceInput";
    for(let i = 1; i <= 4; i++) {
        let current = document.getElementById(id + i);
        current.value = "";
    }
}

//Closes the quiz create window
function closeQuizCreate() {
    let container = document.getElementById("addQuestionContainer");
    container.style.visibility = "hidden";
    container.style.position = "absolute";
}

//function adds the quiz quesiton
function submitQuizQuestion() {
    if(validateCreate() == false) {
        document.getElementById("errorBox").innerText = "Please fill in all fields D:<";
        return;
    }
    else {
        document.getElementById("errorBox").innerText = "";
    }
    let question = document.getElementById("quizQuestion").value;
    let choices = [];
    for(let i =1; i <= 4; i++) {
        choices.push(document.getElementById("quizChoiceInput" + i).value);
    }
    
    let answer = getRadioCheck();
    let currentQues = new Question(question, choices, answer);
    questions.push(currentQues);
    console.log(questions);
    showQuestions();
    //closeQuizCreate();
}

function getRadioCheck() {
    for(let i=1; i <=4; i++) {
        let currentRadio = document.getElementById("radioCheck" + i);
        console.log(currentRadio);
        if(currentRadio.checked == true) {
            return i;
        }
    }
    return -1;
}

function removeQuestion(val) {
    let str = val;
    let count = str.replace("deleteQuestion", "");
    count--;
    questions.splice(count, 1);
    console.log(count);
    showQuestions();
}

function saveStorage() {
    localStorage.setItem('quiz', JSON.stringify(questions));
}

function loadStorage() {
    questions = JSON.parse(localStorage.getItem('quiz'));
    if(questions == null) {
        questions = [];
    }
}

function validateCreate() {
    if(document.getElementById("quizQuestion").value == "") {
        return false;
    }
    for(let i =1; i <=4; i++) {
        let currentEle = document.getElementById(quizChoiceInput + i);
        if(currentEle.value == "") {
            return false;
        }
    }
    return true;
}

function editQuestion(val) {
    let str = val;
    let count = str.replace("editQuestion", "");
    count--;
    closeQuizCreate();
    showQuizCreator();
    document.getElementById("quizQuestion").value = questions[count].question;
    for(let i =0; i < questions[count].choices.length; i++) {
        let currentInput = document.getElementById(QUIZ_INPUT_CHOICE + (Number(i) + 1));
        currentInput.value = questions[count].choices[i];
    }
    currentEdit = count;
    resetRadioCreate(count);
    changeUpdateButton();
}

function resetRadioCreate(count) {
    document.getElementById("radioCheck1").checked = false;
    let ans = questions[count].answer;
    document.getElementById(radioCheck + ans).checked = true;
}

function changeUpdateButton() {
    let submitBut = document.getElementById("submitCreateBtn");
    submitBut.setAttribute("onclick", "editVal()");
    submitBut.innerText = "Save Edit";

}

function editVal() {
    if(validateCreate() == false) {
        document.getElementById("errorBox").innerText = "Please fill in all fields D:<";
        return;
    }
    questions[currentEdit].question = document.getElementById("quizQuestion").value;
    for(let i =0; i < questions[currentEdit].choices.length; i++) {
        let currentInput = document.getElementById(QUIZ_INPUT_CHOICE + (Number(i) + 1));
        questions[currentEdit].choices[i] = currentInput.value;
    }
    questions[currentEdit].answer = getRadioEditAns();
    closeQuizCreate();
    showQuestions();
}

function getRadioEditAns() {
    for(let i =1; i <= 4; i++) {
        let currentRadio  = document.getElementById(radioCheck + i);
        if(currentRadio.checked) {
            return i;
        }
    }
    return -1;
}
