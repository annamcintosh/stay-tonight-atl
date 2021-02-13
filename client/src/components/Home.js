import React, { Component } from "react";
import MapContainer from "./MapContainer";
import SitePreviewTile from "./SitePreviewTile";

class Home extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <MapContainer />
        </div>
        <div>
          <SitePreviewTile />
        </div>
      </div>
    );
  }
}

export default Home;
