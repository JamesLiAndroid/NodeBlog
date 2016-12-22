var express = require('express')
var router = express.Router()
var sha1 = require('sha1')

var UserModel = require('../models/users')
var checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin 登录页
router.get('/', checkNotLogin, (req,res,next) => {
  // res.send(req.flash())
  res.render('signin')
})

// POST /signin 用户登录
router.post('/', checkNotLogin, (req,res,next) => {
  var name = req.fields.name
  var password = req.fields.password

  UserModel.getUserByName(name).then((user) => {
    if(!user) {
      req.flash('error', '用户不存在')
      return res.redirect('back')
    }

    // 检查密码是否匹配
    if(sha1(password) !== user.password) {
      req.flash('error', '用户名或密码错误')
      return res.redirect('back')
    }

    req.flash('success', '登录成功')
    // 用户信息写入session
    delete user.password
    req.session.user = user
    // 跳转到主页
    res.redirect('/posts')
  })
  .catch(next)
  // res.send(req.flash())
})

module.exports = router





