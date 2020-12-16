(async function () {
  "use strict";

  const Vfire = require('./index');

  const vfire = new Vfire({
    apiKey: 'AIzaSyCF-YEqn_5VlEZ0noRPAbzW91cNsY313Os',
    authDomain: 'firas-tech-staging.firebaseapp.com',
    databaseURL: 'https://firas-tech-staging.firebaseio.com',
    projectId: 'firas-tech-staging',
    storageBucket: 'firas-tech-staging.appspot.com',
    messagingSenderId: '561710428134',
    appId: '1:561710428134:web:c7c7e6e0ccec263527b027',
    measurementId: 'G-Y0LTVPW3MY'
  });

  const param = {
    coll: 'test/vfire',
  };

  const { data } = await vfire.getCollection(param);

  if (data && data.key === 'vfire') {
    console.log('[PASS] all tests pass');
  } else {
    console.error('[FAIL] check your code');
  }

}());
