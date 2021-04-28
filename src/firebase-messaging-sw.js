importScripts("https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js"
);
firebase.initializeApp({
  apiKey: 'AIzaSyDPtnERtJfy7iNCmoT661-rRgkrRdfyDPY',
  projectId: 'humanis-2020',
  messagingSenderId: '426951655222',
  appId: '1:426951655222:web:5373aa328f1a45ca6d3d97',
});
const messaging = firebase.messaging();
