var questions = [];
const quizChoiceInput = "quizChoiceInput";
const radioCheck = "radioCheck";
var currentEdit = 0;
var toggleReminderVal = false;

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
    let difficulty = getDifficulty();
    let currentQues = new Question(question, choices, answer, difficulty);
    questions.push(currentQues);
    showQuestions();
    toggleReminderVal = true;
    toggleReminder(toggleReminder);
}

//changes the status if we need to remind to save or not.
function toggleReminder(enable) {
    let remindercontainer = document.getElementById("reminder");
    remindercontainer.innerHTML = "";
    let reminder = document.createElement("h1");
    if(enable) {
        reminder.innerText = "Don't forget to save your changes!!";
        reminder.className = "reminderText";
    }
    else {
        reminder.innerText = "";
    }
    remindercontainer.appendChild(reminder);
}

//gets the current difficulty 
function getDifficulty() {
    let diffBtn = document.getElementById("difficultyBtn");
    return diffBtn.innerText;
}

//gets the radiocheck value
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

//removes a question
function removeQuestion(val) {
    let str = val;
    let count = str.replace("deleteQuestion", "");
    count--;
    questions.splice(count, 1);
    console.log(count);
    showQuestions();
}

//save to local storage
function saveStorage() {
    let firebaseData = new Firebase();
    //firebaseData.writeQuestions(questions);
    firebaseData.writeFireStorage();
    //localStorage.setItem('quiz', JSON.stringify(questions));
}

//load from local storage
function loadStorage() {
    let firebaseData = new Firebase();
    firebaseData.getQuestions();
    //questions = JSON.parse(localStorage.getItem('quiz'));
    if(questions == null) {
        questions = [];
    }
}

//validate creating a question
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

//edit question function calls editing frame
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
    if(questions[count].difficulty == "Easy") {
        let btn = document.getElementById("difficultyBtn")
        btn.innerText = "Easy";
        btn.className = "btn btn-success btnMargin";
    }
    else {
        let btn = document.getElementById("difficultyBtn")
        btn.innerText = "Hard";
        btn.className = "btn btn-danger btnMargin";
    }
    changeUpdateButton();
}

//reset the radio buttons in the frame
function resetRadioCreate(count) {
    document.getElementById("radioCheck1").checked = false;
    let ans = questions[count].answer;
    document.getElementById(radioCheck + ans).checked = true;
}



//submits the editing values
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
    questions[currentEdit].difficulty = getDifficulty();
    closeQuizCreate();
    showQuestions();
}

//gets the current difficulty
function getDifficulty() {
    let btn = document.getElementById("difficultyBtn");
    return btn.innerText;
}
//gets the answer from the radio button form
function getRadioEditAns() {
    for(let i =1; i <= 4; i++) {
        let currentRadio  = document.getElementById(radioCheck + i);
        if(currentRadio.checked) {
            return i;
        }
    }
    return -1;
}

//for preventing page leave when unsaved
window.onbeforeunload = function(event) {
    if(toggleReminderVal == false) {
        return;
    }
    var e = e || window.event;
    if (e) {
        e.returnValue = message;
    }
    return message;
};