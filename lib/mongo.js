var config = require('config-lite')
var Mongolass = require('mongolass')
var mongolass = new Mongolass()

mongolass.connect(config.mongodb)

exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string'},
  gender: { type: 'string', enum: ['m','f','x'] },
  bio: { type: 'string' }
})

exports.User.index({ name: 1 }, { unique: true }).exec() // 根据用户名找到用户，用户名全局唯一

exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId },
  title: { type: 'string' },
  content: { type: 'string' },
  pv: { type: 'number'}
})

exports.Post.index({ author: 1, _id: -1 }).exec() // 按照创建时间，降序查看用户的文章列表

exports.Comment = mongolass.model('Comment', {
  author: { type: Mongolass.Types.ObjectId },
  content: { type: 'string' },
  postId: { type: Mongolass.Types.ObjectId }
})

exports.Comment.index({ postId: 1, _id: 1 }).exec() // 通过文章id获取该文章下的所有留言，按创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec() // 通过用户id和留言id删除一个留言

var moment = require('moment')
var objectIdToTimestamp = require('objectid-to-timestamp')

// 根据id生成创建时间
mongolass.plugin('addCreateAt', {
  afterFind: (results) => {
    results.forEach((item) => {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },

  afterFindOne: (result) => {
    if(result) {
      result.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})
