import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./components/AppNavbar";
// import Map from "./components/Map";
import SitePreviewTile from "./components/SitePreviewTile";
import { loadUser } from "./actions/authActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddSite from "./components/AddSite";
import SingleSiteDetail from "./components/SingleSiteDetail";
import EditSite from "./components/EditSite";
import MapContainer from "./components/MapContainer";

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
              <Route exact path="/add" component={AddSite} />
              <Route path="/edit/:siteId" component={EditSite} />
              <Route path="/:siteId" component={SingleSiteDetail} />
              <Route exact path="/">
                {/* <Map /> */}
                <MapContainer />
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
