import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./style/blk-design-system.css";
import "./App.css";
// Components
import Home from "./components/Home";
import Posts from "./components/Posts";
import TimeLine from "./components/TimeLine";

import Highchart from "./components/Highchart";
import Vis from "./components/Vis";
import Header from "./components/common/Header";

// Redux
import store from "./store";
import { Provider } from "react-redux";

export default class App extends Component {
  state = {
    routes: [
      {
        path: "/",
        title: "Home",
        component: Home,
        id: 3
      },
      {
        path: "/Highchart",
        title: "Highchart",
        component: Highchart,
        id: 5
      },
      {
        path: "/Vis",
        title: "Vis",
        component: Vis,
        id: 7
      },
      {
        path: "/Timeline",
        title: "Timeline",
        component: TimeLine,
        id: 9
      },
      {
        path: "/Posts",
        title: "Posts",
        component: Posts,
        id: 33
      }
    ]
  };
  componentDidMount() {
    store.dispatch({
      type: "CHECK_USER"
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Router>
            <Header menu={this.state.routes} />
            {this.state.routes.map(route => (
              <Route
                key={route.id}
                path={route.path}
                exact
                component={route.component}
              />
            ))}
          </Router>
        </Fragment>
      </Provider>
    );
  }
}
