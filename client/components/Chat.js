import React from 'react'
import {connect} from 'react-redux'

class Chat extends React.Component {



  render() {

    return (
      <div>
        <div className="videoWrapper">
          <div id="remoteVideos" ></div>
          <video id="localVideo" autoPlay playsInline></video>
        </div>
        // <div>
        //   <button id="startButton">Start</button>
        //   <button id="callButton">Call</button>
        //   <button id="hangupButton">Hang Up</button>
        // </div>
      </div>
    )
  }
}

export default Chat
