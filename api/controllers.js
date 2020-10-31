module.exports = function (req, res, next) {
  const controllers = ['IndexController']
  const methods = ['index', 'login', 'registration']

  return res.end(JSON.stringify({ controllers, methods }))
}