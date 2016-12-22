var express = require('express')
var router = express.Router()

var checkLogin = require('../middlewares/check').checkLogin

// GET /signout 登出
router.get('/', checkLogin, (req,res,next) => {
//   res.send(req.flash())
  // 清空session中的用户信息
  req.session.user = null
  req.flash('success', '登出成功')
  // 登出成功后跳转主页
  res.direct('/posts')
})

module.exports = router




