const express = require('express')
const app = express()
const mongoose = require('mongoose')
const App = require('./models/App')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI
MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   client.close();
});

 mongoose.connect('mongodb://localhost/pagination', { useUnifiedTopology: true , useNewUrlParser: true })

 const db = mongoose.connection
 db.once('open', async () => {
   if(await App.countDocuments().exec() > 0) return


  //  Promise.all([
     App.create({ name: 'my-app-001' }),
     App.create({ name: 'my-app-002' }),
     App.create({ name: 'my-app-003' }),
     App.create({ name: 'my-app-004' }),
     App.create({ name: 'my-app-005' }),
     App.create({ name: 'my-app-006' }),
     App.create({ name: 'my-app-007' }),
     App.create({ name: 'my-app-008' }),
     App.create({ name: 'my-app-009' }),
     App.create({ name: 'my-app-010' }),
     App.create({ name: 'my-app-011' }),
     App.create({ name: 'my-app-012' }),
     App.create({ name: 'my-app-013' }),
     App.create({ name: 'my-app-014' }),
     App.create({ name: 'my-app-015' })
  //  ])
  .then(() => console.log('Added Apps'))
 })

app.get('/apps', pagination(App), (req, res, next) =>{
  res.json(res.pagination) 

})

function pagination(model) {
  return (req,res,next) => {

  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit   
  const results = {}

  if(endIndex < model.length){
    results.next = {
      page: page + 1,
      limit: limit
  }
}

  if(startIndex > 0){

    results.prev = {
      page: page - 1,
      limit: limit
  }
}

results.results = model.slice(startIndex, endIndex)
  res.pagination = results  
  next()    
    }
  }
 


  



app.listen(3000)