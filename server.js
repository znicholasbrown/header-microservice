
var express = require('express');
var app = express();

app.get("/", function (req, res) {
  let ipregex = /[,]/g,
      lanregex = /[,]/g,
      softregex = /\(([^\)]+)\)/;
  
  let ipaddress = req.headers['x-forwarded-for'],
      language = req.headers['accept-language'], 
      software = req.headers['user-agent'];

  let object = {
    "ipaddress": ipaddress.slice(0, ipregex.exec(ipaddress).index),
    "language": language.slice(0, lanregex.exec(language).index),
    "software": software.match(softregex)[1]
  };
  
  res.send(object);
});


var listener = app.listen(process.env.PORT);
