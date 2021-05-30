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
    }
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer = () => {
    this.setState((prevState) => ({
      isShaking: false
    }))

    // getting facts from server and transform them into an objects
    axios.get('http://localhost:5000/', { withCredentials: true })
      .then(res => {
        this.setState(prevState => ({
          allFacts: [...res.data.facts.map(fact => ({
            txt: fact,
            isSaved: false,
            angle: getRandomAngle()
          })), ...prevState.allFacts],
          isShaking: true
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
    return (
      <div className="App">
        <NavBar />
        <ToastContainer autoClose={2500} limit={2} />
        <Switch>
          <Route exact path="/" render={() => <AllFacts
            facts={this.state.allFacts}
            saveFact={this.saveFact}
            getMoreFacts={this.getDataFromServer}
            isShaking={this.state.isShaking}
          />} />
          <Route exact path="/myfacts" render={() => <MyFacts />} />
        </Switch>
      </div>
    )
  }
}
