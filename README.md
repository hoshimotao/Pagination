# Pagination

Build an application that returns data based on URL queries within "/app" get route. Break down a JSON array into paginated segments
based on the URL parameters set forth by the consumer.

Add "/apps" to the end of the URL and "/", followed by the params you'd like to view. Example: "/apps/?page=1&max=5" to show the first
5 elements in the array. 

I created constants for the page numbers, a max amount of objects to be displayed, a starting index, and an ending index.

Also, in order to keep track of which page held which objects, I made a couple if statements to hold the previous and next page, depending
on the current page number.

I wanted to add ascending and descending order functionality, but was unable to do so without commenting one or the other out.

The following will display a list of objects in descending "id" order:

  // let asc = newResult.sort((a,b)=>{ return a.id - b.id})
  // if(req.query = "asc"){
  //   newResult=asc
  //   res.json(newResult) 
  // }   
  
  let desc = newResult.slice(0).sort((a,b) => b.id - a.id);
  console.log(desc, "descending")
  if(req.query = "desc"){
    newResult=desc
    res.json(newResult) 
  }
  
  Still much to learn but I feel so close to solving this! 
  
  
  
