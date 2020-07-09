import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB6qMEXt19NMPw_GHpmJkeChVBd9oLonMM",
    authDomain: "ninja-smoothies-c5fec.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-c5fec.firebaseio.com",
    projectId: "ninja-smoothies-c5fec",
    storageBucket: "",
    messagingSenderId: "802271529630",
    appId: "1:802271529630:web:615541e718636968"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//firebaseApp.firestore().settings({timestampsInSnapshots:true});

//export firestore database
export default firebaseApp.firestore();