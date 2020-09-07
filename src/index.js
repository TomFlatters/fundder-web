import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

import ViewPost from './components/viewpost';
import Home from './components/home';
import DoFeed from './components/dofeed';

// Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAmWHeHrZsqvq-y-vPZhDq4y5lbz6XWxWU",
  authDomain: "fundder-c4a64.firebaseapp.com",
  databaseURL: "https://fundder-c4a64.firebaseio.com",
  projectId: "fundder-c4a64",
  storageBucket: "fundder-c4a64.appspot.com",
  messagingSenderId: "256734528568",
  appId: "1:256734528568:web:8f18a52712afcfc66a52cd",
  measurementId: "G-1621E8XJ7B"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/do' component={DoFeed}></Route>
        <Route exact path='/post/:id' component={ViewPost}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
