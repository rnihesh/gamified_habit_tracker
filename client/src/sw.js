// sw.js
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : { title: 'Default title', message: 'Default message' };

  const options = {
    body: data.message,
    icon: '/icon.png', // Optional: specify an icon for your notification
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
