var express = require('express')
var app = express()

app.get('/', (req, res) => {
  res.send('hello, express')
})

app.get('/name/:name', (req,res) => {
  res.send('hello,'+req.params.name)
})

app.get('/tag', (req,res) => {
  res.send('hello tag:'+req.query.tag)
})

app.listen(3000)
