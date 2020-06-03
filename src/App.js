import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import logo from './logo.svg';
import './App.css';
import { StateProvider } from './store/index.js';
import Header from "./Header";
import Home from "./views/Home";
import FullPageLoader from "./components/loader/fullPageLoader";
import Toast from "./components/Toast";
import Popup from "./components/Popup";
import MovieDetail from "./views/MovieDetail";

function App() {
  return (
    <StateProvider>
      <Router>
        <Switch>
          <Route exact path="/movie/:movieId" component={MovieDetail}/>
          <Route path="/" component={Home}/>
        </Switch>
        <FullPageLoader/>
        <Toast/>
        <Popup/>
      </Router>
    </StateProvider>
  );
}

export default App;
