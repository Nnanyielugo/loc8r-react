import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Layout from './hoc/Layout';
import LocationsList from './Containers/LocationsList/LocationsList';
import Location from './Containers/Location/Location';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/:id" component={Location} />
        <Route path="/" component={LocationsList} />
        <Redirect to='/' />
      </Switch>
    )

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default App;
