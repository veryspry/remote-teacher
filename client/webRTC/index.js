import SimpleWebRTC from 'simplewebrtc'

const localVideoEl = document.querySelector('#localVideo')
const remoteVideosEl = document.querySelector('#remoteVideos')

// Great resource:
// https://github.com/andyet/SimpleWebRTC/issues/286


const newWebRTC = () => {
  // create WebRTC object
  const webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access
      autoRequestMedia: true,
      media: { audio: true, video: true },
  })
  return webrtc
}

// example of readyToCall
// webrtc.on('readyToCall', function () {
//     // you can name it anything
//     webrtc.joinRoom('coolroom')
//     console.log('this is the webrtc object', webrtc)
// })

export default newWebRTC
