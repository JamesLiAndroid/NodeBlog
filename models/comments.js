var marked = require('marked')
var Comment = require('../lib/mongo').Comment

// 将comment的content从markdown转成html
Comment.plugin('contentToHtml', {
  afterFind: (comments) => {
    return comments.map((comment) => {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

module.exports = {
  // 创建一个留言
  create: (comment) => {
    return Comment.create(comment).exec()
  },

  // 通过用户id和留言id删除一条留言
  delCommentById: (commentId, author) => {
    return Comment.remove({ author: author, _id: commentId }).exec()
  },
  // 通过文章id删除该文章下的所有留言
  delCommentsByPostId: (postId) => {
    return Comment.remove({ postId: postId }).exec()
  },

  // 通过文章id获取该文章下的所有留言，按留言时间升序
  getComments: (postId) => {
    return Comment.find({ postId: postId }).populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 }).addCreateAt().contentToHtml().exec()
  },

  // 通过文章id获取该文章下的留言数量
  getCommentsCount: (postId) => {
    return Comment.count({ postId: postId }).exec()
  }
}
