import React, { Component } from "react";
import { Container, Card, Button, CardTitle, CardText } from "reactstrap";
import { connect } from "react-redux";
import { getSites, getSite } from "../actions/siteActions";
import PropTypes from "prop-types";

class SitePreviewTile extends Component {
  static propTypes = {
    getSites: PropTypes.func.isRequired,
    getSite: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSites();
  }

  onSubmit = (siteId) => {
    console.log(`You want to see siteId: ${siteId}`);
    this.props.getSite(siteId);
  };

  render() {
    const { sites } = this.props.site;
    return (
      <Container>
        {sites.map(
          ({ siteName, phone, address, stateName, city, zipcode, siteId }) => (
            <Card body className="text-center">
              <CardTitle tag="h5">{siteName}</CardTitle>
              <CardText>{phone}</CardText>
              <CardText>{address}</CardText>
              <CardText>{`${city}, ${stateName} ${zipcode}`}</CardText>
              <Button
                block
                onClick={(e) => {
                  e.preventDefault();
                  this.onSubmit(siteId);
                }}
              >
                More Information
              </Button>
            </Card>
          )
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, { getSites })(SitePreviewTile);
