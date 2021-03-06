const firebaseLib = require("./firebase");

class Vfire {
  constructor(credential) {
    const init = firebaseLib(credential);
    const firestore = init.firebase.firestore();
    const storage = init.firebase.storage();
    const auth = init.firebase.auth();
    const timestamp = init.firebase.firestore.FieldValue.serverTimestamp();

    this.randomName = (type = 'alphaNumberic', length = 5) => {
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

    this.signup = (email, password) => {
      return auth.createUserWithEmailAndPassword(email, password);
    }

    this.signin = (email, password) => {
      return auth.signInWithEmailAndPassword(email, password);
    }

    this.signout = () => {
      return auth.signOut();
    }

    this.resetPassword = (email) => {
      return auth.sendPasswordResetEmail(email);
    }

    this.currentUser = async () => {
      const user = await auth.currentUser;
      return user;
    }

    this.rawQuery = (query, coll, params, realtime = true) => {
      if (!coll) {
        throw new Error('Collection undefined!');
      }

      const splitColl = coll ? coll.split('/') : null;

      if (splitColl.length % 2 === 0) {
        throw new Error('Collection not found!');
      }

      let dbRef = firestore;
      if (coll && splitColl.length > 1) {
        if (splitColl.length % 2 !== 0) {
          let ref = '';
          splitColl.map((item, index) => {
            if (index === 0) {
              ref = item;
              return;
            }

            if (index !== splitColl.length - 1) {
              ref = `${ref}/${item}`;
            }
          });
          dbRef = firestore.doc(ref);
        } else {
          throw new Error('Invalid document reference.');
        }
      }

      const fireSQL = new init.FireSQL(dbRef);
      let newQuery = query.replace('__coll__', splitColl[splitColl.length - 1]);
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

    this.getCollection = (params) => {
      return new Promise(async (resolve, reject) => {
        if (!params.coll) {
          reject('Collection undefined!');
        }

        const splitColl = params.coll.split('/');

        let ref = firestore.collection(splitColl[0]);

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

    this.addDocument = (params) => {
      return new Promise(async (resolve, reject) => {
        if (!params.coll) {
          reject('Collection undefined!');
        }

        const splitColl = params.coll.split('/');

        let ref = firestore.collection(splitColl[0]);

        if (splitColl.length === 1) {
          ref = ref.doc();
        }

        for (let i = 1; i < splitColl.length; i++) {
          if (i % 2 === 0 && i === splitColl.length - 1) {
            ref = ref.collection(splitColl[i]).doc();
          } else if (i % 2 === 0) {
            ref = ref.collection(splitColl[i]);
          } else {
            ref = ref.doc(splitColl[i]);
          }
        }

        params.data.created = timestamp;
        params.data.updated = timestamp;
        params.data.key = ref.id;

        await ref.set(params.data);
        resolve('New document created');
      });
    }

    this.updateDocument = (params) => {
      return new Promise(async (resolve, reject) => {
        if (!params.coll) {
          reject('Collection undefined!');
        }

        const splitColl = params.coll.split('/');

        let ref = firestore.collection(splitColl[0]);

        if (splitColl.length === 1) {
          ref = ref.doc(params.data.key);
        }

        for (let i = 1; i < splitColl.length; i++) {
          if (i % 2 === 0 && i === splitColl.length - 1) {
            ref = ref.collection(splitColl[i]).doc(params.data.key);
          } else if (i % 2 === 0) {
            ref = ref.collection(splitColl[i]);
          } else {
            ref = ref.doc(splitColl[i]);
          }
        }

        params.data.updated = timestamp;

        await ref.update(params.data);
        resolve('Document updated');
      });
    }

    this.deleteDocument = (params) => {
      return new Promise(async (resolve, reject) => {
        if (!params.coll) {
          reject('Collection undefined!');
        }

        const splitColl = params.coll.split('/');

        let ref = firestore.collection(splitColl[0]);

        if (splitColl.length === 1) {
          ref = ref.doc(params.data.key);
        }

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

    this.deleteDocumentBatch = (params) => {
      return new Promise(async (resolve, reject) => {
        if (!params.coll) {
          reject('Collection undefined!');
        }

        const splitColl = params.coll.split('/');

        if (splitColl.length % 2 === 0) {
          reject('Collection not found!');
        }

        let ref = firestore.collection(splitColl[0]);

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

        const batch = firestore.batch();

        snapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        resolve('Document delete by batch');
      });
    }

    const getDownloadURL = (iRef) => {
      return new Promise((resolve) => {
        iRef.getDownloadURL().then((url) => {
          resolve(url);
        });
      });
    }

    const deleteStorageFirebase = (fullPath) => {
      return new Promise(async (resolve) => {
        console.log('fullPath', fullPath);
        await storage
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

    this.deleteStorageDirectoryFirebase = (fullPath) => {
      return new Promise(async () => {
        console.log('deleteStorageDirectoryFirebase fullPath', fullPath);
        await storage
          .ref(fullPath)
          .listAll()
          .then((dir) => {
            console.log('dir', dir);
            dir.items.forEach((fileRef) => {
              console.log('fileRef', fileRef);
              deleteStorageFirebase(fileRef.fullPath);
            });
            dir.prefixes.forEach((folderRef) => {
              console.log('folderRef', folderRef);
              this.deleteStorageDirectoryFirebase(folderRef.fullPath);
            });
          });
      });
    }

    this.uploadStorageFirebase = (
      path,
      file,
      storageName,
      deletePath = null
    ) => {
      return new Promise((resolve) => {
        const storageRef = storage.ref();
        const fullPath = `${path}/${storageName}`;
        const iRef = storageRef.child(fullPath);
        const uploadTask = iRef.put(file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            switch (snapshot.state) {
              case init.firebase.storage.TaskState.PAUSED:
                break;
              case init.firebase.storage.TaskState.RUNNING:
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
            getDownloadURL(iRef).then((url) => {
              const response = {
                status: true,
                fullPath: iRef.fullPath,
                downloadURL: url,
              };

              if (deletePath) {
                deleteStorageFirebase(deletePath);
              }
              resolve(response);
            });
          }
        );
      });
    }
  }
}

module.exports = Vfire;
