var remark_config = {
  host: 'http://54.163.185.130', // hostname of remark server, same as REMARK_URL in backend config, e.g. "https://demo.remark42.com"
  site_id: '23082020',
  components: ['counter'],
}

;(function(c) {
  for (var i = 0; i < c.length; i++) {
    var d = document,
      s = d.createElement('script')
    s.src = remark_config.host + '/web/' + c[i] + '.js'
    s.defer = true
    ;(d.head || d.body).appendChild(s)
  }
})(remark_config.components || ['embed'])
