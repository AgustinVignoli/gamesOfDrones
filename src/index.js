import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import Particles from "react-particles-js";

const params = {
  particles: {
    number: {
      value: 1000
    },
    size: {
      value: 3
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
};
const Game = () => <h1>Game Page</h1>;
const Config = () => <h1>Config Page</h1>;

ReactDOM.render(
  <Fragment>
    <Particles {...params} />
    <Router>
      <Fragment>
        <Route exact path="/" component={App} />
        <Route path="/game" component={Game} />
        <Route path="/config" component={Config} />
      </Fragment>
    </Router>
  </Fragment>,
  document.getElementById("root")
);
