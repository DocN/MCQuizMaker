const PAGE_TITLE = "Quiz Demo";
const QUIZ_QUESTION = "quizQuestion";
const QUIZ_INPUT_CHOICE = "quizChoiceInput";

function loadView() {
    console.log("loaded");
    setTitle();
    createNavs();
    createAdminNavs();
}

function createNavs() {
    let navIndex = new NavItem("Home", "index.html");
    let navAdmin = new NavItem("Admin", "admin.html");
    createNavItem(navIndex);
    createNavItem(navAdmin);
}

function createAdminNavs() {
    let navCreateQuest = new NavItem("Create Question", "");
    createfuncLink(navCreateQuest, "showQuizCreator()");
}
function createNavItem(item) {
    let navItem = document.createElement("a");
    navItem.href = item.url;
    let t = document.createTextNode(item.title);
    navItem.appendChild(t);
    navItem.className = "navItem";
    let navbar = document.getElementById("navItems");
    navbar.appendChild(navItem);
}

function createfuncLink(item, functionCall) {
    let navItem = document.createElement("funcer");
    let t = document.createTextNode(item.title);
    navItem.appendChild(t);
    navItem.className = "navItem";
    navItem.setAttribute("onClick", functionCall);
    let navbar = document.getElementById("navItems");
    navbar.appendChild(navItem);
}

function setTitle() {
    var title = document.getElementById("title");
    title.innerText = PAGE_TITLE;
}

function showQuizCreator() {
    let addQuestionContainer = document.getElementById("addQuestionContainer");
    addQuestionContainer.style.visibility = "visible";
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

function tester() {
    console.log("test");
}