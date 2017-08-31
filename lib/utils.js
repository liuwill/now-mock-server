
exports.parseGetQuery = function (reqUrl) {
  if (reqUrl.indexOf('?') <= 0) {
    return {}
  }

  var queryStr = reqUrl.substr(reqUrl.indexOf('?') + 1)
  var queryList = queryStr.split('&')

  var queryData = {}
  var aliasMap = {
    'pn': 'index',
    'ps': 'size'
  }
  for (var i = 0; i < queryList.length; i++) {
    var paramData = queryList[i].split('=')
    var paramKey = paramData[0]
    var paramVal = paramData[1] ? paramData[1] : true
    queryData[paramKey] = paramVal

    if (aliasMap[paramKey]) {
      var aliasKey = aliasMap[paramKey]
      queryData[aliasKey] = paramVal
    }
  }

  return queryData
}

exports.parseLineData = function (fields, lineStr, separator) {
  var lineData = lineStr.split(separator)
  var contentData = {}
  for (var i = 0; i < fields.length; i++) {
    var contentKey = fields[i]
    contentData[contentKey] = lineData[i]
  }

  return contentData
}
