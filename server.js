const express = require('express')
const app = express()
const data = require("./apps.json")
require('dotenv').config();

app.get('/apps', (req, res, next) =>{
  
    console.log(data.apps)  
    console.log("hi")

    const results = data
    const page = Number(req.query.page) || 1
    const max = Number(req.query.max) || 50
    const startIndex = (page - 1) * max
    const endIndex = page * max   

    if(endIndex < data.apps.length){
      console.log('first condition')
      results.next = {
        page: page + 1,
        max: max
    }
  }
    if(startIndex > 0){
      console.log("second condition")
      results.prev = {
        page: page - 1,
        max: max
    }
  }

  let newResult = [];
  
    for(let i = 0; i< max; i++) {
      newResult.push(data.apps[startIndex + i])
    }

  res.json(newResult) 

  

})

app.listen(3000)


