import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Question1}/>
      <Route path="/question/2" component={Question2}/>
      <Route path="/question/3" component={Question3}/>
    </Switch>
  )
}

export default App;
