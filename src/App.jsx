import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HabitContextProvider } from './context/HabitContext';
import Home from './pages/Home';
import './styles/App.css';

const App = () => {
  return (
    <HabitContextProvider>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </HabitContextProvider>
  );
};

export default App;