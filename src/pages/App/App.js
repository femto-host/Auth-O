import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from '../Dashboard/Dashboard';
import RealmRedirect from '../../components/RealmRedirect';

const Index = () => <h2>Index</h2>;
const Docs = () => <h2>Docs</h2>;
const NotFound = () => <h2>Not Found</h2>;

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/docs/" component={Docs} />
          <Route path="/admin/" exact component={RealmRedirect} />
          <Redirect from="/admin/:realm" to="/admin/:realm/settings" exact />
          <Route path="/admin/:realm/:component" exact component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
