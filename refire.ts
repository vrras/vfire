import init from './firebase';

export default class Refire {
  private firebaseLib
  private firestore;
  private storage;
  private auth;
  private timestamp;

  constructor(credential) {
    this.firebaseLib = init(credential);
    this.firestore = this.firebaseLib.firebase.firestore();
    this.storage = this.firebaseLib.firebase.storage();
    this.auth = this.firebaseLib.firebase.auth();
    this.timestamp = this.firebaseLib.firebase.firestore.FieldValue.serverTimestamp();
  }

  private randomName = (type, length) => {
    let charset = '';
    let result = '';

    const numeric = '0123456789';
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNMOPQRSTUPWXYZ';
    const alphaNumberic = numeric + alphabet;

    if (type === 'numeric') {
      charset = numeric;
    } else if (type === 'alphabet') {
      charset = alphabet;
    } else if (type === 'alphaNumeric') {
      charset = alphaNumberic;
    }

    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  signup = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signin = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signout = () => {
    return this.auth.signOut();
  }

  resetPassword = (email) => {
    return this.auth.sendPasswordResetEmail(email);
  }

  currentUser = async () => {
    const user = await this.auth.currentUser;
    console.log('current user', user);
    return user;
  }

  rawQuery = (query, coll, params, realtime = true) => {
    const splitRef = coll ? coll.split('/') : null;

    let dbRef = this.firestore;
    if (coll && splitRef.length > 1) {
      if (splitRef.length % 2 !== 0) {
        let ref = '';
        splitRef.map((item, index) => {
          if (index === 0) {
            ref = item;
            return;
          }

          if (index !== splitRef.length - 1) {
            ref = `${ref}/${item}`;
          }
        });
        dbRef = this.firestore.doc(ref);
      } else {
        throw new Error('Invalid document reference.');
      }
    }

    const fireSQL = new this.firebaseLib.FireSQL(dbRef);
    let newQuery = query.replace('__coll__', splitRef[splitRef.length - 1]);
    params.map((param, index) => {
      if (typeof param === 'string') {
        newQuery = newQuery.replace(`$${index + 1}`, `"${param}"`);
      } else {
        newQuery = newQuery.replace(`$${index + 1}`, Number(param));
      }
    });

    if (realtime) {
      /**
       * Realtime
       * @callback
       * .subscribe(results => {
       *    Do something;
       * });
       */
      const doc$ = fireSQL.rxQuery(newQuery);
      return doc$;
    } else {
      /**
       * Once
       * @callback
       * .then(results => {
       *    Do something;
       * });
       */
      const docPromise = fireSQL.query(newQuery);
      return docPromise;
    }
  }

  getCollection = (params) => {
    return new Promise(async (resolve, reject) => {
      if (!params.coll) {
        reject('Collection undefined!');
      }

      const splitColl = params.coll.split('/');

      let ref = this.firestore.collection(splitColl[0]);

      for (let i = 1; i < splitColl.length; i++) {
        if (i % 2 === 0) {
          ref = ref.collection(splitColl[i]);
        } else {
          ref = ref.doc(splitColl[i]);
        }
      }

      if (params.filters && params.filters.length > 0) {
        for (let j = 0; j < params.filters.length; j++) {
          if ((params.filters[j].operator === '<' || params.filters[j].operator === '<=' || params.filters[j].operator === '>' || params.filters[j].operator === '>=') && params.filters.length === 1 && params.order && params.order.hasOwnProperty('field') && params.order.hasOwnProperty('sort') && params.filters[0].field === params.order.field) {
            if (params.limit) {
              ref = ref.where(params.filters[j].field, params.filters[j].operator, params.filters[j].value).orderBy(params.order.field, params.order.sort).limit(params.limit);
            } else {
              ref = ref.where(params.filters[j].field, params.filters[j].operator, params.filters[j].value).orderBy(params.order.field, params.order.sort);
            }
          } else {
            if (params.limit && j === params.filters.length - 1) {
              ref = ref.where(params.filters[j].field, params.filters[j].operator, params.filters[j].value).limit(params.limit);
            } else {
              ref = ref.where(params.filters[j].field, params.filters[j].operator, params.filters[j].value);
            }
          }
        }
      } else if (params.order && params.order.hasOwnProperty('field') && params.order.hasOwnProperty('sort')) {
        if (params.limit) {
          ref = ref.orderBy(params.order.field, params.order.sort).limit(params.limit);
        } else {
          ref = ref.orderBy(params.order.field, params.order.sort);
        }
      }

      const snapshot = await ref
        .get();

      let data = null;
      if (splitColl.length % 2 === 0) {
        data = snapshot.data();
      } else {
        const dataTemp = [];
        snapshot.forEach(doc => {
          dataTemp.push({ ...doc.data() });
        });
        data = dataTemp;
      }

      resolve({ data });
    });
  }

  addDocument = (params) => {
    return new Promise(async (resolve, reject) => {
      if (!params.coll) {
        reject('Collection undefined!');
      }

      const splitColl = params.coll.split('/');

      let ref = this.firestore.collection(splitColl[0]);

      for (let i = 1; i < splitColl.length; i++) {
        if (i % 2 === 0 && i === splitColl.length - 1) {
          ref = ref.collection(splitColl[i]).doc();
        } else if (i % 2 === 0) {
          ref = ref.collection(splitColl[i]);
        } else {
          ref = ref.doc(splitColl[i]);
        }
      }

      params.data.created = this.timestamp;
      params.data.updated = this.timestamp;
      params.data.key = ref.id;

      await ref.set(params.data);
      resolve('New document created');
    });
  }

  updateDocument = (params) => {
    return new Promise(async (resolve, reject) => {
      if (!params.coll) {
        reject('Collection undefined!');
      }

      const splitColl = params.coll.split('/');

      let ref = this.firestore.collection(splitColl[0]);

      for (let i = 1; i < splitColl.length; i++) {
        if (i % 2 === 0 && i === splitColl.length - 1) {
          ref = ref.collection(splitColl[i]).doc(params.data.key);
        } else if (i % 2 === 0) {
          ref = ref.collection(splitColl[i]);
        } else {
          ref = ref.doc(splitColl[i]);
        }
      }

      params.data.updated = this.timestamp;

      await ref.update(params.data);
      resolve('Document updated');
    });
  }

  deleteDocument = (params) => {
    return new Promise(async (resolve, reject) => {
      if (!params.coll) {
        reject('Collection undefined!');
      }

      const splitColl = params.coll.split('/');

      let ref = this.firestore.collection(splitColl[0]);

      for (let i = 1; i < splitColl.length; i++) {
        if (i % 2 === 0 && i === splitColl.length - 1) {
          ref = ref.collection(splitColl[i]).doc(params.data.key);
        } else if (i % 2 === 0) {
          ref = ref.collection(splitColl[i]);
        } else {
          ref = ref.doc(splitColl[i]);
        }
      }

      await ref.delete();
      resolve('Document deleted');
    });
  }

  deleteDocumentBatch = (params) => {
    return new Promise(async (resolve, reject) => {
      if (!params.coll) {
        reject('Collection undefined!');
      }

      const splitColl = params.coll.split('/');

      let ref = this.firestore.collection(splitColl[0]);

      for (let i = 1; i < splitColl.length; i++) {
        if (i % 2 === 0) {
          ref = ref.collection(splitColl[i]);
        } else {
          ref = ref.doc(splitColl[i]);
        }
      }

      if (params.filters && params.filters.length > 0) {
        for (let j = 0; j < params.filters.length; j++) {
          ref = ref.where(params.filters[j].field, params.filters[j].operator, params.filters[j].value);
        }
      }

      const snapshot = await ref.get();

      const batch = this.firestore.batch();

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      resolve('Document delete by batch');
    });
  }

  private getDownloadURL = (iRef) => {
    return new Promise((resolve) => {
      iRef.getDownloadURL().then((url) => {
        resolve(url);
      });
    });
  }

  private deleteStorageFirebase = (fullPath) => {
    return new Promise(async (resolve) => {
      console.log('fullPath', fullPath);
      await this.storage
        .ref(fullPath)
        .delete()
        .then(() => {
          resolve({ status: true });
          return { status: true };
        })
        .catch((error) => {
          console.log('error', error);
          resolve({ status: false });
          return { status: false };
        });
    });
  }

  private deleteStorageDirectoryFirebase = (fullPath) => {
    return new Promise(async () => {
      console.log('deleteStorageDirectoryFirebase fullPath', fullPath);
      await this.storage
        .ref(fullPath)
        .listAll()
        .then((dir) => {
          console.log('dir', dir);
          dir.items.forEach((fileRef) => {
            console.log('fileRef', fileRef);
            this.deleteStorageFirebase(fileRef.fullPath);
          });
          dir.prefixes.forEach((folderRef) => {
            console.log('folderRef', folderRef);
            this.deleteStorageDirectoryFirebase(folderRef.fullPath);
          });
        });
    });
  }

  uploadStorageFirebase = (
    path,
    file,
    storageName,
    deletePath = null
  ) => {
    return new Promise((resolve) => {
      const storageRef = this.storage.ref();
      const fullPath = `${path}/${storageName}`;
      const iRef = storageRef.child(fullPath);
      const uploadTask = iRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          switch (snapshot.state) {
            case this.firebaseLib.firebase.storage.TaskState.PAUSED:
              break;
            case this.firebaseLib.firebase.storage.TaskState.RUNNING:
              break;
          }
        },
        (error) => {
          const response = {
            status: false,
            message: error,
          };
          resolve(response);
        },
        () => {
          this.getDownloadURL(iRef).then((url) => {
            const response = {
              status: true,
              fullPath: iRef.fullPath,
              downloadURL: url,
            };

            if (deletePath) {
              this.deleteStorageFirebase(deletePath);
            }
            resolve(response);
          });
        }
      );
    });
  }
}
