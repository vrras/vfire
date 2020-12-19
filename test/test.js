const assert = require('assert');
const Vfire = require('../lib/vfire');
require('dotenv').config();

describe('Vfire tests', function () {
  describe('signup()', function () {
    it('should return uid and isNewUser true', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      const res = await vfire.signup(process.env.EMAIL, process.env.PASSWORD);
      assert.notEqual(res.user.uid, null);
    });
  });

  describe('signin()', function () {
    it('should return uid in currentUser is not null', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      await vfire.signin(process.env.EMAIL, process.env.PASSWORD);
      const currentUser = await vfire.currentUser();
      assert.notEqual(currentUser, null);
    });
  });

  describe('signout()', function () {
    it('should return currentUser is null', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      await vfire.signout();
      const currentUser = await vfire.currentUser();
      assert.equal(currentUser, null);
    });
  });

  describe('resetPassword()', function () {
    it('should return send email reset password', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      try {
        await vfire.resetPassword(process.env.EMAIL);
        assert.ok(true);
      } catch (error) {
        assert.ok(error);
      }
    });
  });

  describe('currentUser()', function () {
    it('should return currentUser', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      await vfire.signin(process.env.EMAIL, process.env.PASSWORD);
      const currentUser = await vfire.currentUser();
      assert.notEqual(currentUser, null);
    });
  });

  describe('addDocument()', function () {
    it('should return response \'New document created\'', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      const params = {
        coll: 'test/vfire',
        data: {
          fullname: 'John Doe'
        }
      }

      const res = await vfire.addDocument(params);
      assert.equal(res, 'New document created');
    });
  });

  describe('getCollection()', function () {
    it('should return \'vfire\' in field key', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      const params = {
        coll: 'test/vfire'
      }

      const res = await vfire.getCollection(params);
      assert.equal(res.data.key, 'vfire');
    });
  });

  describe('updateDocument()', function () {
    it('should return response \'Document updated\'', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      const params = {
        coll: 'test',
        data: {
          key: 'vfire',
          fullname: 'John Doe Rey'
        }
      }

      const res = await vfire.updateDocument(params);
      assert.equal(res, 'Document updated');
    });
  });

  describe('deleteDocument()', function () {
    it('should return response \'Document deleted\'', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      const params = {
        coll: 'test',
        data: {
          key: 'vfire',
          fullname: 'John Doe Rey'
        }
      }

      const res = await vfire.deleteDocument(params);
      assert.equal(res, 'Document deleted');
    });
  });

  describe('deleteDocumentBatch()', function () {
    it('should return response \'Document delete by batch\'', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      for (let i = 1; i <= 20; i++) {
        const params = {
          coll: 'test',
          data: {
            batch: i,
            fullname: `John Doe ${i}`
          }
        }

        await vfire.addDocument(params);
      }

      const params = {
        coll: 'test',
        filters: {
          field: 'batch',
          operator: '>',
          value: 0
        }
      }

      const res = await vfire.deleteDocumentBatch(params);
      assert.equal(res, 'Document delete by batch');
    });
  });

  describe('rawQuery(): Promise', function () {
    it('should return \'vfire\' in field key', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      const params = {
        coll: 'test/vfire',
        data: {
          fullname: 'John Doe'
        }
      }
      await vfire.addDocument(params);

      const res = vfire.rawQuery(`
          SELECT
            *
          FROM
            __coll__
          WHERE
            key = $1
            AND fullname = $2`, 'test', ['vfire', 'John Doe'], false);

      res.then(data => {
        assert.equal(data[0].key, 'vfire');
      })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe('rawQuery(): Observable', function () {
    it('should return \'vfire\' in field key', async function () {
      const vfire = new Vfire({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });

      const params = {
        coll: 'test/vfire',
        data: {
          fullname: 'John Doe'
        }
      }
      await vfire.addDocument(params);

      const res = vfire.rawQuery(`
          SELECT
            *
          FROM
            __coll__
          WHERE
            key = $1
            AND fullname = $2`, 'test', ['vfire', 'John Doe'], true);

      res.subscribe(data => {
        assert.equal(data[0].key, 'vfire');
      }, err => {
        console.log('Error rawQuery: ', err);
      });
    });
  });

  after(async function () {
    const vfire = new Vfire({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    });

    const res = await vfire.signin(process.env.EMAIL, process.env.PASSWORD)
    await res.user.delete();
    assert.ok(true);
  });
});