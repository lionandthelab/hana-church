import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
  //   appId: process.env.FIREBASE_APP_ID,
  //   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

console.log('config: ', config)
const app = initializeApp(config)
console.log('app: ', app)

export const db = getFirestore(app)
