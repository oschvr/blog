var remark_config = {
  host: 'http://54.163.185.130', // hostname of remark server, same as REMARK_URL in backend config, e.g. "https://demo.remark42.com"
  site_id: '23082020',
  components: ['embed', 'last-comments', 'counter'], // optional param; which components to load. default to ["embed"]
  // to load all components define components as ['embed', 'last-comments', 'counter']
  // available component are:
  //     - 'embed': basic comments widget
  //     - 'last-comments': last comments widget, see `Last Comments` section below
  //     - 'counter': counter widget, see `Counter` section below
  url: 'http://54.163.185.130', // optional param; if it isn't defined
  // `window.location.origin + window.location.pathname` will be used,
  //
  // Note that if you use query parameters as significant part of url
  // (the one that actually changes content on page)
  // you will have to configure url manually to keep query params, as
  // `window.location.origin + window.location.pathname` doesn't contain query params and
  // hash. For example default url for `https://example/com/example-post?id=1#hash`
  // would be `https://example/com/example-post`.
  //
  // The problem with query params is that they often contain useless params added by
  // various trackers (utm params) and doesn't have defined order, so Remark treats differently
  // all this examples:
  // https://example.com/?postid=1&date=2007-02-11
  // https://example.com/?date=2007-02-11&postid=1
  // https://example.com/?date=2007-02-11&postid=1&utm_source=google
  //
  // If you deal with query parameters make sure you pass only significant part of it
  // in well defined order
  max_shown_comments: 10, // optional param; if it isn't defined default value (15) will be used
  theme: 'light', // optional param; if it isn't defined default value ('light') will be used
  page_title: 'oschvr.com', // optional param; if it isn't defined `document.title` will be used
  locale: 'en', // set up locale and language, if it isn't defined default value ('en') will be used
  show_email_subscription: false, // optional param; by default it is `true` and you can see email subscription feature
  // in interface when enable it from backend side
  // if you set this param in `false` you will get notifications email notifications as admin
  // but your users won't have interface for subscription
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
