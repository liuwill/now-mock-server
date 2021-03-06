var fs = require('fs')
var utils = require('./lib/utils')

function queryData (req) {
  var queryParam = utils.parseGetQuery(req.url)
  // var dims = ""
  // if (queryParam.dims) {
  //   dims = queryParam.dims
  // }
  var queryPageData = {
    total: queryParam.total ? queryParam.total : 1,
    size: queryParam.size ? queryParam.size : 10,
    index: queryParam.index ? queryParam.index : 1
  }

  var fieldStr = 'vv,tv,tc,dv,dc,aa,ap,av,ac,ad,project,program,video,industry_id,os_id,device_id,province,city,browser_id,type,week,month,adtype'
  var fields = fieldStr.split(',')

  var fileUrl = `${__dirname}/data/mock.txt`
  var fileContent = fs.readFileSync(fileUrl)

  var fileLines = fileContent.toString().split('\n')
  var contentLines = []
  var separator = '\t'

  for (var i = (queryPageData.index - 1) * queryPageData.size; i < fileLines.length; i++) {
    var contentData = utils.parseLineData(fields, fileLines[i], separator)
    contentLines.push(contentData)

    if (contentLines.length >= queryPageData.size) {
      break
    }
  }

  return {
    list: contentLines,
    total: fileLines.length,
    size: parseInt(queryPageData.size),
    index: parseInt(queryPageData.index)
  }
}

module.exports = (req, res) => {
  if (req.url.startsWith('/query')) {
    return queryData(req)
  }
  return {
    date: new Date()
  }
}
