const express = require('express')
const app = express()
const data = require("./apps.json")
require('dotenv').config();
const http = require('http');

app.get('/', (req, res, next) =>{
  
    console.log(data.apps)  
    console.log("hi")

    const results = data
    const page = Number(req.query.page) || 1 // ?page=<number>
    const max = Number(req.query.max) || 15 // &max=<number>
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

const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.listen(port);
console.debug('Server listening on port ' + port);


