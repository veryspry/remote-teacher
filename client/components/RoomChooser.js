import React from 'react'
import {connect} from 'react-redux'

class RoomChooser extends React.Component {



  render() {

    return (
      <div className="roomSelectForm">
        <form>
          <input type="text"></input>
          <input type="text"></input>
          <div>
            <button id="startButton">Start</button>
            <button id="callButton">Call</button>
            <button id="hangupButton">Hang Up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RoomChooser
