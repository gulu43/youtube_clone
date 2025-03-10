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



let videoCardContainer = document.getElementById("main_body_container");

async function fetchData(params) {
    let all_videos_data_arry = [];
    let video_https = "https://www.googleapis.com/youtube/v3/videos?";
    let numberOfVideosOnIntialLoad = 10;

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
                'id': video_all_data.id,
                'title': video_all_data.snippet.localized?.title || video.snippet.title,
                'channelTitle': video_all_data.snippet.channelTitle,
                'thumbnails': video_all_data.snippet.thumbnails.medium.url,
                'viewCount': video_all_data.statistics?.viewCount || "N/A",
                'publishedAt': video_all_data.snippet.publishedAt,
                'channelId': video_all_data.snippet.channelId, // Channel ID for fetching logo   
                'channelLogo': "N/A"
            };
            all_videos_data_arry.push(video_data_obj);
        });
        return all_videos_data_arry;

    } catch (error) {
        throw new Error("error: fetching", error);
    }
}

fetchData().then((vData) => {
    vData.forEach((e) => {
        console.log(e);
    })
})

// Video ID: var_name.items.[i].id
// Video Title: var_name.items.[i].snippet.localized.title
// Channel Title: var_name.items.[i].snippet.channelTitle
// Thumbnail URL: var_name.items.[i].snippet.thumbnails.medium/standard
// View Count: var_name.items.[i].statistices.viewCount
// Published At (or Published Time): var_name.items.[i].snippet.publishedAt
// Channel Logo URL: