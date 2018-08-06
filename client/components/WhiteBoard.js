import React from 'react'
import {connect} from 'react-redux'
import { default as whiteboard } from '../socket/whiteboard.js'

import io from 'socket.io-client'
const socket = io(window.location.origin)


class WhiteBoard extends React.Component {

  constructor() {
    super()
    this.canvas = null
    this.ctx = null
    this.setRef = elem => {
      this.canvas = elem
    }
    // this.currentMousePosition = { x: 0, y: 0 }
    // this.lastMousePosition = { x: 0, y: 0 }
    this.currentMousePosition = [0, 0]
    this.lastMousePosition = [0, 0]
  }


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
    colorValues: {
      black: ['black', 'black'],
      purple: [ 'purple', '#680b5f'],
      blue: ['blue', '#0b4c68'],
      red: ['red', '#f5163e'],
      green: ['green', '#4CAF50'],
      orange: ['orange', '#fa8f23'],
      yellow: ['yellow', '#ffc221'],
      white:['white', 'white'],
    },
    selectedColor: 'black',
  }

  componentDidMount = () => {
    this.ctx = this.canvas.getContext('2d')
    this.canvas.addEventListener('mousedown', this.handleMouseDown)
    this.canvas.addEventListener('mousemove', this.handleMouseMove)
    this.resize()
    // this.canvas.addEventListener('resize', this.resize)
  }

  pos = (e) => {
    return [
      e.pageX - this.canvas.offsetLeft,
      e.pageY - this.canvas.offsetTop
    ]
  }

  handleMouseDown = event => {
    this.currentMousePosition = this.pos(event)
  }

  handleMouseMove = event => {
    if (!event.buttons) return
    this.lastMousePosition = this.currentMousePosition
    this.currentMousePosition = this.pos(event)
    this.lastMousePosition && this.currentMousePosition &&
    this.draw(this.lastMousePosition, this.currentMousePosition, this.state.selectedColor, true)

  }

  draw (start, end, strokeColor = 'black', shouldBroadcast = true) {

    this.ctx.lineWidth = 2

    this.ctx.beginPath()
    // this.ctx.strokeStyle = strokeColor
    this.ctx.strokeStyle = this.state.selectedColor
    this.ctx.moveTo(...start)
    this.ctx.lineTo(...end)
    this.ctx.closePath()
    this.ctx.stroke()

    // If shouldBroadcast is truthy, we will emit a draw event to listeners
    // with the start, end and color data.
    shouldBroadcast &&
          whiteboard.emit('draw', start, end, strokeColor, shouldBroadcast)
  }

  // this resizes the canvas
  resize = () => {
    // Unscale the canvas (if it was previously scaled)
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)

    // The device pixel ratio is the multiplier between CSS pixels
    // and device pixels
    const pixelRatio = window.devicePixelRatio || 1

    // Allocate backing store large enough to give us a 1:1 device pixel
    // to canvas pixel ratio.
    const w = this.canvas.clientWidth * pixelRatio
    const h = this.canvas.clientHeight * pixelRatio
    if (w !== this.canvas.width || h !== this.canvas.height) {
      // Resizing the this.canvas destroys the current content.
      // So, save it...
      const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

      this.canvas.width = w; this.canvas.height = h

      // ...then restore it.
      this.ctx.putImageData(imgData, 0, 0)
    }

    // Scale the canvas' internal coordinate system by the device pixel
    // ratio to ensure that 1 canvas unit = 1 css pixel, even though our
    // backing store is larger.
    this.ctx.scale(pixelRatio, pixelRatio)

    this.ctx.lineWidth = 5
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
  }

  clickColor = event => {
    if (!event.target.value) return
    const hex = event.target.value.split(',')[1]
    console.log(hex)
    this.setState({
      selectedColor: hex
    })
    // const current = picker.querySelector('.selected')
    // current && current.classList.remove('selected')
    // target.classList.add('selected')
  }

  render() {

    // listen for whiteboard events
    socket.on('draw-from-server', (start, end, color, shouldBroadcast, ctx) => {
      this.draw(start, end, color, false)
    })

    return (
      <div className="whiteBoardWrapper">
        {/* <div className="whiteBoardScroll"> */}

          <div className="color-selector" onClick={this.clickColor}>
            {this.state.colors.map(color => {
              return (
                <input
                  readOnly
                  type="check"
                  className={`marker ${color}`}
                  value={this.state.colorValues[color]}
                  key={color}
                />
              )
            })}
          </div>

          <canvas
            className="whiteBoard"
            ref={this.setRef}
          />
        {/* </div> */}


      </div>
    )
  }
}
export default WhiteBoard
