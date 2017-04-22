import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { BrowserRouter, Route } from 'react-router-dom'
import Enter from './components/Enter'

ReactDOM.render(
  <BrowserRouter>
      <Route path='/' component={Enter} >
      {
        // <IndexRedirect to="/build" />
        // <Route path="/build" component={Scroll1} onEnter={onBuildEnter} />
      }
      </Route>
  </BrowserRouter>,
document.getElementById('youarehere')
)

