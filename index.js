var express = require('express')
var app = express()

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/user', usersRouter)
/*
app.get('/', (req, res) => {
  res.send('hello, express')
})

app.get('/name/:name', (req,res) => {
  res.send('hello,'+req.params.name)
})

app.get('/tag', (req,res) => {
  res.send('hello tag:'+req.query.tag)
})
*/
app.listen(3000)
