// Get elements
let leftMenuBtn = document.querySelector('#slid_btn');
let leftMenu = document.querySelector('#left_menu');
let bottomPart = document.querySelector('#bottom_part');

// Toggle sidebar
leftMenuBtn.addEventListener('click', () => {
    leftMenu.classList.toggle('shrink');

    if (leftMenu.classList.contains('shrink')) {
        bottomPart.style.gridTemplateColumns = "90px 1fr"; // Sidebar shrinks
    } else {
        bottomPart.style.gridTemplateColumns = "250px 1fr"; // Sidebar expands
    }
});
