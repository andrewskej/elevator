import React, { Component } from 'react'

export default class OneColumn extends Component {
  render() {
    return (
        <div className="oneColumn" id={this.props.columnNo}>
        {[9,8,7,6,5,4,3,2,1].map((lvl,i) => <div key={i}>{lvl}</div> )}
          <div className="oneCar" id={this.props.carNo} style={{bottom:this.props.pos+'%'}}/>
        </div>
    )
  }
}
