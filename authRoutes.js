var express = require('express');
var { MongoClient } = require('mongodb');
var debug = require('debug')('app:adminRoutes');

var authRouter = express.Router();

function router() {
    authRouter.route('/signup')
        .post((req, res) => {
            var { username, password } = req.body;
            var url = 'mongodb://localhost:27017';
            var dbName = 'LibraryApp';

            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');
                    var db = client.db(dbName);

                    var col = db.collection('users');
                    var user = { username, password };
                    var result = await col.insertOne(user);
                    debug(result);

                } catch (err) {
                    debug(err.stack)
                }
            }());
            //debug(req.body);
            req.login(req.body, () => {
                res.redirect('/auth/profile');
            });
            //res.json(req.body);
        });
    authRouter.route('/profile')
        .get((req, res) => {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;