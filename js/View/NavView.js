function createNavs() {
    let navIndex = new NavItem("Quiz", "quiz.html");
    let navAdmin = new NavItem("Admin", "admin.html");
    createNavItem(navIndex);
    createNavItem(navAdmin);
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
