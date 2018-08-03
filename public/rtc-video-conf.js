import quickconnect from './rtc-quickconnect'

quickconnect('https://switchboard.rtc.io/', { room: 'qc-simple-demo' })
  .on('call:started', function(id, pc, data) {
    console.log('we have a new connection to: ' + id);
  });


// import quickconnect from 'rtc-quickconnect'
// import crel from 'crel'
// import capture from 'rtc-capture'
// import attach from 'rtc-attach'
// import qsa from 'fdom/qsa'
// import [ plugins ] from 'rtc-plugin-temasys'
//
//
// // const quickconnect = require('../rtc-quickconnect');
// // const crel = require('../crel');
// // const capture = require('../rtc-capture');
// // const attach = require('../rtc-attach');
// // const qsa = require('../fdom/qsa');
// // const plugins = [
// //   require('../rtc-plugin-temasys')
// // ];
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
