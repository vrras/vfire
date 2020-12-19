const { 
  addDocument, getCollection, updateDocument, deleteDocument, rawQuery, deleteDocumentBatch 
} = require('../vfire-init');
require('dotenv').config();

exports.addDocument = async function (req, res) {
  const body = req.body;

  // Request body
  // {
  //   "coll": "test",
  //   "data": {
  //     "fullname": "John Doe",
  //     "email": "john.doe@mail.com",
  //     "phone": "08923783298",
  //     "address": "South Caroline"
  //   }
  // }

  const params = {
    coll: body.coll,
    data: body.data
  }
  const resStore = await addDocument(params);

  res.json({
    message: resStore,
  });
};

exports.updateDocument = async function (req, res) {
  const body = req.body;

  // Request body
  // {
  //   "coll": "test",
  //     "data": {
  //     "key": "vfire",
  //     "fullname": "John Doe Yui"
  //   }
  // }

  const params = {
    coll: body.coll,
    data: body.data
  }
  const resStore = await updateDocument(params);

  res.json({
    message: resStore,
  });
};

exports.deleteDocument = async function (req, res) {
  const body = req.body;

  // Request body
  // {
  //   "coll": "test",
  //   "data": {
  //     "key": "vfire"
  //   }
  // }

  const params = {
    coll: body.coll,
    data: body.data
  }
  const resStore = await deleteDocument(params);

  res.json({
    message: resStore,
  });
};

exports.deleteDocumentBatch = async function (req, res) {
  const body = req.body;

  // Request body
  // {
  //   "coll": "test",
  //   "filters": {
  //     "field": "fullname",
  //     "operator": "==",
  //     "value": "John Doe"
  //   }
  // }

  const params = {
    coll: body.coll,
    filters: body.filters
  }
  const resStore = await deleteDocumentBatch(params);

  res.json({
    message: resStore,
  });
};

exports.getCollection = async function (req, res) {
  const body = req.body;

  // Request body
  // {
  //   "coll": "test",
  //   "filters": [
  //     {
  //       "field": "fullname",
  //       "operator": "==",
  //       "value": "John Doe"
  //     }
  //   ],
  //   "order": {
  //     "field": "fullname",
  //     "sort": "asc"
  //   },
  //   "limit": 1
  // }

  const params = {
    coll: body.coll,
    filters: body.filters,
    order: body.order,
    limit: body.limit
  }

  const resStore = await getCollection(params);

  res.json({
    message: resStore,
  });
};

exports.rawQueryPromise = async function (req, res) {
  const rq = rawQuery(`
  SELECT
    *
  FROM
    __coll__
  WHERE
    fullname = $1
    AND email = $2`, 'test', ['John Doe', 'john.doe@mail.com'], false);

  rq.then(data => {
    res.json({
      message: data,
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.rawQueryObservable = async function (req, res) {
  const rq = rawQuery(`
  SELECT
    *
  FROM
    __coll__
  WHERE
    fullname = $1
    AND email = $2`, 'test', ['John Doe', 'john.doe@mail.com'], true);

  rq.subscribe(data => {
    res.json({
      message: data,
    });
  }, err => {
    console.log('Error rawQuery: ', err);
  });
};
