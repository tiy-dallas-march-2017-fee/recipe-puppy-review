import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {

  componentDidMount() {
    $.ajax({
      url: '/api'
    })
    .done((data) => {
      console.log('response?', data);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Hey look, I changed this. And I'm changing it again!
        </p>
      </div>
    );
  }
}

export default App;
