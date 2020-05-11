const menuItems = document.querySelectorAll(".menu_item");
let menuItemActive = document.querySelector(".--active");

for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", buttonClick);
}

function buttonClick() {
    if (!this.classList.contains(".--active")) {
        document.body.style.backgroundColor = `#${this.getAttribute("data-background")}`;

        menuItemActive.classList.remove("--active");
        this.classList.add("--active");

        menuItemActive.classList.add("--animate");
        this.classList.add("--animate");

        menuItemActive = this
    }
}