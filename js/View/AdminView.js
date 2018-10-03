const PAGE_TITLE = "Quiz Demo";
const QUIZ_QUESTION = "quizQuestion";
const QUIZ_INPUT_CHOICE = "quizChoiceInput";
var tableCount = 0;

//load the admin view
function loadView() {
    console.log("loaded");
    setTitle();
    createNavs();
    createControls();

    //load overview questions
    
}

//creates the admin controls
function createControls() {
    let controlContainer = document.getElementById("controlContainer");
    let createQuestBtn = createQuestionBtn();
    let saveBtn = createSaveBtn();
    controlContainer.appendChild(createQuestBtn);
    controlContainer.appendChild(saveBtn);
}

//creates the question button 
function createQuestionBtn() {
    let btn = document.createElement("button");
    btn.className = "btn btn-success btnMargin";
    btn.setAttribute("onclick", "showQuizCreator()");
    btn.innerText = "Create Question";
    return btn;
}

//creates the saving button
function createSaveBtn() {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary btnMargin";
    btn.setAttribute("onclick", "saveStorage()");
    btn.innerText = "Save Questions";
    return btn;
}

//sets the title of the page
function setTitle() {
    var title = document.getElementById("title");
    title.innerText = PAGE_TITLE;
}

//creates the quiz creator 
function showQuizCreator() {
    let addQuestionContainer = document.getElementById("addQuestionContainer");
    addQuestionContainer.style.visibility = "visible";
    addQuestionContainer.style.position = "relative";
    addQuestionContainer.innerHTML = "";
    //create header 
    let createQHeader = document.createElement("h3");
    createQHeader.innerText = "Please enter a quiz question";

    let errorBox = createErrorBox();

    addQuestionContainer.appendChild(createQHeader);
    addQuestionContainer.appendChild(errorBox);
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

//creates the error message frame
function createErrorBox() {
    let errorBox = document.createElement("h4");
    errorBox.id = "errorBox";
    errorBox.style.color = "red";
    return errorBox;
}

//creates the question box for the creation/editing
function createQuestionBox() {
    //create textbox 
    let createQuestTextbox = document.createElement("input");
    createQuestTextbox.id = QUIZ_QUESTION;
    createQuestTextbox.className = QUIZ_QUESTION;
    return createQuestTextbox;
}

//creates an input box 
function createInputBox(indexVal) {
    //create textbox 
    let createQuestTextbox = document.createElement("input");
    createQuestTextbox.id = QUIZ_INPUT_CHOICE + indexVal;
    createQuestTextbox.className = "pull-left " + QUIZ_INPUT_CHOICE;
    return createQuestTextbox;
}

//creates a next line break
function createBR() {
    return document.createElement("br");
}

//creates a form container
function createFContainer() {
    let container = document.createElement("div");
    container.id = "formContainer";
    return container;
}

//creates a form for radio btns
function createForm() {
    let form = document.createElement("form");
    form.id = "answerRadioForm";
    return form;
}

//creates radio buttons
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

//creates a label for a radio btn
function createLabel(choiceNumber) {
    let myLbl = document.createElement("label");
    myLbl.innerText = "Answer: " + choiceNumber;
    return myLbl;
}

//creates a submit button for new question
function createBtnSubmit() {
    let btn = document.createElement("button");
    btn.id = "submitCreateBtn";
    btn.className = "btn btn-success btnMargin";
    btn.setAttribute("onclick", "submitQuizQuestion()");
    btn.innerText = "Add Question";
    return btn;
}

//creates a clear button for the quiz creation form
function createBtnClear() {
    let btn = document.createElement("button");
    btn.className = "btn btn-info btnMargin";
    btn.setAttribute("onclick", "clearQuizCreate()");
    btn.innerText = "Clear";
    return btn; 
}

//creates a cancel button to close creation/edit window
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

//creates a table of all questions
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

//creates the header of our quiz table
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
    header3.innerText = "Edit";
    header3.setAttribute("scope", "col");
    let header4 = document.createElement("th");
    header4.innerText = "Delete";
    header4.setAttribute("scope", "col");
    tr.appendChild(header0);
    tr.appendChild(header1);
    tr.appendChild(header2);
    tr.appendChild(header3);
    tr.appendChild(header4);
    return tr;
}

//creates the body of the quiz 
function createTBody() {
    let tbody = document.createElement("tbody");
    return tbody;
}

//creates a row of the quiz
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
    tr.appendChild(createEdit(tableCount));
    tr.appendChild(createDelete(tableCount));
    return tr;
}

//creates a delete button for removing quiz question
function createDelete(counter) {
    let deleter = document.createElement("td");
    deleter.innerText = "X";
    deleter.id = "deleteQuestion" + counter;
    deleter.className = "deleteQuestion";
    deleter.setAttribute("onclick", "removeQuestion(this.id)");
    return deleter;
}
//creates a delete button for editing quiz question
function createEdit(counter) {
    let editer = document.createElement("td");
    editer.innerText = "Edit";
    editer.id = "editQuestion" + counter;
    editer.className = "editQuestion";
    editer.setAttribute("onclick", "editQuestion(this.id)");
    return editer;
}
