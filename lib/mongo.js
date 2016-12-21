var config = require('config-lite')
var Mongolass = require('mongolass')
var mongolass = Mongolass()

mongolass.connect(config.mongodb)
