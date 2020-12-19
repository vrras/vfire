module.exports = function (app) {
  const firestoreService = require('../services/firestore.service');

  app.route('/addDocument')
    .post(firestoreService.addDocument);

  app.route('/updateDocument')
    .post(firestoreService.updateDocument);

  app.route('/deleteDocument')
    .post(firestoreService.deleteDocument);

  app.route('/deleteDocumentBatch')
    .post(firestoreService.deleteDocumentBatch);

  app.route('/getCollection')
    .get(firestoreService.getCollection);

  app.route('/rawQueryPromise')
    .get(firestoreService.rawQueryPromise);

  app.route('/rawQueryObservable')
    .get(firestoreService.rawQueryObservable);
};