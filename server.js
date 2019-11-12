const express = require("express");
const app = express();
const data = require("./apps.json");
require("dotenv").config();

// "/apps" must be added to URL manually to display data
app.get("/apps", (req, res, next) => {
  let results = data.apps;
  console.log(results, "RESULTS");
  const page = Number(req.query.page) || 1; // ?page=<number> or 1 if not specified
  const max = Number(req.query.max) || 15; // &max=<number> or 15 if not specified
  const startIndex = (page - 1) * max;
  const endIndex = page * max;

  // enable the program to recognize whether there is a n next page based on page index
  if (endIndex < results.length) {
    console.log("first condition");
    results.next = {
      page: page + 1,
      max: max
    };
  }

  // enable the program to recognize whether there is a previous page based on page index
  if (startIndex > 0) {
    console.log("second condition");
    results.prev = {
      page: page - 1,
      max: max
    };
  }

  // declare an empty array to fill with a limited amount of data from whole set
  let newResult = [];

  // iterate through objects in the array up to the max
  for (let i = 0; i < max; i++) {

  //push each indexed object into newResult (array of objects)
    newResult.push(results[startIndex + i]);
  }

  // display data in ascending order
  // let asc = newResult.sort((a,b)=>{ return a.id - b.id})
  // if(req.query = "asc"){
  //   newResult=asc
  //   res.json(newResult)
  // }

  // display data in descending order
  let desc = newResult.slice(0).sort((a, b) => b.id - a.id);
  console.log(desc, "descending");
  if ((req.query = "desc")) {
    newResult = desc;
    res.json(newResult);
  }

  // show the new array of objects
  else {
    res.json(newResult);
  }
});

const port = process.env.PORT || 3000;
app.listen(port);
console.debug("Server listening on port " + port);
