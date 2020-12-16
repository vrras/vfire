import { FireSQL } from "firesql";
import firebase from "firebase/app";
import "firesql/rx";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const init = (config): { firebase; FireSQL } => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  return { firebase, FireSQL };
};

export default init;
