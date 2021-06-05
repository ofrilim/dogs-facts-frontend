import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getRandomAngle, notify } from './utilsService';

import AllFacts from './pages/AllFacts';
import MyFacts from './pages/MyFacts';
import NavBar from './components/NavBar';
import './styles/global.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allFacts: [],
      isShaking: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer = () => {
    this.setState({
      isShaking: false,
      isLoading: true
    })

    // getting facts from server and transform them into an objects
    axios.get('http://localhost:5000/', { withCredentials: true })
      .then(res => {
        this.setState(prevState => ({
          allFacts: [...res.data.facts.map(fact => ({
            txt: fact,
            isSaved: false,
            angle: getRandomAngle()
          })), ...prevState.allFacts],
          isShaking: true,
          isLoading: false
        }))
      })

  }

  saveFact = (factToSave) => {
    // save fact to server
    axios.post('http://localhost:5000/savefact', {
      txt: factToSave.txt
    }, { withCredentials: true })

    notify('Saved');
  }

  render() {
    const { allFacts, isShaking, isLoading } = this.state;
    return (
      <div className="App">
        <NavBar />
        <ToastContainer autoClose={2500} limit={2} />
        <Switch>
          <Route exact path="/" render={() => <AllFacts
            facts={allFacts}
            saveFact={this.saveFact}
            getMoreFacts={this.getDataFromServer}
            isShaking={isShaking}
            isLoading={isLoading}
          />} />
          <Route exact path="/myfacts" render={() => <MyFacts isLoading={isLoading} />} />
        </Switch>
      </div>
    )
  }
}
