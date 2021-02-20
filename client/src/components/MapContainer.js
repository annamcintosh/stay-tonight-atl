import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { getSites } from "../actions/siteActions";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
require("dotenv").config();

class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  static propTypes = {
    getSites: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSites();
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { sites } = this.props.site;
    return (
      <div
        style={{
          position: "relative",
          marginLeft: "25%",
          width: "10vw",
          height: "80vh",
        }}
      >
        <Map
          google={this.props.google}
          zoom={13}
          style={{
            width: "85vh",
            height: "75vh",
          }}
          initialCenter={{
            lat: 33.7489924,
            lng: -84.3902644,
          }}
        >
          {sites.map(
            ({
              siteName,
              latitude,
              longitude,
              siteId,
            }) => (
              <Marker
                onClick={this.onMarkerClick = this.onMarkerClick.bind(this)}
                name={siteName}
                key={siteId}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
              />
            )
          )}
          {sites.map(
            ({
              siteName,
              latitude,
              longitude,
              phone,
              address,
              stateName,
              city,
              zipcode,
              siteId,
            }) => (
              <InfoWindow
                // marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
                key={siteId}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
              >
                <div>
                  <h4 key={`${siteId}name`}>{siteName}</h4>
                  {/* <h5 key={`${siteId}phone`}>{phone}</h5>
                  <h5 key={`${siteId}addressone`}>{address}</h5>
                  <h5 key={`${siteId}addresstwo`}>
                    {" "}
                    {`${city}, ${stateName} ${zipcode}`}
                  </h5> */}
                  {/* <Link to={`/api/sites/${siteId}`}>More Information</Link> */}
                </div>
              </InfoWindow>
            )
          )}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, { getSites })(
  GoogleApiWrapper({
    apiKey: process.env.MAP_API,
  })(MapContainer)
);

// export default GoogleApiWrapper({
//   apiKey: process.env.MAP_API,
// })(MapContainer);
