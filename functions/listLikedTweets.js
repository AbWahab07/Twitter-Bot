const debug = require('debug')('app:listLikedTweets');
const Twitter = require('twitter');
const config = require('../config/config');

const client = new Twitter(config);
const params = {
  screen_name: 'AbdulWahab8982'
};
client.get('favorites/list', params, (err, response) => {
  if (err) {
    debug(`Error: ${err}`);
  } else {
    // Array of objects
    // debug(response);

    // Extracting property value from array of objects using map()
    const likedTweet = response.map(tweet => tweet.text);
    debug(likedTweet);
  }
});
