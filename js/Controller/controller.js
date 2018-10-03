var questions = [];

function onload() {
    loadView();
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
    document.getElementById("addQuestionContainer").style.visibility = "hidden";
    
}

function submitQuizQuestion() {
    let question = document.getElementById("quizQuestion");
    let choices = [];
    for(let i =1; i <= 4; i++) {
        choices.push(document.getElementById("quizChoiceInput" + i).value);
    }
    let answer = document.getElementById("answerRadioForm").value;
    let currentQues = new Question(question.innerText, choices);
    questions.push(currentQues);
    console.log(questions);
}