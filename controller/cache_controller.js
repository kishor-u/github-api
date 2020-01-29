var mcache = require('memory-cache');

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__github__' + req.body.org
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.json(JSON.parse(cachedBody));
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      }
      next()
    }
  }
}
module.exports = cache;