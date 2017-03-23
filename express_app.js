// Adapted  https://expressjs.com/en/starter/hello-world.html

var express = require('express')
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.json());

// Only allow requests where all keys are prefixed with "user"

app.post('/api', function (req, res) {
    var _;
    if (req.query.helper === 'lodash') {
        _ = require('lodash');
    } else if (req.query.helper === 'underscore') {
        _ = require('underscore');
    } else {
        res.status(400).json({
            error: 'invalid helper',
        });
    }

    var invalidKeys = [];
    _.each(req.body, function(value, key) {
        if (!/user/.test(key)) {
            invalidKeys.push(key);
        }
    });

    if (!_.isEmpty(invalidKeys)) {
        res.status(400).json({
            error: 'Invalid keys',
            invalidKeys: invalidKeys,
        });
    } else {
        res.json({status: 'success!'});
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
