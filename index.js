// Import node-fetch for fetching the HTML
// Import cheerio for parsing the HTML
// Import image downloader to download image to folder

import cheerio from 'cheerio';
import download from 'image-downloader';
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

// console.log(tenImageLinks);

// Download images to folder

const options = {
  url: 'https://api.memegen.link/images/keanu.jpg?width=300',
  dest: './memes', // will be saved to ./memes/image.jpg
};

download
  .image(options)
  .then(({ filename }) => {
    console.log('Saved to', filename); // saved to ./memes/image.jpg
  })
  .catch((err) => console.error(err));
