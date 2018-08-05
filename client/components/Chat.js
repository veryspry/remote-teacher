import React from 'react'
import {connect} from 'react-redux'
import newWebRTC from '../webRTC/'
import SimpleWebRTC from 'simplewebrtc'
import {joinRoom} from '../socket/index'
import WhiteBoard from './WhiteBoard'
import SpotifyPlayer from './SpotifyPlayer'
// import WhiteBoard from './WhiteBoard'

import Spotify from '../spotify/index'

class Chat extends React.Component {


  componentDidMount = async () => {
    let roomName = this.props.match.params.roomName
    const webrtc = newWebRTC()


    // WebRTC connection
    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom(roomName)
      console.log('this is the webrtc object', webrtc)
    })

    webrtc.mute()
    // Join Socket IO room
    joinRoom(roomName)
  }

  call = () => {
    console.log(webrtc);
  }

  hangUp = () => {

  }


  render() {

    return (
      <div className="chatWrapper">
        <WhiteBoard />
        {/* <SpotifyPlayer /> */}
        <div className="videoWrapper">
          <div id="remoteVideos" ></div>
          <video id="localVideo" autoPlay playsInline></video>
          <div className="videoBtnWrapper">
            <button onClick={this.call} className="videoBtn">Call</button>
            <button onClick={this.hangUp} className="videoBtn">Hang Up</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
