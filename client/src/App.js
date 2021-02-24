import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./components/AppNavbar";
import Map from "./components/Map";
import SitePreviewTile from "./components/SitePreviewTile";
import { loadUser } from "./actions/authActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddSite from "./components/AddSite";
import SingleSiteDetail from "./components/SingleSiteDetail";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <header>
              <AppNavbar />
            </header>
            <Switch>
              <Route exact path="/api/sites/add" component={AddSite} />
              <Route path="/api/sites/:siteId" component={SingleSiteDetail} />
              <Route exact path="/api/sites">
                <Map />
                <SitePreviewTile />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
