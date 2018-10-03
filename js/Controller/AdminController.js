var questions = [];

function onload() {
    loadStorage();
    loadView();
    showQuestions();
}

function clearQuizCreate() {
    document.getElementById("quizQuestion").value = "";
    let id = "quizChoiceInput";
    for(let i = 1; i <= 4; i++) {
        let current = document.getElementById(id + i);
        current.value = "";
    }
}

function closeQuizCreate() {
    let container = document.getElementById("addQuestionContainer");
    container.style.visibility = "hidden";
    container.style.position = "absolute";
}

function submitQuizQuestion() {
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