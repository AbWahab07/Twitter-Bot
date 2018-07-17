const debug = require('debug')('app:likeTweet');
const Twitter = require('twitter');
const config = require('../config/config');

const client = new Twitter(config);

const params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
};

client.get('search/tweets', params, (error, data) => {
  if (!error) {
    // debug(data); // returns an array of multiple tweets via the data.statuses object
    for (let i = 0; i < data.statuses.length; i += 1) {
      // Get the tweet Id from the returned data
      const id = { id: data.statuses[i].id_str };
      // debug(id);

      // Try to Favorite the selected Tweet
      client.post('favorites/create', id, (err, response) => {
        // If the favorite fails, log the error message
        if (err) {
          debug(`Error ${err[0].message}`);
        }
        // If the favorite is successful, log the url of the tweet
        else {
          // debug(response);
          const username = response.user.screen_name;
          const tweetId = response.id_str;
          debug('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`);
        }
      });
    }
  } else {
    debug(error);
  }
});
