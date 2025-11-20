const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const db = admin.firestore();

// Collection references
const collections = {
  users: db.collection('users'),
  points: db.collection('points'),
  rewards: db.collection('rewards'),
  redemptions: db.collection('redemptions'),
  pointsHistory: db.collection('pointsHistory'),
  leaderboard: db.collection('leaderboard')
};

module.exports = {
  admin,
  db,
  collections
};