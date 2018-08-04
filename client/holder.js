import quickconnect from 'rtc-quickconnect'
import media from 'rtc-media'
import crel from 'crel'

// create containers for our local and remote video
const local = crel('div', { class: 'local' })
const remote = crel('div', { class: 'remote' })
// let media
const peerMedia = {}

// capture local media
const localMedia = media()

// once media is captured, connect
localMedia.once('capture', function(stream) {
  quickconnect('http://rtc.io/switchboard/', { room: 'conftest' })
    // broadcast our captured media to other participants in the room
    .addStream(stream)
    // when a peer is connected (and active) pass it to us for use
    .on('call:started', function(id, pc, data) {
      console.log('peer connected: ', id)

      // render the remote streams
      pc.getRemoteStreams().forEach(renderRemote(id))
    })
    // when a peer leaves, remove teh media
    .on('call:ended', function(id) {
      // remove media for the target peer from the dom
      (peerMedia[id] || []).splice(0).forEach(function(el) {
        el.parentNode.removeChild(el)
      })
    })
})

// render the local media
localMedia.render(local)

// render a remote video
function renderRemote(id) {
  // create the peer media list
  peerMedia[id] = peerMedia[id] || []

  return function(stream) {
    peerMedia[id] = peerMedia[id].concat(media(stream).render(remote))
  }
}

/* extra code to handle dynamic html and css creation */

// add some basic styling
document.head.appendChild(crel('style', [
  '.local { position: absolute  right: 10px }',
  '.local video { max-width: 200px }'
].join('\n')))

// add the local and remote elements
document.body.appendChild(local)
document.body.appendChild(remote)
