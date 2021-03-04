import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { getSites } from "../actions/siteActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
require("dotenv").config();

class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
    mapStyles: {
      width: "100%",
      height: "100%",
    },
  };

  static propTypes = {
    getSites: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    onMarkerClick: PropTypes.func,
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
    const { sites, loading } = this.props.site;
    if (loading === true) {
      return (
        <h2 className="text-center">
          One moment while we load the map, please.
        </h2>
      );
    }
    return (
      <div
        id="mapBox"
      >
        <Map
          google={this.props.google}
          zoom={11}
          style={this.state.mapStyles}
          initialCenter={{
            lat: 33.7489924,
            lng: -84.3902644,
          }}
        >
          {sites.map(
            ({
              siteName,
              latLngResults,
              siteId,
              address,
              city,
              stateName,
              zipcode,
              phone,
            }) => {
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  name={siteName}
                  key={siteId}
                  position={latLngResults}
                  address={address}
                  city={city}
                  stateName={stateName}
                  zipcode={zipcode}
                  phone={phone}
                  siteId={siteId}
                />
              );
            }
          )}
          {sites.map(({ siteId, latLngResults }) => (
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
              key={siteId}
              position={latLngResults}
            >
              <div>
                <h4 key={`${siteId}name`}>{this.state.selectedPlace.name}</h4>
                <h5 key={`${siteId}phone`}>{this.state.selectedPlace.phone}</h5>
                <h5 key={`${siteId}addressone`}>
                  {this.state.selectedPlace.address}
                </h5>
                <h5 key={`${siteId}addresstwo`}>
                  {" "}
                  {`${this.state.selectedPlace.city}, ${this.state.selectedPlace.stateName} ${this.state.selectedPlace.zipcode}`}
                </h5>
                <a href={`/api/sites/${this.state.selectedPlace.siteId}`}>
                  More Information
                </a>
              </div>
            </InfoWindow>
          ))}
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
    apiKey: process.env.REACT_APP_API_KEY,
  })(MapContainer)
);
