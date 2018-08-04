import SimpleWebRTC from 'simplewebrtc'

const localVideoEl = document.querySelector('#localVideo')
const remoteVideosEl = document.querySelector('#remoteVideos')

// create WebRTC object
const webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true
})

// we have to wait until it's ready
// webrtc.on('readyToCall', function () {
//     // you can name it anything
//     webrtc.joinRoom('coolroom')
//     console.log('this is the webrtc object', webrtc)
// })

export default webrtc
