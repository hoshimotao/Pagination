const express = require('express')
const app = express()
const mongoose = require('mongoose')
const App = require('./models/App')

 mongoose.connect('mongodb://localhost/pagination')



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