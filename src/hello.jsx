import React, { Component } from 'react';
import { sayHello } from './utils/utils.js';
import abdul from '../static/images/abdul.jpg';

export default class Hello extends Component {
  render() {
    return (
      <div className="hello">
        Helloooo again { sayHello() }
        <img src={abdul} />
      </div>
    )
  }
}