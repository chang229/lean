// 兼容类似 CommonJS 规范
define(function (require, exports, module) {
  var $ = require('jquery')
  module.exports = function () {
    console.log('module 2~')
    $('body').append('<p>module2</p>')
  }
})
