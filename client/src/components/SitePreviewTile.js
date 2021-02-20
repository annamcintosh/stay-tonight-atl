import React, { Component } from "react";
import { Container, Card, CardTitle, CardText, CardColumns } from "reactstrap";
import { connect } from "react-redux";
import { getSites } from "../actions/siteActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SitePreviewTile extends Component {
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
      <Container>
        <CardColumns>
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
              <Card body className="text-center" key={`${siteId}body`}>
                <CardTitle tag="h5" key={`${siteId}name`}>
                  {siteName}
                </CardTitle>
                <CardText key={`${siteId}phone`}>{phone}</CardText>
                <CardText key={`${siteId}address`}>{address}</CardText>
                <CardText
                  key={`${siteId}city`}
                >{`${city}, ${stateName} ${zipcode}`}</CardText>
                <Link to={`/api/sites/${siteId}`}>More Information</Link>
              </Card>
            )
          )}
        </CardColumns>
        <p className="text-center">
          Don't see your shelter? Register or log in to add it!
        </p>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, { getSites })(SitePreviewTile);
