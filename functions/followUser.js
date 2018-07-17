const debug = require('debug')('app:followUser');
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
      const { screen_name } = data.statuses[i].user;
      // debug(screen_name);

      // Try to Follow a user
      // we've to pass exactly {screen_name}
      client.post('friendships/create', { screen_name }, (err, response) => {
        // If the favorite fails, log the error message
        if (err) {
          debug(`Error ${err[0].message}`);
        }
        // If the favorite is successful, log the url of the tweet
        else {
          debug(screen_name, ': **FOLLOWED**');
        }
      });
    }
  } else {
    debug(error);
  }
});
