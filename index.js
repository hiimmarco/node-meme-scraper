// Import node-fetch for fetching the html

import cheerio from 'cheerio';
import fetch from 'node-fetch';

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app',
);
const body = await response.text();

console.log(body);

let $ = cheerio.load(body);
