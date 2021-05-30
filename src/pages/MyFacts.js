import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getRandomAngle, notify } from '../utilsService';
import FactsList from '../components/FactsList';
import dogImage from '../images/no-facts-dog.png';

export default class MyFacts extends Component {
  constructor() {
    super();
    this.state = {
      myFacts: []
    }
  }

  componentDidMount() {
    // get the user's personal facts from server
    axios.get('http://localhost:5000/myfacts', { withCredentials: true })
      .then(res => {
        this.setState({
          myFacts: res.data.map(fact => ({
            txt: fact,
            isSaved: true,
            angle: getRandomAngle()
          }))
        })
      })
  }

  removeFact = (factToRemove) => {
    this.setState(prevState => ({
      myFacts: prevState.myFacts.filter(fact => fact.txt !== factToRemove.txt)
    }));
    // remove fact from server
    axios.put('http://localhost:5000/removefact', {
      txt: factToRemove.txt
    }, { withCredentials: true })

    notify('Removed');
  }

  render() {
    let { myFacts } = this.state;
    return (
      <div className="My-Facts">
        <h1 className="bold capitalize center">my facts</h1>
        <ToastContainer autoClose={2500} limit={2} />
        {myFacts.length > 0 ? <FactsList facts={myFacts} removeFact={this.removeFact} />
                            : <div className="no-facts">
                                <img src={dogImage} alt={'dog'}/>
                                <h3>No saved facts</h3>
                              </div>}
      </div>
    )
  }
}
