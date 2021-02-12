import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getSites } from "../actions/siteActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
require("dotenv").config();

class Map extends Component {
  static propTypes = {
    getSites: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSites();
  }

  render() {
    const { sites } = this.props.site;
    return (
      <LoadScript googleMapsApiKey={process.env.MAPS_API}>
        <GoogleMap
          mapContainerStyle={{
            height: "75vh",
            width: "75%",
          }}
          zoom={13}
          center={{
            lat: 33.75,
            lng: -84.39,
          }}
        >
          {sites.map(({ siteName, latitude, longitude }) => (
            <Marker
              key={siteName}
              position={{
                lat: parseFloat({ latitude }),
                lng: parseFloat({ longitude }),
              }}
            />
          ))}
          <Marker
            key="Local"
            position={{ lat: 33.7741056, lng: -84.3622903 }}
          />
        </GoogleMap>
      </LoadScript>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, { getSites })(Map);
