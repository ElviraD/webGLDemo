import React, { Component } from 'react';
import './index.css'


export default class Cube extends Component {

  render(){
    return (
      <div className="cube-demo">
        <h1 className='demo-title'>webGL demo 旋转的立方体</h1>
        <canvas id="webgl-cube" width="640" height="480"></canvas>
      </div>
    )
  }
}