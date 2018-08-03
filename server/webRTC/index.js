// const quickconnect = require('rtc-quickconnect');
// const media = require('rtc-media');
// // const crel = require('crel');
//
// // create containers for our local and remote video
// // const local = crel('div', { class: 'local' });
// // const remote = crel('div', { class: 'remote' });
//
// // const local = document.createElement('div')
// // const remote = document.createElement('div')
// // local.className = 'local'
// // local.className = 'remote'
//
// // const media;
// const peerMedia = {};
//
// // capture local media
// const localMedia = media();
//
// // once media is captured, connect
// localMedia.once('capture', function(stream) {
//   quickconnect('http://rtc.io/switchboard/', { room: 'matttest' })
//     // broadcast our captured media to other participants in the room
//     .addStream(stream)
//     // when a peer is connected (and active) pass it to us for use
//     .on('call:started', function(id, pc, data) {
//       console.log('peer connected: ', id);
//
//       // render the remote streams
//       pc.getRemoteStreams().forEach(renderRemote(id));
//     })
//     // when a peer leaves, remove teh media
//     .on('call:ended', function(id) {
//       // remove media for the target peer from the dom
//       // (peerMedia[id] || []).splice(0).forEach(function(el) {
//         // el.parentNode.removeChild(el);
//       // });
//       console.log('peer disconnected', id);
//     })
// });
//
// // render the local media
// localMedia.render(local);
//
// // render a remote video
// function renderRemote(id) {
//   // create the peer media list
//   peerMedia[id] = peerMedia[id] || [];
//
//   return function(stream) {
//     peerMedia[id] = peerMedia[id].concat(media(stream).render(remote));
//   }
// }

/* extra code to handle dynamic html and css creation */

// add some basic styling
// document.head.appendChild(crel('style', [
//   '.local { position: absolute;  right: 10px; }',
//   '.local video { max-width: 200px; }'
// ].join('\n')));

// add the local and remote elements
// document.body.appendChild(local);
// document.body.appendChild(remote);


// SECOND VERSION
//
// const quickconnect = require('rtc-quickconnect');
// const crel = require('crel');
// const capture = require('rtc-capture');
// const attach = require('rtc-attach');
// const qsa = require('fdom/qsa');
// const plugins = [
//   require('rtc-plugin-temasys')
// ];
//
// // create containers for our local and remote video
// const local = crel('div', { class: 'local' });
// const remote = crel('div', { class: 'remote' });
// const peerMedia = {};
//
// // once media is captured, connect
// module.exports = () => capture({ audio: true, video: true }, { plugins: plugins }, function(err, localStream) {
//   if (err) {
//     return console.error('could not capture media: ', err);
//   }
//
//   // render the local media
//   attach(localStream, { plugins: plugins }, function(err, el) {
//     local.appendChild(el);
//   });
//
//   // initiate connection
//   quickconnect('https://switchboard.rtc.io/', { room: 'matttest', plugins: plugins })
//     // broadcast our captured media to other participants in the room
//     .addStream(localStream)
//     // when a peer is connected (and active) pass it to us for use
//     .on('call:started', function(id, pc, data) {
//       attach(pc.getRemoteStreams()[0], { plugins: plugins }, function(err, el) {
//         if (err) return;
//
//         el.dataset.peer = id;
//         remote.appendChild(el);
//       });
//     })
//     // when a peer leaves, remove teh media
//     .on('call:ended', function(id) {
//       qsa('*[data-peer="' + id + '"]', remote).forEach(function(el) {
//         el.parentNode.removeChild(el);
//       });
//     });
// });
//
// /* extra code to handle dynamic html and css creation */
//
// // add some basic styling
// document.head.appendChild(crel('style', [
//   '.local { position: absolute;  right: 10px; }',
//   '.local video { max-width: 200px; }'
// ].join('\n')));
//
// // add the local and remote elements
// document.body.appendChild(local);
// document.body.appendChild(remote);
