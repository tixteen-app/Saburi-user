// // // config.js
// // import { initializeApp } from "firebase/app";
// // import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // // Your Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAdi-nU_B4WzbIOl1H5pDbibr7VJCMX4WY",
// //   authDomain: "login1-aca5b.firebaseapp.com",
// //   projectId: "login1-aca5b",
// //   storageBucket: "login1-aca5b.firebasestorage.app",
// //   messagingSenderId: "317774159034",
// //   appId: "1:317774159034:web:ed41f806b08412b8fff683"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const provider = new GoogleAuthProvider();

// // export { auth, provider };

// // config.js
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAdi-nU_B4WzbIOl1H5pDbibr7VJCMX4WY",
//   authDomain: "login1-aca5b.firebaseapp.com",
//   projectId: "login1-aca5b",
//   storageBucket: "login1-aca5b.firebasestorage.app",
//   messagingSenderId: "317774159034",
//   appId: "1:317774159034:web:ed41f806b08412b8fff683"
//   // apiKey: "AIzaSyCDxd1IKFprRtMZRonl__FglcME2yp-5AM",
//   // authDomain: "palji-web.firebaseapp.com",
//   // projectId: "palji-web",
//   // storageBucket: "palji-web.firebasestorage.app",
//   // messagingSenderId: "666469184305",
//   // appId: "1:666469184305:web:ee135fc4f84a3d856f3610",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// provider.setCustomParameters({
//   prompt: 'select_account' 
// });

// export { auth, provider };

// config.js
// const { OAuth2Client } = require('google-auth-library');

// Google OAuth 2.0 configuration
// const CLIENT_ID = "410636469984-6evuvq578iui5vo5lha4f0bn8c18mpms.apps.googleusercontent.com";
// const CLIENT_ID = "666469184305-9o44or0equ1sg64886jm2elav70nqfmt.apps.googleusercontent.com";
// const client = new OAuth2Client(CLIENT_ID);

// module.exports = { client, CLIENT_ID };



import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  // vaibhav
  // apiKey: "AIzaSyAdi-nU_B4WzbIOl1H5pDbibr7VJCMX4WY",
  // authDomain: "login1-aca5b.firebaseapp.com",
  // projectId: "login1-aca5b",
  // storageBucket: "login1-aca5b.firebasestorage.app",
  // messagingSenderId: "317774159034",
  // appId: "1:317774159034:web:ed41f806b08412b8fff683"
  // palji-offical
  apiKey: "AIzaSyAb3jCXev7EbHC1bRYTGTEfUSgux1rJZm4",
  authDomain: "palji-web.firebaseapp.com",
  projectId: "palji-web",
  storageBucket: "palji-web.firebasestorage.app",
  messagingSenderId: "666469184305",
  appId: "1:666469184305:web:a999032ed4c6a5156f3610",
  measurementId: "G-0H5XVZ45WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, provider };
