var express = require('express');
var bookRouter = express.Router();
var { MongoClient, ObjectID } = require('mongodb');
var debug = require('debug')('app:bookRoutes');

function router(nav){
    
    bookRouter.route('/')
        .get((req, res) => {
            var url = 'mongodb://localhost:27017';
        var dbName = 'LibraryApp';

        (async function mongo() {
let client;
try{
client = await MongoClient.connect(url);
debug('Connected correctly to server');

var db= client.db(dbName);
var col = await db.collection('books');

var books = await col.find().toArray();

            res.render(
                'bookListView',
                {
                    nav,
                    title: 'Library',
                    books
                }
                );
        }catch(err){
debug(err.stack);
        }
        client.close();
    }());
});
    
    bookRouter.route('/:id')
        .get((req, res) => {
            //var id = req.params.id;
            var {id} = req.params;
            var url = 'mongodb://localhost:27017';
            var dbName = 'LibraryApp';

(async function mongo(){
    let client;
try{
client = await MongoClient.connect(url);
debug('Connected correctly to server');

var db= client.db(dbName);
var col = await db.collection('books');
var book = await col.findOne({_id: new ObjectID(id)});
debug(book);
res.render(
    'bookView',
    {
        nav,
        title: 'Library',
        book
    });

}catch(err){
    debug(err.stack);
}
}());
            
        });
        return bookRouter;
}




    module.exports = router;