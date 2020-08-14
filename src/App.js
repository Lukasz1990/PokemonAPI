import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Layout from "./common/Layout";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <Layout>
        <Main />
      </Layout>
      <div className="App"></div>;
      <Route path="Main" component={Main} />
    </Router>
  );
}

export default App;
