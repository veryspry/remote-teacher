import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket/'

// establish webRTC connection
// import exportWebRTC from './webRTC'
// exportWebRTC() // execute WebRTC file
import SimpleWebRTC from 'simplewebrtc'

// create WebRTC object

const localVideoEl = document.querySelector('#localVideo')
const remoteVideosEl = document.querySelector('#remoteVideos')

const webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true
})

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
    // you can name it anything
    webrtc.joinRoom('coolroom')
    console.log('this is the webrtc object', webrtc)
})


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
