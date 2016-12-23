var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var flash = require('connect-flash')
var config = require('config-lite')
var routes = require('./routes')
var pkg = require('./package')

var winston = require('winston')
var expressWinston = require('express-winston')

var app = express()

// 指定模板目录和加载模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
// session中间件，通过express-session组件实现
app.use(session({
  resave: false,
  saveUninitialized: true,
  name: config.session.key,
  secret: config.session.secret,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}))
// flash中间件，用来显示通知
app.use(flash())

// 处理表单以及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true // 保留后缀
}))

// 设置模板全局变量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模板必须的三个变量
app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
})

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'log/success.log'
    })
  ]
}))
// 路由
routes(app)
// 错误请求日志
app.use(expressWinston.errorLogger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'log/error.log'
    })
  ]
}))

// 错误处理
app.use((error, req, res, next) => {
  res.render('error', {
    error: error
  })
})

// 监听端口，启动程序
app.listen(config.port, () => {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
