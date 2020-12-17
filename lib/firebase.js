const { FireSQL } = require('firesql');
const firebase = require('firebase/app').default;
require('firesql/rx');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

function init(config) {
  if (firebase.app.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  return { firebase, FireSQL };
};

module.exports = init;
