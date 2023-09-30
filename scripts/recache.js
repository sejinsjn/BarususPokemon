const https = require('https');

module.exports = async (req, res) => {
  https.get('https://barusu.vercel.app/sheet/searchbar', (response) => {
    let data = '';

    // A chunk of data has been received.
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    response.on('end', () => {
      console.log(data);
      // Your code to recache data goes here
      res.status(200).send('Data recached successfully');
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
};
