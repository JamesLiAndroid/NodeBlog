var express = require('express')
var router = express.Router()

router.get('/:name', (req, res) => {
  res.render('users', {
    name: req.params.name
  })
//  res.send('hello, ' + req.params.name)
})

router.get('/', (req, res) => {
  res.send('hello Tag:'+req.query.tag)
})

module.exports = router
