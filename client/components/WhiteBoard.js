import React from 'react'
import {connect} from 'react-redux'
// import whiteboard, {draw} from '../whiteboard'

class WhiteBoard extends React.Component {


  componentDidMount = () => {
    draw([0, 0], [250, 250], 'red', true)
  }


  render() {

    return (
      <div>

      </div>
    )
  }
}

export default WhiteBoard
