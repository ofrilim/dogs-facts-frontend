import React, { Component } from 'react';
import { getRandomColor } from '../utilsService';

export default class Fact extends Component {

  handleSave = () => {
    if (this.props.fact.isSaved) return;
    this.props.saveFact(this.props.fact);
  }

  handleRemove = () => {
    this.props.removeFact(this.props.fact);
  }

  render() {
    let { txt, isSaved, angle } = this.props.fact;

    return (
      <li className={`Fact ${!isSaved && "pointer"}`}
        style={{ transform: `rotate(${angle}deg)` }}
        onDoubleClick={this.handleSave}>
        { isSaved ? <button className="pointer" onClick={this.handleRemove}>x</button>
          : ''}
        <p><span className="quote quote-left" style={{ color: getRandomColor() }}>"</span>{txt}
          <span className="quote quote-right" style={{ color: getRandomColor() }}>"</span></p>
      </li>
    )
  }
}

