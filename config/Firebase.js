import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'API_KEY',
    authDomain: 'AUTH_DOMAIN',
    projectId: 'PROJECT_ID',
    storageBucket: 'storage_bucket',
    messagingSenderId: 'senderid',
    appId: 'app_id'
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export default Firebase

db.settings({
    timestampsInSnapshots: true
})
