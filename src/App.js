import React from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Bisection from './containers/Bisection';
import FalsePosition from './containers/FalsePosition';
import OnePoint from './containers/Onepoint'
import CramerRule from './containers/CramerRule';
import NewtonRaphson from './containers/NewtonRaphson'
import Secant from './containers/Secant'
import GaussElimination from './containers/GaussElimination'
import GaussJordan from './containers/GaussJordan';
import LUDecomposition from './containers/LUComposition';
import APIDoc from './components/APIDoc';
import ConjugateGradient from './containers/Conjugate';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/"><Redirect to ="/bisection" /></Route>
              <Route exact path="/bisection" component={Bisection} />
              <Route exact path="/false-position" component={FalsePosition} />
              <Route exact path="/one-point" component={OnePoint} />
              <Route exact path="/cramer-rule" component={CramerRule} />
              <Route exact path="/newton-raphson" component={NewtonRaphson} />
              <Route exact path="/secant" component={Secant} />
              <Route exact path="/gauss-elimination" component={GaussElimination} />
              <Route exact path="/gauss-jordan" component={GaussJordan} />
              <Route exact path="/lu-decomposition" component={LUDecomposition} />
              <Route exact path="/conjugate-gradient" component={ConjugateGradient} />
              <Route exact path="/swagger" component={APIDoc} />
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
