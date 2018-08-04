import React from 'react'
import {connect} from 'react-redux'
import newWebRTC from '../webRTC/'
import SimpleWebRTC from 'simplewebrtc'
import {joinRoom} from '../socket/index'
import WhiteBoard from './WhiteBoard'
// import WhiteBoard from './WhiteBoard'

class Chat extends React.Component {


  componentDidMount = () => {
    let roomName = this.props.match.params.roomName

    const webrtc = newWebRTC()
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
        <WhiteBoard />
        <div className="videoWrapper">
          <div id="remoteVideos" ></div>
          <video id="localVideo" autoPlay playsInline></video>
        </div>
        <div className="whiteBoardWrapper">

        </div>
      </div>
    )
  }
}

export default Chat
