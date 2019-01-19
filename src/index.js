import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";

const Game = () => <h1>Game Page</h1>;
const Config = () => <h1>Config Page</h1>;

ReactDOM.render(
  <Router>
    <Fragment>
      <Route exact path="/" component={App} />
      <Route path="/game" component={Game} />
      <Route path="/config" component={Config} />
    </Fragment>
  </Router>,
  document.getElementById("root")
);
