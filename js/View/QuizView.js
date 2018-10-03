const PAGE_TITLE = "Quiz Demo";

function loadView() {
    console.log("quiz loaded");
    setTitle();
    createNavs();

    //load overview questions
    
}

function setTitle() {
    var title = document.getElementById("title");
    title.innerText = PAGE_TITLE;
}
