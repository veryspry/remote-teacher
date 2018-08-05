import React from 'react'
import {connect} from 'react-redux'

import getSpotifyScript from '../spotify/index'

class SpotifyPlayer extends React.Component {

  componentDidMount = async () => {

  }

  loadPlayer = async domWindow => {
    // invoke the spotify script
    await getSpotifyScript()

    domWindow.onSpotifyWebPlaybackSDKReady = () => {
      const token = 'BQBQ9Q2yNQmYDKi-VAffGkczAH5YewlmnwInmObpQSj-aOd7Bs2-eTbP7zkD5OVr6pZoAEQojvcMYYDrOXZyOz2U8kE86f9ZTMDB0WuSIoaCUYEkMOGbIZhT6HOlygIXxpgGx2ZQMY2NF66xqeIJONvtbX6tr4P7'

      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token) }
      })

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message) })
      player.addListener('authentication_error', ({ message }) => { console.error(message) })
      player.addListener('account_error', ({ message }) => { console.error(message) })
      player.addListener('playback_error', ({ message }) => { console.error(message) })

      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state) })

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      // Connect to the player!
      player.connect()
    }
  }


  render() {

    return (
      <div
        ref={
          (node) => {
            this.loadPlayer(window)
          }
        }
         className="musicPlayerWrapper">

      </div>
    )
  }
}

export default SpotifyPlayer
