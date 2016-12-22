var marked = require('marked')
var Post = require('../lib/mongo').Post

// 将post的content从markdown转成html
Post.plugin('contentToHtml', {
  afterFind: (posts) => {
    return posts.map((post) => {
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne: (post) => {
    if(post) {
      post.content = marked(post.content)
    }
    return post
  }
})

module.exports = {
  // 创建一篇文章
  create: (post) => {
    return Post.create(post).exec()
  },

  // 通过文章id获取一篇文章
  getPostById: (postId) => {
    return Post.findOne({ _id: postId }).populate({ path: 'author', model: 'User' })
      .addCreatedAt().contentToHtml().exec()
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的文章
  getPosts: (author) => {
    var query = {}
    if(author) {
      query.author = author
    }
    return Post.find(query).populate({ path: 'author', model: 'User'}).sort({_id: -1})
      .addCreatedAt().contentToHtml().exec()
  },

  // 通过文章id给pv加1
  incPV: (postId) => {
    return Post.update({ _id: postId}, { $inc: { pv: 1}}).exec()
  },

  // 通过文章id获取一篇原生文章（编辑文章）
  getRawPostById: (postId) => {
    return Post.findOne({ _id: postId }).populate({ path: 'author', model: 'User' }).exec()
  },

  // 通过用户id和文章id更新一篇文章
  updatePostById: (postId, author, data) => {
    return Post.update({ author: author, _id: postId }, {$set: data}).exec()
  },

  // 通过用户id和文章id删除一篇文章
  delPostById: (postId, author) => {
    return Post.remove({ author: author, _id: postId }).exec()
  }

}
