import axios from 'axios'

// get Spotify's script
const getSpotifyScript = async () => {
  try {
    let {data} = await axios.get('https://sdk.scdn.co/spotify-player.js')
    return data
  } catch (err) {
    console.log(err)
  }
}

// const Spotify = getSpotifyScript()

export default getSpotifyScript
