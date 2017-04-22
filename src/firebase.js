const firebase = require('firebase')

  const config = {
    apiKey: "AIzaSyD_jWeN7tKNinXNACZrVspcp7bsIXN8fAk",
    authDomain: "sunnythere-e72ae.firebaseapp.com",
    databaseURL: "https://sunnythere-e72ae.firebaseio.com",
    projectId: "sunnythere-e72ae",
    storageBucket: "sunnythere-e72ae.appspot.com",
    messagingSenderId: "254137121278"
  };

export default firebase.initializeApp(config);
