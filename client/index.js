import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
// import './socket/'

// establish webRTC connection
// import exportWebRTC from './webRTC'
// exportWebRTC() // execute WebRTC file

import webrtc from './webRTC/'


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
