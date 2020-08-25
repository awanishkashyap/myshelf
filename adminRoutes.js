var express = require('express');
var { MongoClient } = require('mongodb');
var debug = require('debug')('app:adminRoutes');

var adminRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: "Historical Fiction",
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Discovery of India',
        genre: "Historical Fiction",
        author: 'J L Nehru',
        read: false
    },
    {
        title: 'Les Miserable',
        genre: "Historical Fiction",
        author: 'Victor Hugo',
        read: false
    }
];

function router(nav){
    adminRouter.route('/')
    .get((req, res) => {
        var url = 'mongodb://localhost:27017';
        var dbName = 'LibraryApp';

        (async function mongo() {
let client;
try{
client = await MongoClient.connect(url);
debug('Connected correctly to server');

var db= client.db(dbName);
var response = await db.collection('books').insertMany(books);
res.json(response);

}catch(err){
    debug.apply(err.stack);
}
client.close();
        }());

        //res.send('inserting books');
    });
    return adminRouter;
}

module.exports = router;