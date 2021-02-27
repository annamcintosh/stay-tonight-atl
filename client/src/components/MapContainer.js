import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getSites } from "../actions/siteActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
require("dotenv").config();

const testObj = {
  lat: 33.7638778,
  lng: -84.3957609,
};

class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
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

  handleGeocoding(address) {
    return geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        const stringLatLng = JSON.stringify({ lat, lng });
        const litLatLng = `lat: ${lat}, lng: ${lng}`;
        const anotherLatLng = `lat: ${33.7638778}, lng: ${-84.3957609}`;
        console.log(
          { lat, lng },
          anotherLatLng,
          typeof litLatLng,
          litLatLng,
          address,
          typeof stringLatLng,
          stringLatLng,
          typeof { lng }
        );
        const responseObj = {
          lat,
          lng,
        };
        return { responseObj };
      });
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
        style={{
          position: "relative",
          marginLeft: "17%",
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
            ({ siteName, address, stateName, city, zipcode, siteId }) => {
              const handleGeocodingResponse = this.handleGeocoding(
                `${address} ${city} ${stateName} ${zipcode}`
              );
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  name={siteName}
                  key={siteId}
                  position={{ lat: 33.7638778, lng: -84.3957609 }}
                />
              );
            }
          )}
          {sites.map(
            ({
              siteName,
              phone,
              address,
              stateName,
              city,
              zipcode,
              siteId,
            }) => (
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
                key={siteId}
                position={{ lat: 33.7638778, lng: -84.3957609 }}
              >
                <div>
                  <h4 key={`${siteId}name`}>{siteName}</h4>
                  <h5 key={`${siteId}phone`}>{phone}</h5>
                  <h5 key={`${siteId}addressone`}>{address}</h5>
                  <h5 key={`${siteId}addresstwo`}>
                    {" "}
                    {`${city}, ${stateName} ${zipcode}`}
                  </h5>
                  <a href={`/api/sites/${siteId}`}>More Information</a>
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
    apiKey: process.env.REACT_APP_API_KEY,
  })(MapContainer)
);

// export default GoogleApiWrapper({
//   apiKey: process.env.MAP_API,
// })(MapContainer);
