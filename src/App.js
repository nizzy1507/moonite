import React from 'react';
import GlobalStyles from './components/GlobalStyles';
import { Redirect, Route, Switch } from 'react-router-dom';

// Pages and components
import Home from './pages/Home';
import NotFound from './components/NotFound';
import Wrapper from './components/Wrapper';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Wrapper>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/games" />
          </Route>
          <Route path="/games">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Wrapper>
    </div>
  );
}

export default App;
