// add http server

const express = require ('express');
const app = express();
const port = 3000;
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ posts: []}).write();

// list posts
app.get('/data', function(req, res){     

    res.send(db.get('posts').value());

});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
// ----------------------------------------------------
app.get('/posts/:title/:id/:published', function(req, res) {
    var post ={
        'id': parseInt(req.params.id),
        'title': req.params.title,
        'published' : req.params.published,
    }
    db.get('posts').push(post).write();
    console.log(db.get('posts').value());
    res.send(db.get('posts').value());
});

// ----------------------------------------------------
// filter by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------
    app.get('/published/:boolean', function(req, res) {
    const { boolean } = req.params;
    const publishedPosts = db.get('posts').filter({ published: boolean === 'true' }).value();
    res.send(publishedPosts);
});

// ----------------------------------------------------
// update published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
    app.get('/published/:id/:boolean', function(req, res) {
    const { id, boolean } = req.params;
    db.get('posts')
      .find({ id: parseInt(id) })
      .assign({ published: boolean === 'true' })
      .write();
    res.send(`Published status updated for post with id ${id}`);
});

// ----------------------------------------------------
// delete entry by id - test using:
//      curl http://localhost:3000/delete/6
// ----------------------------------------------------
    app.get('/delete/:id', function(req, res) {
    const { id } = req.params;
    // Eliminar post con ID nulo o no númerico
    if(isNaN(id)){
        db.get('posts').remove({id: null}).write();
        res.send(`Post with id ${id} deleted successfully.`);
    }else{
        db.get('posts').remove({ id: parseInt(id) }).write();
        res.send(`Post with id ${id} deleted successfully.`);
    }
    
});





// start server
// -----------------------
app.listen(port, function(){
    console.log(`Running on port ${port}!`);
});
