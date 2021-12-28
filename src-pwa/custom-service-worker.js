/* eslint-disable */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching';
// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('notificationclick', function (event) {
  const url = '/read-thru';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
