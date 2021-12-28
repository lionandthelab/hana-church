import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Notify } from 'quasar';

const app = initializeApp(firebaseConfig);

const auth = getAuth();
auth.useDeviceLanguage();
// connectAuthEmulator(auth, 'http://localhost:9099');

const db = getFirestore();
// connectFirestoreEmulator(db, 'localhost', 8083);

// const messaging = getMessaging();

// getToken(messaging, {
//   vapidKey:
//     'BLmTXNTOG8DeQBXgKYzHnXSJdHUVd0nTpff2g-364uBYhLqAv1DcMM7CyUkwjG8O2Th8gyWYIb0kxgMMpu-9lu4',
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//       console.log('currentToken: ', currentToken);
//     } else {
//       // Show permission request UI
//       console.log(
//         'No registration token available. Request permission to generate one.'
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
//   });

// onMessage(messaging, (payload: MessagePayload) => {
//   console.log(
//     '[boot/firebase.ts] Received message ',
//     payload.notification?.body
//   );

//   Notify.create({
//     icon: 'mdi-cloud',
//     message: payload.notification?.body,
//     timeout: 2,
//   });
// });

navigator.serviceWorker
  .register('firebase-messaging-sw.js', {
    scope: 'firebase-cloud-messaging-push-scope',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then((registration) => {
    const messaging = getMessaging(app);
    getToken(messaging, {
      vapidKey:
        'BLmTXNTOG8DeQBXgKYzHnXSJdHUVd0nTpff2g-364uBYhLqAv1DcMM7CyUkwjG8O2Th8gyWYIb0kxgMMpu-9lu4',
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log('currentToken: ', currentToken);
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      Notify.create({
        icon: 'mdi-cloud',
        message: payload.notification?.body,
        timeout: 3000,
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

export { auth, db };
