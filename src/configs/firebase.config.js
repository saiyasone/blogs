const ENV_KEYS = require("../utils/ENV_KEYS");

const {
  FIREBASE_APP_ID,
  FIREBASE_MEASURE_ID,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_PROJECT_ID,
  FIREBASE_DOMAIN,
  FIREBASE_KEY,
} = ENV_KEYS;

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: FIREBASE_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASURE_ID,
};

module.exports = firebaseConfig;
