var express = require('express')
var router = express.Router()

var checkLogin = require('../middlewares/check').checkLogin
var PostModel = require('../models/posts')
// GET /posts 所有用户或者特定用户的文章页
// //   eg: GET /posts?author=xxx
router.get('/', (req,res,next) => {
  res.render('posts')
//  res.send(req.flash())
})

// POST /posts 发表一篇文章
router.post('/', checkLogin, (req,res,next) => {
  var author = req.session.user._id
  var title = req.fields.title
  var content = req.fields.content

  // 校验参数
  try {
    if(!title.length) {
      throw new Error('请填写标题')
    }
    if(!content.length) {
      throw new Error('请填写内容')
    }
  } catch(e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  var post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  }

  PostModel.create(post)
    .then((result) => {
      // 此post是插入mongodb之后的值
      post = result.ops[0]
      req.flash('success', '发表成功')
      // 发表成功后跳转到该文章页面
      res.redirect('/posts/${post._id}')
    })
    .catch(next)
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, (req,res,next) => {
  res.render('create')
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', (req,res,next) => {
  res.send(req.flash())
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, (req,res,next) => {
  res.send(req.flash())
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, (req,res,next) => {
  res.send(req.flash())
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, (req,res,next) => {
  res.send(req.flash())
})

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, (req,res,next) => {
  res.send(req.flash())
})

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, (req,res,next) => {
  res.send(req.flash())
})

module.exports = router































