/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching';
import { getMessaging, getToken } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);
getToken(messaging, {
  vapidKey:
    'BLmTXNTOG8DeQBXgKYzHnXSJdHUVd0nTpff2g-364uBYhLqAv1DcMM7CyUkwjG8O2Th8gyWYIb0kxgMMpu-9lu4',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
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

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = '신촌하나교회';
  const notificationOptions = {
    body: '오늘도 말씀으로 하루를 시작하세요!',
    icon: '../src/assets/hana-church-logo-pad.png',
  };

  /* eslint-disable */
  self.registration.showNotification(notificationTitle, notificationOptions);
});
