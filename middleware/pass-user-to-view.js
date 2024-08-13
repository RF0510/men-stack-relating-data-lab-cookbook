// middleware/pass-user-to-view.js
function passUserToView(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null; // or you could simply skip this line
  }
  next();
}

module.exports = passUserToView;
