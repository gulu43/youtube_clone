import YOUR_API_KEY from "./API_CONSTANTS.js";


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




const videoCardContainer = document.getElementById("main_body_container");
const video_https = "https://www.googleapis.com/youtube/v3/videos?";
const numberOfVideosOnIntialLoad = 20;

const generateQueryParam = new URLSearchParams({
    key: YOUR_API_KEY,
    part: "snippet, contentDetails",
    chart: "mostPopular",
    maxResults: numberOfVideosOnIntialLoad,
    regionCode: "IN",
});



// console.log(video_https+generateQueryParam);

fetch(video_https + generateQueryParam)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));