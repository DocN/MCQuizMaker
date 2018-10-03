var questions = [];

function loadView() {
    console.log("quiz loaded");
    setTitle();
    createNavs();
    loadStorage();
    createQuiz();
    //load overview questions
    
}
function loadStorage() {
    questions = JSON.parse(localStorage.getItem('quiz'));
    if(questions == null) {
        questions = [];
    }
    console.log(questions);
}