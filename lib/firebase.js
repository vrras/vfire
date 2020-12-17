const { FireSQL } = require('firesql');
const firebase = require('firebase/app').default;
require('firesql/rx');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

function init(config) {
  if (firebase.app.length) {
    firebase.initializeApp(config);
  }

  return { firebase, FireSQL };
};

module.exports = init;
