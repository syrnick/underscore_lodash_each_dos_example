var request = require('superagent');
var assert = require('assert');

var app = require('../express_app');

var baseUrl = 'http://localhost:3000'

var _ = require('lodash');

_.each(['lodash', 'underscore'], function(helper) {
    describe('Sample app using ' + helper, function() {
        it('accepts valid requests', function(done) {
            request
                .post(baseUrl + '/api?helper='+ helper)
                .type('json')
                .send({
                    userData: 'Some user data',
                }).end(function(err, res){
                    assert(res.status === 200);
                    done();
                });
        });
        it('rejects invalid keys', function(done) {
            request
                .post(baseUrl + '/api?helper=' + helper)
                .type('json')
                .send({
                    reservedValue: 'don\'t use it',
                }).end(function(err, res){
                    assert(res.status === 400);
                    done();
                });
        });
        it('handles objects with length attribute', function(done) {
            request
                .post(baseUrl + '/api?helper=' + helper)
                .type('json')
                .timeout(600000) // It'll need some extra time
                .send({
                    reservedValue: 'don\'t use it',
                    length: 100000000,
                }).end(function(err, res){
                    assert(res.status === 400);
                    done();
                });
        });
    });
});
