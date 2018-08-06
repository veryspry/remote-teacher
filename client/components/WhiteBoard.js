import React from 'react'
import {connect} from 'react-redux'
import { default as whiteboard, draw} from '../socket/whiteboard.js'

import io from 'socket.io-client'
const socket = io(window.location.origin)

let clientCtx = {}

// // listen for whiteboard events
// socket.on('draw-from-server', (start, end, color, shouldBroadcast, ctx) => {
//   console.log('after draw-from-server listen', ctx)
//   draw(start, end, color, false, clientCtx)
// })
//
// // emit whiteboard events
// whiteboard.on('draw', (start, end, color, shouldBroadcast, ctx) => {
//   // console.log('before draw-from-client emit', shouldBroadcast, ctx)
//   socket.emit('draw-from-client', start, end, color, ctx)
//   // socket.emit('draw-from-client', ctx)
//   // console.log('after draw from client emit', ctx)
// })


class WhiteBoard extends React.Component {
  state = {
    colors: [
      'black',
      'purple',
      'blue',
      'red',
      'green',
      'orange',
      'yellow',
      'white',
    ],
    selectedColor: 'black',
    currentMousePosition: {
      x: 0,
      y: 0,
    },
    lastMousePosition: {
      x: 0,
      y: 0,
    },
  }

  componentDidMount = () => {
    clientCtx = this._ctx
    console.log(draw)
  }


  // fire this inside of canvas ref
  handleCanvas = (canvas, ctx) => {
    const resize = () => {
      // Unscale the canvas (if it was previously scaled)
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      // The device pixel ratio is the multiplier between CSS pixels
      // and device pixels
      const pixelRatio = window.devicePixelRatio || 1

      // Allocate backing store large enough to give us a 1:1 device pixel
      // to canvas pixel ratio.
      const w = canvas.clientWidth * pixelRatio
      const h = canvas.clientHeight * pixelRatio
      if (w !== canvas.width || h !== canvas.height) {
        // Resizing the canvas destroys the current content.
        // So, save it...
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        canvas.width = w; canvas.height = h

        // ...then restore it.
        ctx.putImageData(imgData, 0, 0)
      }

      // Scale the canvas' internal coordinate system by the device pixel
      // ratio to ensure that 1 canvas unit = 1 css pixel, even though our
      // backing store is larger.
      ctx.scale(pixelRatio, pixelRatio)

      ctx.lineWidth = 5
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
    }

    const setupCanvas = () => {
      // Set the size of the canvas and attach a listener
      // to handle resizing.
      resize()
      window.addEventListener('resize', resize)

      window.addEventListener('mousedown', (e) => {
        this.state.currentMousePosition = pos(e)
      })

      window.addEventListener('mousemove', (e) => {
        if (!e.buttons) return
        this.state.lastMousePosition = this.state.currentMousePosition
        this.state.currentMousePosition = pos(e)
        this.state.lastMousePosition && this.state.currentMousePosition &&
        draw(this.state.lastMousePosition, this.state.currentMousePosition, this.state.selectedColor, true, ctx)
      })
    }

    const pos = (e) => {
      return [
        e.pageX - canvas.offsetLeft,
        e.pageY - canvas.offsetTop
      ]
    }

    setupCanvas()
  }

  clickColor = event => {
    if (!event.target.dataColor) return
    this.setState({
      selectedColor: event.target.dataColor
    })
    const current = picker.querySelector('.selected')
    current && current.classList.remove('selected')
    target.classList.add('selected')
  }

  render() {

    return (
      <div className="whiteBoardWrapper">
        {/* <div className="whiteBoardScroll"> */}

          <div className="color-selector" onClick={this.clickColor}>
            {this.state.colors.map(color => {
              return (
                <div className={`marker ${color}`} data-color={color} key={color} />
              )
            })}
          </div>

          <canvas
            className="whiteBoard"
            ref={
              (el) => {
                this._canvas = el
                this._ctx = el.getContext('2d') // return drawing context on canvas
                this.handleCanvas(el, el.getContext('2d'))
              }
            } />
        {/* </div> */}


      </div>
    )
  }
}

export {clientCtx}
export default WhiteBoard
