const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
 app.use(express.static(path.join(__dirname,"dist","etb")));


app.get("/test",function(req,res){
  res.send("this update should work after purshing to server ");
});

// Send all requests to index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname,"dist","etb","index.html"));
});

app.listen(8080,function(){
  console.log("Server is listening on port 8080");
});
