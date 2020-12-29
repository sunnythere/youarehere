import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Enter from './components/Enter';
import Scrolly from './components/Scrolly';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Enter} />
      <Route path="/scrolly" component={Scrolly} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('youarehere')
);
