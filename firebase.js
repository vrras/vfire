"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firesql_1 = require("firesql");
const app_1 = require("firebase/app");
require("firesql/rx");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
const init = (config) => {
    if (!app_1.default.apps.length) {
        app_1.default.initializeApp(config);
    }
    return { firebase: app_1.default, FireSQL: firesql_1.FireSQL };
};
exports.default = init;
//# sourceMappingURL=firebase.js.map