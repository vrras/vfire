const { FireSQL } = require('firesql');
const firebase = require('firebase/app').default;
require('firesql/rx');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

function init(config) {
  try {
    firebase.initializeApp(config)
  } catch (err) {
    // we skip the “already exists” message which is
    // not an actual error when we’re hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error raised', err.stack)
    }
  }

  return { firebase, FireSQL };
};

module.exports = init;
