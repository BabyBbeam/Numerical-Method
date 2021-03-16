import React from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { HashRouter, Redirect, Route } from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="content">
          <HashRouter>
            <Redirect exact from="/" to="/bisection" />
            <Route exact path="/bisection" render={() => <div>test</div>} />
          </HashRouter>
        </div>
        <div className="footer">
          da
        </div>
      </div>
    );
  }
}

export default App;
