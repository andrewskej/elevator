import React, { Component } from 'react'

export default class Passenger extends Component {
    
    state={
        initPos:'',
        destination:'',
    }

    

    componentDidUpdate(){
        const positions =[2,3,4,5,6,7,8,9]

        this.setState({
            initPos: 130,  //저중에서 랜덤으로 한층에서 시작
            destination: 55 //이것도 랜덤(곂치지 않게)
        })
    }
  
    render() {
    
        const {initPos} = this.state;


        return (
            <div className="passenger">
                <img alt="man" style={{marginTop:initPos}} src={require('../elvMan.png')}/>
            </div>
        )
  }
}
