export class Mrbr_UI_Navigation_NavBar {
    constructor() {
        let navbar = document.createElement("nav");
        ["navbar", "navbar-expand-md", "navbar-dark", "bg-dark", "mb-4"].forEach(entry => navbar.classList.add(entry));

        document.body.appendChild(navbar);
    }
}
