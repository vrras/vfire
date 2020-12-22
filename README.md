<h3 align="center">Vfire</h3>

<p align="center">
  Library that is useful for minimizing code redudancies in using Firebase and of course easy to use.
  <br>
  <br>
  <img src="https://img.shields.io/badge/status-active-success.svg">
  <img src="https://badgen.net/npm/v/yarn">
  <img src="https://badgen.net/npm/node/next">
  <img src="https://img.shields.io/badge/license-MIT-green.svg">
  <br>
  <br>
</p>

---

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 What is Vfire?](#-what-is-vfire)
- [Features](#features)
- [🏁 Installation](#-installation)
- [🎈 Usage](#-usage)
  - [Random name](#random-name)
  - [Signup (Auth)](#signup-auth)
  - [Signin (Auth)](#signin-auth)
  - [Signout (Auth)](#signout-auth)
  - [Reset password](#reset-password)
  - [Current user](#current-user)
  - [Get collection (Firestore)](#get-collection-firestore)
  - [Add document (Firestore)](#add-document-firestore)
  - [Update document (Firestore)](#update-document-firestore)
  - [Delete document (Firestore)](#delete-document-firestore)
  - [Delete document batch (Firestore)](#delete-document-batch-firestore)
  - [Raw query (Firestore)](#raw-query-firestore)
  - [Uploda File (Storage)](#uploda-file-storage)
  - [Delete File Directory (Storage)](#delete-file-directory-storage)
- [⛏️ Built Using](#️-built-using)
- [TODOS](#todos)
- [Samples](#samples)
- [✍️ Authors](#️-authors)
- [🎉 Acknowledgements](#-acknowledgements)
- [Contributing](#contributing)

## 🧐 What is Vfire?

Firebase is a toolset to “build, improve, and grow your app”, and the tools it gives you cover a large portion of the services that developers would normally have to build themselves, but don’t really want to build, because they’d rather be focusing on the app experience itself. This includes things like analytics, authentication, databases, configuration, file storage, push messaging, and the list goes on. The services are hosted in the cloud, and scale with little to no effort on the part of the developer[<a href="https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0">link</a>]. To use the services that firebase has, please visit this <a href="https://firebase.google.com/?gclid=CjwKCAiAoOz-BRBdEiwAyuvA6wVKNOHDS6PKb0El5y927Ldtgl-Y4BnIjfVJNYmrm0PfL1igoGDAOhoCxW8QAvD_BwE">link</a>.
<br>
After reading the firebase documentation for the cloud firestore, authentication and storage services I realized that this could be code redundancy, which made the code look messy.

## Features
* Currently it supports for Cloud Firestore, Authentication and Storage.
* TypeScript and JavaScript support
* Produced code is performant, flexible, clean and maintainable
* Easy to use
* Reduce code redundancies

## 🏁 Installation

Just add Vfire to your project:

```
npm install vfire
# or
yarn add vfire
```
## 🎈 Usage
Instantiate a Vfire
```
import Vfire from 'vfire';
# or
const Vfire = require('vfire');

const vfire = new Vfire({
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
  databaseURL: 'YOUR_FIREBASE_DATABASE_URL',
  projectId: 'YOUR_FIREBASE_PROJECT_ID',
  storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'YOUR_FIREBASE_APP_ID',
  measurementId: 'YOUR_FIREBASE_MEASUREMENT_ID'
});
```
There is an argument of `Vfire` constructor:
* `credential` - used to construct credential in `Firebase`. Example: <br>
  ```
  {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
    databaseURL: 'YOUR_FIREBASE_DATABASE_URL',
    projectId: 'YOUR_FIREBASE_PROJECT_ID',
    storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'YOUR_FIREBASE_APP_ID',
    measurementId: 'YOUR_FIREBASE_MEASUREMENT_ID'
  }
  ```
### Random name
Example of `randomName`:
```
const refCode = vfire.randomName('alphaNumeric', 8);
```
There are 2 arguments of `randomName`:
| Parameter | Default | Behaviour | Type | Argument |
  | :--- | :---: | :--- | :---: | :---: |
  | `type` | **alphaNumberic** | Return random name with `numeric` type, `alphabet` type or `alphaNumberic` type | `String` | `numeric`, `alphabet`, `alphaNumberic` |
  | `length` | **5** | Return random name with the specified total characters | `Number` | `Number` |
### Signup (Auth)
Example of `signup`:
```
signup('example@mail.com', 'examplepassword')
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There are 2 arguments of `signup`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  | `email` | **No default** | `String` | `String` |
  | `password` | **No default** | `String` | `String` |
### Signin (Auth)
Example of `signin`:
```
vfire.signin('example@mail.com', 'examplepassword')
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There are 2 arguments of `signin`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  | `email` | **No default** | `String` | `String` |
  | `password` | **No default** | `String` | `String` |
### Signout (Auth)
Example of `signout`:
```
vfire.signout()
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
### Reset password
Example of `resetPassword`:
```
vfire.resetPassword('example@mail.com')
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There is an argument of `resetPassword`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  `email` | **No default** | `String` | `String`
### Current user
Example of `currentUser`:
```
vfire.currentUser()
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
### Get collection (Firestore)
Example of `getCollection`:
```
const params = {
  coll: 'collection',
  filters: [
    {
      field: 'point',
      operator: '==',
      value: 1000,
    },
  ],
  order: {
    field: 'fullname',
    sort: 'asc'
  },
  limit: 10
};

vfire.getCollection(params)
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There is an argument of `getCollection`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  | `params` | **No default** | `Object` | `Object` |

And for the field of coll, filters, order and limit, it follows these rules:

| Parameter | Default | Behavior | Type | Example |
  | :--- | :---: | :--- | :---: | :--- |
  | `coll` | **No default** | Return entries that match the `collection / subcollection` | `String` | `your/path/collection` |
  | `filters` | **No default** | Return entries that match with filter | `Array` | `[{ field: 'point', operator: '>', value: 1000 }, { field: 'fullname', operator: '==', value: 'John Doe' }]` |
  | `order` | **No default** | Return entries with order | `Object` | `{ field: 'fullname', 'sort': 'asc | desc'}` |
  | `limit` | **No default** | Return entries with limit | `Number` | `10` |
### Add document (Firestore)
Example of `addDocument`:
```
const params = {
  coll: 'collection',
  data: {
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    point: 1000
  },
};

vfire.addDocument(params)
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There is an argument of `addDocument`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  | `params` | **No default** | `Object` | `Object` |

And for the field of coll and data, it follows these rules:
| Parameter | Default | Behavior | Type | Example |
  | :--- | :---: | :--- | :---: | :--- |
  | `coll` | **No default** | Add entries to the collection `collection / subcollection` | `String` | `your/path/collection` |
  | `data` | **No default** | Data entries that want to add | `Object` | `{ fullname: 'John Doe', email: 'john.doe@example.com', point: 1000 }` |
### Update document (Firestore)
Example of `updateDocument`:
```
const params = {
  coll: 'collection',
  data: {
    key: 'docId',
    point: 1200
  },
};

vfire.updateDocument(params)
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There is an argument of `updateDocument`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  | `params` | **No default** | `Object` | `Object` |

And for the field of coll and data, it follows these rules:
| Parameter | Default | Behavior | Type | Example |
  | :--- | :---: | :--- | :---: | :--- |
  | `coll` | **No default** | `Collection / Subcollection` that want to update | `String` | `your/path/collection` |
  | `data` | **No default** | Data entries want to update, you must add `key` | `Object` | `{ key: 'docId', point: 1200 }` |
### Delete document (Firestore)
Example of `deleteDocument`:
```
const params = {
  coll: 'collection',
  data: {
    key: 'docId',
  },
};

vfire.deleteDocument(params)
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There is an argument of `deleteDocument`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  | `params` | **No default** | `Object` | `Object` |

And for the field of coll and data, it follows these rules:
| Parameter | Default | Behavior | Type | Example |
  | :--- | :---: | :--- | :---: | :--- |
  | `coll` | **No default** | `Collection / Subcollection` that want to delete | `String` | `your/path/collection` |
  | `data` | **No default** | Document key that want to delete, you must add `key` | `Object` | `{ key: 'docId' }` |
### Delete document batch (Firestore)
Example of `deleteDocumentBatch`:
```
const params = {
  coll: 'collection',
  filters: [
    {
      field: 'point',
      operator: '<',
      value: 1000,
    },
  ],
};

vfire.deleteDocumentBatch(params)
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There is an argument of `updateDocument`:
| Parameter | Default | Type | Argument |
  | :--- | :---: | :---: | :---: |
  | `params` | **No default** | `Object` | `Object` |

And for the field of coll and filters, it follows these rules:
| Parameter | Default | Behavior | Type | Example |
  | :--- | :---: | :--- | :---: | :--- |
  | `coll` | **No default** | `Collection / Subcollection` that want to delete | `String` | `your/path/collection` |
  | `filters` | **No default** | Delete entries that match with filter | `Object` | `[{ field: 'point', operator: '<', value: 1000 }]` |
### Raw query (Firestore)
Example of `rawQuery`:
```
const res = vfire.rawQuery(`
  SELECT
    key, fullname, email, point, is_verified
  FROM
    __coll__
  WHERE
    email = $1
    AND password = $2`, 'collection', ['example@mail.com', 'examplepassword'], false);

# If Realtime updates (Observable) ...

res.subscribe(data => {
  // Do something when get result
}, err => {
  // Do something when error
});

# If One-time result (Promise) ..

res.then(data => {
  // Do something when get result
})
.catch(err => {
  // Do something when error
});
```
There are 4 arguments of `rawQuery`:
| Parameter | Default | Type | Example |
 | :--- | :---: | :---: | :--- |
  | `query` | **No default** | `String` | `SELECT key, fullname, email, point, is_verified FROM __coll__ WHERE email = $1 AND password = $2` <br> **Warning:** <br> 1. `__coll__` don't replace it <br> 2. `$1, $2, ..., $n` if you want to add param like `WHERE, ORDER or LIMIT` based on params |
  | `coll` | **No default** | `String` | `your/path/collection` |
  | `params` | **No default** | `Array` | `['example@mail.com', 'examplepassword']` |
  | `realtime` | **true** | `Boolean` | `true`, `false` | 

**Limitations**
* Only SELECT queries for now. Support for INSERT, UPDATE, and DELETE might come in the future.
* No support for JOINs.
* LIMIT doesn't accept an OFFSET, only a single number.
* No support for aggregate function COUNT.
* If using GROUP BY, it cannot be combined with ORDER BY nor LIMIT.
* No support for negating conditions with NOT.
* Limited LIKE. Allows for searches in the form of WHERE field LIKE 'value%', to look for fields that begin with the given value; and WHERE field LIKE 'value', which is functionally equivalent to WHERE field = 'value'.
* For more detail, please visit this [link](https://firebaseopensource.com/projects/jsayol/firesql/)
### Uploda File (Storage)
Example of `uploadStorageFirebase`:
```
const imageAsFile = event.target.files[0];
const filename = `${new Date().getTime()}-${imageAsFile.name}`;

vfire.uploadStorageFirebase('your/path', imageAsFile, filename, 'delete/fullpath')
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There are 4 arguments of `uploadStorageFirebase`:
| Parameter | Default | Type | Example |
 | :--- | :---: | :---: | :--- |
  `path` | **No default** | `String` | `your/path`
  `file` | **No default** | `File` | `event.target.files[0]`
  `storageName` | **No default** | `String` | `${new Date().getTime()}-${imageAsFile.name}`
  `deletePath` | **null** | `String` | `delete/fullpath`
### Delete File Directory (Storage)
Example of `deleteStorageDirectoryFirebase`:
```
vfire.deleteStorageDirectoryFirebase('your/path')
  .then(res => {
    // Do something when get result
  })
  .catch(err => {
    // Do something when error
  });
```
There is an argument of `deleteStorageDirectoryFirebase`:
| Parameter | Default | Type | Example |
 | :--- | :---: | :---: | :--- |
  `fullPath` | **No default** | `String` | `your/fullpath`
## ⛏️ Built Using

- [Firebase](https://firebase.google.com/?gclid=CjwKCAiAoOz-BRBdEiwAyuvA6wVKNOHDS6PKb0El5y927Ldtgl-Y4BnIjfVJNYmrm0PfL1igoGDAOhoCxW8QAvD_BwE) - Firebase helps you build
and run successful apps
- [FireSQL](https://firebaseopensource.com/projects/jsayol/firesql/) - Query Firestore using SQL syntax
- [NodeJs](https://nodejs.org/en/) - Server Environment

## TODOS
* Support for other firebase services
## Samples
Take a look at the samples in [sample](https://github.com/vrras/vfire/blob/master/sample/index.js) for examples of usage.
## ✍️ Authors

- [@vrras](https://github.com/vrras) - Idea & Initial work

See also the list of [contributors](https://github.com/vrras/vfire/graphs/contributors) who participated in this project.

## 🎉 Acknowledgements

- Hat tip to anyone whose code was used
- Inspiration
- References

## Contributing
Learn about contribution [here](https://github.com/vrras/vfire/blob/master/Contributing.md)
