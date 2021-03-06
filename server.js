var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/shares';

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/market', function(req,res){
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('market');
    collection.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
})

app.get('/boughtshares', function(req,res){
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('boughtshares');
    collection.find({}).toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
})

app.post('/market', function(req,res){
  // console.log('body', req.body)

  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('market');
    // collection.remove({});
    collection.insert(req.body)
    console.log(req.body);
    res.status(200).end();
    db.close();
  });
})

app.post('/boughtshares', function(req,res){
  // console.log('body', req.body)

  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('boughtshares');
    // collection.remove({});
    collection.insert(req.body)
    console.log(req.body);
    res.status(200).end();
    db.close();
  });
})

app.put('/boughtshares', function(req,res){
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('boughtshares');
    console.log(req.body);
    collection.update({'name':req.body.name},{$set:{'quantity': req.body.quantity}})
    res.status(200).end();
    db.close();
  })
})

app.delete('/market', function(req,res){

  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('market')
    collection.deleteOne(req.body)
    res.status(200).end();
    db.close();
  })
})

app.delete('/boughtshares', function(req,res){

  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('boughtshares')
    collection.deleteOne(req.body)
    res.status(200).end();
    db.close();
  })
})

// app.post('/dates', function(req,res){
//   console.log('body', req.body)
//
//   MongoClient.connect(url, function(err, db) {
//     var collection = db.collection('market');
//     // collection.remove({});
//     collection.insert(req.body)
//     console.log(req.body);
//     res.status(200).end();
//     db.close();
//   });
// })

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
