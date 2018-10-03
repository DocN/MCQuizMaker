const PAGE_TITLE = "Quiz Demo";
const QUIZ_QUESTION = "quizQuestion";
const QUIZ_INPUT_CHOICE = "quizChoiceInput";
var tableCount = 0;

function loadView() {
    console.log("loaded");
    setTitle();
    createNavs();
    createControls();

    //load overview questions
    
}

function createControls() {
    let controlContainer = document.getElementById("controlContainer");
    let createQuestBtn = createQuestionBtn();
    let saveBtn = createSaveBtn();
    controlContainer.appendChild(createQuestBtn);
    controlContainer.appendChild(saveBtn);
}

function createQuestionBtn() {
    let btn = document.createElement("button");
    btn.className = "btn btn-success btnMargin";
    btn.setAttribute("onclick", "showQuizCreator()");
    btn.innerText = "Create Question";
    return btn;
}

function createSaveBtn() {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary btnMargin";
    btn.setAttribute("onclick", "saveStorage()");
    btn.innerText = "Save Questions";
    return btn;
}

function setTitle() {
    var title = document.getElementById("title");
    title.innerText = PAGE_TITLE;
}

function showQuizCreator() {
    let addQuestionContainer = document.getElementById("addQuestionContainer");
    addQuestionContainer.style.visibility = "visible";
    addQuestionContainer.style.position = "relative";
    addQuestionContainer.innerHTML = "";
    //create header 
    let createQHeader = document.createElement("h3");
    createQHeader.innerText = "Please enter a quiz question";
    addQuestionContainer.appendChild(createQHeader);
    addQuestionContainer.appendChild(createQuestionBox());
    addQuestionContainer.className = "quizQuestion";
    let createFormContainer = createFContainer();
    let form = createForm();
    

    for(let i =1; i <= 4; i++) {
        let radio = createRadioBtns(i);
        form.appendChild(radio);
        let input = createInputBox(i);
        let label = createLabel(i);
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(createBR());
    }
    createFormContainer.appendChild(form);
    addQuestionContainer.appendChild(createFormContainer);
    addQuestionContainer.appendChild(createBtnSubmit());
    addQuestionContainer.appendChild(createBtnClear());
    addQuestionContainer.appendChild(createBtnCancel());
}

function createQuestionBox() {
    //create textbox 
    let createQuestTextbox = document.createElement("input");
    createQuestTextbox.id = QUIZ_QUESTION;
    createQuestTextbox.className = QUIZ_QUESTION;
    return createQuestTextbox;
}

function createChoice() {

}

function createInputBox(indexVal) {
    //create textbox 
    let createQuestTextbox = document.createElement("input");
    createQuestTextbox.id = QUIZ_INPUT_CHOICE + indexVal;
    createQuestTextbox.className = "pull-left " + QUIZ_INPUT_CHOICE;
    return createQuestTextbox;
}
function createBR() {
    return document.createElement("br");
}

function createFContainer() {
    let container = document.createElement("div");
    container.id = "formContainer";
    return container;
}

function createForm() {
    let form = document.createElement("form");
    form.id = "answerRadioForm";
    return form;
}

function createRadioBtns(choiceNumber) {
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "choice");
    radio.id = "radioCheck" + choiceNumber;
    console.log(radio.id);
    if(choiceNumber == 1) {
        radio.setAttribute("checked", "checked");
    }
    radio.setAttribute("value", choiceNumber);
    return radio;
}

function createLabel(choiceNumber) {
    let myLbl = document.createElement("label");
    myLbl.innerText = "Answer: " + choiceNumber;
    return myLbl;
}

function createBtnSubmit() {
    let btn = document.createElement("button");
    btn.className = "btn btn-success btnMargin";
    btn.setAttribute("onclick", "submitQuizQuestion()");
    btn.innerText = "Add Question";
    return btn;
}

function createBtnClear() {
    let btn = document.createElement("button");
    btn.className = "btn btn-info btnMargin";
    btn.setAttribute("onclick", "clearQuizCreate()");
    btn.innerText = "Clear";
    return btn; 
}

function createBtnCancel() {
    let btn = document.createElement("button");
    btn.className = "btn btn-danger btnMargin";
    btn.setAttribute("onclick", "closeQuizCreate()");
    btn.innerText = "Cancel";
    return btn; 
}

//quiz overview
function showQuestions() {
    tableCount = 0;
    for(let i =0; i < questions.length; i++) {
        console.log(questions[i]);
    }
    questionOverview.innerHTML = "";
    questionOverview.appendChild(createTable());
}

function createTable() {
    let tableresponse = document.createElement("div");
    tableresponse.className = "table-responsive-sm";
    let table = document.createElement("table");
    table.className="table";
    let thead = document.createElement("thead");
    let tr = createTableHeader();
    thead.appendChild(tr);
    table.appendChild(thead);
    let tbody = createTBody();
    
    for(let i =0; i < questions.length; i++) {
        let trBody = createRow(questions[i]);
        tbody.appendChild(trBody);
    }

    table.appendChild(tbody);
    tableresponse.appendChild(table);
    return tableresponse;
}

function createTableHeader() {
    let tr = document.createElement("tr");
    let header0 = document.createElement("th");
    header0.setAttribute("scope", "col");
    header0.innerText = "#";
    let header1 = document.createElement("th");
    header1.setAttribute("scope", "col");
    header1.innerText = "Question";
    let header2 = document.createElement("th");
    header2.setAttribute("scope", "col");
    header2.innerText = "Choices";
    let header3 = document.createElement("th");
    header3.innerText = "Delete";
    header3.setAttribute("scope", "col");
    tr.appendChild(header0);
    tr.appendChild(header1);
    tr.appendChild(header2);
    tr.appendChild(header3);
    return tr;
}

function createTBody() {
    let tbody = document.createElement("tbody");
    return tbody;
}

function createRow(currentQuestion) {
    tableCount = Number(tableCount) + 1;
    tr = document.createElement("tr");
    th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerText = tableCount;
    tr.appendChild(th);
    let questionTD = document.createElement("td");
    questionTD.innerText = currentQuestion.question;

    let choices = document.createElement("td");
    for(let i=0; i < currentQuestion.choices.length; i++) {
        let currentCount = (Number(i) +1);
        
        
        if(currentCount == currentQuestion.answer) {
            currentB = document.createElement("b");
            currentB.innerText = currentCount + ". " + currentQuestion.choices[i];
            choices.appendChild(currentB);
        }
        else {
            currentP = document.createElement("div");
            currentP.innerText =  currentCount + ". " + currentQuestion.choices[i];
            choices.appendChild(currentP);
        }
        
    }
    let answer = document.createElement("td");
    answer.innerText = currentQuestion.answer;

    tr.appendChild(questionTD);
    tr.appendChild(choices);
    tr.appendChild(createDelete(tableCount));
    return tr;
}

function createDelete(counter) {
    let deleter = document.createElement("td");
    deleter.innerText = "X";
    deleter.id = "deleteQuestion" + counter;
    deleter.className = "deleteQuestion";
    deleter.setAttribute("onclick", "removeQuestion(this.id)");
    return deleter;
}

function tester() {
    console.log("test");
}