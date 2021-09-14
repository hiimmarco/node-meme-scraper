// Import node-fetch for fetching the HTML
// Import cheerio for parsing the HTML

import fs from 'node:fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

// Fetch the HTML

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app',
);
const body = await response.text();

const $ = cheerio.load(body);

// Declare a new array to save all image URLs from the website

const imageLinks = [];

// Get only the imageURLs and push them into the newly created array "tenLinks"

$('img').each((i, el) => {
  const allUrls = $(el).attr('src');
  // console.log(allUrls);
  imageLinks.push(allUrls);
});

// Reduce the array to 10 URLs

const tenImageLinks = imageLinks.slice(0, 10);

// Create folder for images

const folder = './memes';

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

// Create function for download

for (let i = 0; i < tenImageLinks.length; i++) {
  const imageDownload = async () => {
    const serverResponse = await fetch(tenImageLinks[i]);
    const images = await serverResponse.buffer();
    fs.writeFile(`./memes/meme-${i + 1}.jpg`, images, () => {
      console.log(`
      Download of image ${i + 1} successful.`);
    });
  };

  // Start download function

  imageDownload();
}
