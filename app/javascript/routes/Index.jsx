import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Books from "../components/Books";
import Book from "../components/Book";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/books" exact component={Books} />
      <Route path="/book/:id" exact component={Book}/>
    </Switch>
  </Router>
);