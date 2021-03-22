import React from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Bisection from './containers/Bisection';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter>
        <Navbar />
        <div className="content">
          
            <Redirect exact from="/" to="/bisection" />
            <Switch>
              <Route exact path="/bisection" component={Bisection} />
              <Route exact path="*" render={() => <div>Error 404 Not Found.</div>} />
            </Switch>
          
        </div>
        </HashRouter>
        <div className="footer">
        da
        </div>
      </div>
    );
  }
}

export default App;
