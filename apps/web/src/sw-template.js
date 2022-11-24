importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const { registerRoute } = workbox.routing;
const { NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const networkFirstPaths = [
    '/api/auth/revalidate',
    '/api/todos/'
];

registerRoute(
    ({request, url}) => {
        if (networkFirstPaths.includes( url.pathname )) return true;
        return false;
    },
    new NetworkFirst()
);

const bgSyncPlugin = new BackgroundSyncPlugin('offlineQueue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
  });

registerRoute(
    new RegExp('http://localhost:4000/api/todos'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);

registerRoute(
    new RegExp('http://localhost:4000/api/todos'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
);

registerRoute(
    new RegExp('http://localhost:4000/api/todos'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
);

/*registerRoute(
    new RegExp('http://localhost:4000/api/auth/revalidate'),
    new NetworkFirst()
);
registerRoute(
    new RegExp('http://localhost:4000/api/todos'),
    new NetworkFirst()
);*/

