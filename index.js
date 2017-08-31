var fs = require('fs')

function queryData(req) {
  var queryParam = parseGetQuery(req.url)
  var dims = ""
  if (queryParam.dims) {
    dims = queryParam.dims
  }

  var fieldStr = 'vv,tv,tc,dv,dc,aa,ap,av,ac,ad,project,program,video,industry_id,os_id,device_id,province,city,browser_id,type,week,month,adtype'
  var fields = fieldStr.split(',')

  var fileUrl = `${__dirname}/data/mock.txt`
  var fileContent = fs.readFileSync(fileUrl)

  var fileLines = fileContent.toString().split('\n')
  var contentLines = []
  var separator = '\t'
  for (var i = 0; i < fileLines.length; i++) {
    var lineData = fileLines[i].split(separator)
    var contentData = {}
    for (var j = 0; j < fields.length; j++) {
      var contentKey = fields[j]
      contentData[contentKey] = lineData[j]
    }
    contentLines.push(contentData)
  }

  return {
    list: contentLines,
    total: queryParam.total ? queryParam.total : 1,
    size: queryParam.size ? queryParam.size : 10,
    index: queryParam.index ? queryParam.index : 1
  }
}

function parseGetQuery(reqUrl) {
  if (reqUrl.indexOf('?') <= 0) {
    return {}
  }

  var queryStr = reqUrl.substr(reqUrl.indexOf('?') + 1)
  var queryList = queryStr.split('&')

  var queryData = {}
  for (var i = 0; i < queryList.length; i++) {
    var paramData = queryList[i].split('=')
    var paramKey = paramData[0]
    var paramVal = paramData[1] ? paramData[1] : true
    queryData[paramKey] = paramVal
  }

  return paramData
}

module.exports = (req, res) => {
  if (req.url.startsWith('/query')) {
    return queryData(req)
  }
  return {
    date: new Date
  }
}
