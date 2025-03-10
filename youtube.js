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

let length_roe_and_videous = 12;
async function fetchData(params) {
    let all_videos_data_arry = [];
    let video_https = "https://www.googleapis.com/youtube/v3/videos?";
    let numberOfVideosOnIntialLoad = length_roe_and_videous;

    let generateQueryParam = new URLSearchParams({
        key: YOUR_API_KEY,
        part: "snippet, statistics, contentDetails",
        chart: "mostPopular",
        maxResults: numberOfVideosOnIntialLoad,
        regionCode: "IN",
    });

    try {
        let videos_link = await fetch(video_https + generateQueryParam);
        let data = await videos_link.json();

        data.items.forEach(video_all_data => {
            let video_data_obj = {
                'id': video_all_data.id || "No ID",
                'title': video_all_data.snippet.localized?.title || video_all_data.snippet.title || "No Title",
                'channelTitle': video_all_data.snippet.channelTitle || "Unknown Channel",
                'thumbnails': video_all_data.snippet.thumbnails?.medium?.url || "./img/default_thumbnail.jpg",
                'viewCount': video_all_data.statistics?.viewCount || "N/A",
                'publishedAt': video_all_data.snippet.publishedAt || "Unknown Date",
                'channelId': video_all_data.snippet.channelId || "No Channel ID",
                'channelLogo': "N/A" // You need to fetch this separately using channelId
            };
            all_videos_data_arry.push(video_data_obj);
        });
        return all_videos_data_arry;

    } catch (error) {
        throw new Error("error: fetching", error);
    }
}

fetchData().then((vData) => {
    // dom
    let videoCardContainer = document.getElementById("main_body_container");
    let numberOfRows = Math.ceil(length_roe_and_videous / 3);
    videoCardContainer.style.gridTemplateRows = `repeat(${numberOfRows}, ${360}px)`;

    // empty
    videoCardContainer.innerHTML = ""; 
    vData.forEach((e) => {
        let videoCard = document.createElement("div");
        videoCard.classList.add("video_card");

        videoCard.innerHTML = `
            <div class="video_thumbnail_div"><img class="video_thumbnail" src="${e.thumbnails}" alt="Thumbnail"></div>
            <div class="video_title">${e.title}</div>
            <div class="video_channel">${e.channelTitle}</div>
            <div class="video_Views_PublishedAtCount">
            <div class="video_views">${e.viewCount}</div> * <div class="video_publishedAt">${e.publishedAt}</div>
            </div> 
        `;
        videoCardContainer.appendChild(videoCard);
    });
})

























// Video ID: var_name.items.[i].id
// Video Title: var_name.items.[i].snippet.localized.title
// Channel Title: var_name.items.[i].snippet.channelTitle
// Thumbnail URL: var_name.items.[i].snippet.thumbnails.medium/standard
// View Count: var_name.items.[i].statistices.viewCount
// Published At (or Published Time): var_name.items.[i].snippet.publishedAt
// Channel Logo URL: