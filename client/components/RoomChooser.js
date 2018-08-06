import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'

class RoomChooser extends React.Component {



  state = {
    roomName: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('hey, you clicked!')
  }

  render() {

    return (
      <div className="roomSelectWrapper">
        <div>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="roomSelectForm">
            {/* <div> */}
              <h2>Welcome!</h2>
              <h4>Which room would like to join?</h4>
            {/* </div> */}
            <input type="text" name="roomName" value={this.state.roomName} />
            <div>
              <NavLink to={`/rooms/${this.state.roomName}`} className="">Join Room</NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RoomChooser
