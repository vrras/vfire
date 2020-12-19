module.exports = function (app) {
  const authService = require('../services/auth.service');

  app.route('/signup')
    .post(authService.signup);

  app.route('/signin')
    .post(authService.signin);

  app.route('/signout')
    .post(authService.signout);

  app.route('/currentUser')
    .get(authService.currentUser);

  app.route('/resetPassword')
    .post(authService.resetPassword);
};