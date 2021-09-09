// Import node-fetch for fetching the html

import cheerio from 'cheerio';
import fetch from 'node-fetch';

// Fetch the HTML

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app',
);
const body = await response.text();

// Pass HTML to cheerio to get URLs
/*
let $ = cheerio.load(body);
let imageSource = $('div img').attr('src');

console.log(imageSource);
*/

/* Here I tried a function that loops over the URLs, but only get the same first URL 10 times.
function getTenUrls() {
  for (let i = 0; i < 10; i++) {
    let $ = cheerio.load(body);
    let imageSource = $('div img').attr('src');
    console.log(imageSource);
  };
};
const tenUrls = getTenUrls();
*/

let $ = cheerio.load(body);

function getUrls() {
  $('img').each((i, el) => {
    const tenUrls = $(el).attr('src');
    console.log(tenUrls);
    return tenUrls;
  });
}

getUrls();
