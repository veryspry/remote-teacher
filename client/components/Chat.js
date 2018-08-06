import React from 'react'
import {connect} from 'react-redux'
import newWebRTC from '../webRTC/'
import SimpleWebRTC from 'simplewebrtc'
import {joinRoom} from '../socket/index'
import WhiteBoard from './WhiteBoard'
import SpotifyPlayer from 'react-spotify-player'
// import SpotifyPlayer from './SpotifyPlayer'
// import WhiteBoard from './WhiteBoard'

import Spotify from '../spotify/index'

// size may also be a plain string using the presets 'large' or 'compact'
// const size = {
//   width: '100%',
//   height: 300,
// }
// const view = 'list' // or 'coverart'
// const theme = 'black' // or 'white'



class Chat extends React.Component {

  state = {
    size: {
      width: '100%',
      height: 300,
    },
    view: 'list', // or 'coverart'
    theme: 'black', // or 'white'
  }


  componentDidMount = async () => {
    let roomName = this.props.match.params.roomName
    const webrtc = newWebRTC()


    // WebRTC connection
    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom(roomName)
    })

    webrtc.mute()
    // Join Socket IO room
    joinRoom(roomName)
  }

  call = () => {
    console.log(webrtc)
  }

  hangUp = () => {

  }


  render() {

    return (
      <div className="chatWrapper">


        <div className="spotifyWrapper">
          {/* <form>
            <div className="searchAlbumWrapper">
              <label htmlFor="searchAlbum">
                <small>Search Album Name:</small>
              </label>
              <input name="searchAlbum" type="text" />
            </div>
          </form> */}
          <SpotifyPlayer
            // uri={`spotify:album:1TIUsv8qmYLpBEhvmBmyBk`}
            uri={`spotify:album:0A13JySVHzBoRZFk2o89Wl`}
            size={this.state.size}
            view={this.state.view}
            theme={this.state.theme}
          />
        </div>

        <WhiteBoard />

        {/* <SpotifyPlayer /> */}
        <div className="videoWrapper">
          <div id="remoteVideos"  />
          <div className="localVideoWrapper">
            <video id="localVideo" autoPlay playsInline />
          </div>
          {/* <div className="videoBtnWrapper"> */}
            {/* <button onClick={this.call} className="videoBtn">Call</button> */}
            {/* <button onClick={this.hangUp} className="videoBtn">Hang Up</button> */}
          {/* </div> */}
        </div>
      </div>
    )
  }
}

export default Chat
