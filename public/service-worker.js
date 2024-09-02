self.addEventListener('install', (_event) => {
    // console.log('Service Worker installing.');
  });
  
  self.addEventListener('activate', (_event) => {
    // console.log('Service Worker activating.');
  });
  
  self.addEventListener('fetch', (event) => {
    // console.log('Fetching:', event.request.url);
  });
  