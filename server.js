const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://JessieM:e5220w4xRPAzgWfB@resilientprojects-vgteu.gcp.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "fashion";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('board').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {board: result})
  })
})

app.post('/postpicture', (req, res) => {
  db.collection('board').save({name: req.body.name, pic: req.body.pic, heart: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/heart', (req, res) => {
  db.collection('board')
  .findOneAndUpdate({name: req.body.name, pic: req.body.pic}, {
    $set: {
      heart:req.body.heart + 1
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
//thumbs down API code
// app.put('/thumbDown', (req, res) => {
//   console.log(req.body)
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp - 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/postpicture', (req, res) => {
  db.collection('board').findOneAndDelete({name: req.body.name, pic: req.body.pic}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
