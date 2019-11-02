const express = require('express')
const app = express()

const apps = [
  { id: 1, name: "my-app-001"},
  { id: 2, name: "my-app-002"},
  { id: 3, name: "my-app-003"},
  { id: 4, name: "my-app-004"},
  { id: 5, name: "my-app-005"},
  { id: 6, name: "my-app-006"},
  { id: 7, name: "my-app-007"},
  { id: 8, name: "my-app-008"},
  { id: 9, name: "my-app-009"},
  { id: 10, name: "my-app-0010"},
  { id: 11, name: "my-app-0011"},
  { id: 12, name: "my-app-0012"},
  { id: 13, name: "my-app-0013"},
  { id: 14, name: "my-app-0014"},
  { id: 15, name: "my-app-0015"}
]

 
app.get('/apps', pagination(apps), (req, res, next) =>{
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