const {
  signup, signin, signout, currentUser, resetPassword
} = require('../vfire-init');
const btoa = require('btoa');

exports.signup = async function (req, res) {
  const email = req.body.email;
  const pass = req.body.password;

  await signup(email, btoa(pass));
  const currentUsers = await currentUser();

  res.json({
    message: 'Sign up successfully',
    data: {
      uid: currentUsers.uid,
    }
  });
};

exports.signin = async function (req, res) {
  const email = req.body.email;
  const pass = req.body.password;

  const userLogin = await signin(email, btoa(pass));
  const token = await userLogin.user.getIdToken();

  res.json({
    message: 'Sign in successfully',
    data: {
      token
    }
  });
};

exports.signout = async function (req, res) {
  await signout();

  res.json({
    message: 'Sign out successfully'
  });
};

exports.currentUser = async function (req, res) {
  const currentUsers = await currentUser();

  res.json({
    message: 'Current user',
    data: currentUsers
  });
};

exports.resetPassword = async function (req, res) {
  const email = req.body.email;

  await resetPassword(email);

  res.json({
    message: 'We was send email reset password, please check your email'
  });
};