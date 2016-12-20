// var path = require('path')
var express = require('express')
var app = express()

app.use((req, res, next) => {
  console.log(1)
  next(new Error('hhh'))
})

app.use((req, res, next) => {
  console.log(2)
  res.status(200).end()
})
/*

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

// 设置存放模板的目录，添加模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/user', usersRouter)

*/
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
