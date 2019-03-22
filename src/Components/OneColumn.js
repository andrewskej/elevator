import React, { Component } from 'react'

export default class OneColumn extends Component {
  render() {
    return (
        <div className={this.props.columnNo} style={{position:'relative', fontSize:'25px', color:'white', border:'solid 1px gray', padding:'15px'}}>
         {[9,8,7,6,5,4,3,2,1].map((lvl,i) => <div key={i}>{lvl}</div> )}
          <div className={this.props.carNo} style={{position:'absolute', width:'98%', height:'10%', left:'-1%', bottom:this.props.pos+'%', border:'solid 1px gold'}}/>
        </div>
    )
  }
}
