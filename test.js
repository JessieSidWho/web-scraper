const axios = require("axios");
const cheerio = require("cheerio");
let $;

axios.get('https://www.nytimes.com/section/us')
    .then(function (response) {
        // console.log(response.data);
        // console.log( Object.keys(response) )
        $ = cheerio.load(response.data)
        let text;
        for (let i = 1; i < 5; i++) {
            let href = $(`#stream-panel > div.css-13mho3u > ol > li:nth-child(${i}) > div > div.css-4jyr1y > a`).attr('href');
            let title = $(`#stream-panel > div.css-13mho3u > ol > li:nth-child(${i}) > div > div.css-4jyr1y > a > h2`).text();
            let summary = $(`#stream-panel > div.css-13mho3u > ol > li:nth-child(${i}) p`).text();
            console.log(`${title}\n${summary}\n${href}\n`);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
