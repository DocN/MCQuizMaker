const PAGE_TITLE = "Quiz Demo";

function setTitle() {
    var title = document.getElementById("title");
    title.innerText = PAGE_TITLE;
}

function createQuiz() {
    let quizContainer = document.getElementById("quizContainer");
    
    for(let i =0; i < questions.length; i++) {
        let currentQuest = document.createElement("p");
        currentQuest.innerText = (Number(i) + 1) + " " + questions[i].question;
        
        quizContainer.appendChild(currentQuest);
        let currentForm = createRadioAns(questions[i]);
        quizContainer.appendChild(currentForm);
    }
}

function createRadioAns(question) {
    let questionview = document.createElement("div");
    let form = createForm();
    for(let i =0; i < question.choices.length; i++) {
        let radio = createRadioBtns(i);
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
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "choice");
    radio.id = "radioCheck" + choiceNumber;
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
