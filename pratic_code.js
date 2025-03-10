let p = new Promise((resolve, reject) => {
    resolve();
})
p.then(() => {
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
    let res = new Promise((resolve) => {
        // default resolve
        fetch(video_https + generateQueryParam)
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < numberOfVideosOnIntialLoad; i++) {
                    let video = data.items[i]; // Correct property access

                    let obj = {
                        'id': video.id,
                        'vtitle': video.snippet.localized?.title || video.snippet.title,
                        'ctitle': video.snippet.channelTitle,
                        'turl': video.snippet.thumbnails.medium.url,
                        'views': video.statistics?.viewCount || "N/A",
                        'ptime': video.snippet.publishedAt,
                        'channelLogo': ""
                    };

                    all_videos_data_arry.push(obj);
                }
                resolve(all_videos_data_arry);
                

            }).catch((err) => console.log(err));
    }).then((a) => {
        // console.log(a);
        
        return a;
    })
    return res;

}).then((allData) => {
    // this will run adter arry is populated
    allData.forEach((ele) => {
        console.log(ele);
    })
})