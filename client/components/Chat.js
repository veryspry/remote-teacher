import React from 'react'
import {connect} from 'react-redux'
import webrtc from '../webRTC/'
import SimpleWebRTC from 'simplewebrtc'
import {joinRoom} from '../socket/index'

class Chat extends React.Component {


  componentDidMount = () => {
    let roomName = this.props.match.params.roomName

    // WebRTC connection
    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom(roomName)
      console.log('this is the webrtc object', webrtc)
    })

    // Join Socket IO room
    joinRoom(roomName)
  }


  render() {

    return (
      <div>
        <div className="videoWrapper">
          <div id="remoteVideos" ></div>
          <video id="localVideo" autoPlay playsInline></video>
        </div>
      </div>
    )
  }
}

export default Chat
