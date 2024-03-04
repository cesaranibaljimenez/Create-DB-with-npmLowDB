var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

// init the data store
// ---------------------------
db.defaults({posts: []}).write();

// add post
// ----------------------------

//db.get (´posts')
  //.push({id:1, title: 'lowdb is awesome', published: true})
  //.write()

  //db.get (´posts')
  //.push({id:2, title: 'great', published: true})
  //.write()

  //db.get (´posts')
  //.push({id:1, title: 'new own', published: true})
  //.write()

  //db.get (´posts')
  //.push({id:1, title: 'random', published: true})
  //.write()

 //console.log(db.get('posts').value());

// count posts
// ----------------------------
//const postCount = db.get('posts').size().value();
//console.log(`Número de publicaciones: ${postCount}`);

// find all posts ids
// ----------------------------
//console.log("IDs de todos los posts:", db.get('posts').map('id').value());

// all matches of published false
// ----------------------------
var unPublishedPost = db.get('posts').filter({published : false}).value(); 
console.log("Post no publicados:", unPublishedPost);
// find post with published false
// ----------------------------
// YOUR CODE
