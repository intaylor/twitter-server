/**
 * Created by TaylorWei on 2020-04-12.
 */
const Twitter = require('twitter');
const config = require('./config.js');
//const T = new Twitter(config);

const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// read tweets
app.get('/tweet/:handle', (req, res) => {
    var params = {
        q: req.params.handle,
        count: 10,
        result_type: 'recent',
        lang: 'en'
    };

    T = new Twitter(config);

    T.get('search/tweets', params, (err, data, response) => {
        // If there is no error, proceed
        if(err){
            return console.log(err);
        }

        res.send(data);

    });

});

// test api
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Listen to the proceee env port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
