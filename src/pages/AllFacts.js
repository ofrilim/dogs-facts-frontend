import React, { Component } from 'react';
import FactsList from '../components/FactsList';
import dogFace from '../images/pug-face.png';

export default class AllFacts extends Component {

  handleClick = () => {
    this.props.getMoreFacts()
  }

  render() {
    const { isShaking, facts, saveFact, isLoading } = this.props;
    return (
      <div className="All-Facts center">
        <h1 className="bold capitalize">dogs facts app</h1>
        <h3>Like a fact? Double Click to save it!</h3>
        <img className={isShaking ? 'shake' : ''} src={dogFace} alt={'Pug puppy face'} />
        <button className="bold capitalize" onClick={this.handleClick}>get more facts</button>
        <FactsList facts={facts} saveFact={saveFact} isLoading={isLoading} />
      </div>
    )
  }
}
