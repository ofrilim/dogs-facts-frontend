import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Fact from './Fact';

export default class FactsList extends Component {

  componentWillUnmount() {
    toast.dismiss()
  }

  render() {
    return (
      <ul className="Facts-List">
        {this.props.facts.map((fact) =>
          <Fact
            key={fact}
            fact={fact}
            saveFact={this.props.saveFact}
            removeFact={this.props.removeFact}
          />)}
      </ul>
    )
  }
}
