import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Jumbotron,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { getSite } from "../actions/siteActions";
import PropTypes from "prop-types";

class SingleSiteDetail extends Component {
  static propTypes = {
    getSite: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSite(this.props.match.params.siteId);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { sites } = this.props.site;
    const {
      siteName,
      phone,
      address,
      stateName,
      city,
      zipcode,
      youth,
      thursday,
      monday,
      women,
      tuesday,
      wednesday,
      friday,
      lgbtq,
      sunday,
      pets,
      men,
      saturday,
      details,
      family,
    } = sites;

    return (
      <Container>
        <Jumbotron>
          <h1 className="display-3">{siteName}</h1>
          <p className="lead">{phone}</p>
          <p className="lead">{address}</p>
          <p className="lead">{`${city}, ${stateName} ${zipcode}`}</p>
          <hr className="my-2" />
          {lgbtq ? (
            <p color="secondary" className="ml-3">
              LGBTQ+ Community Welcome
            </p>
          ) : null}
          {women ? (
            <p color="secondary" className="ml-3">
              Women Welcome
            </p>
          ) : null}
          {pets ? (
            <p color="secondary" className="ml-3">
              Pet Friendly
            </p>
          ) : null}
          {men ? (
            <p color="secondary" className="ml-3">
              Men Welcome
            </p>
          ) : null}
          {youth ? (
            <p color="secondary" className="ml-3">
              Youth Welcome
            </p>
          ) : null}
          {family ? (
            <p color="secondary" className="ml-3">
              Families Welcome
            </p>
          ) : null}
          <hr className="my-2" />
          <ListGroupItem>
            <ListGroupItemHeading>Days Open:</ListGroupItemHeading>
            {sunday ? <ListGroupItemText>Sunday</ListGroupItemText> : null}
            {monday ? <ListGroupItemText>Monday</ListGroupItemText> : null}
            {tuesday ? <ListGroupItemText>Tuesday</ListGroupItemText> : null}
            {wednesday ? (
              <ListGroupItemText>Wednesday</ListGroupItemText>
            ) : null}
            {thursday ? <ListGroupItemText>Thursday</ListGroupItemText> : null}
            {friday ? <ListGroupItemText>Friday</ListGroupItemText> : null}
            {saturday ? <ListGroupItemText>Saturday</ListGroupItemText> : null}
          </ListGroupItem>
          <hr className="my-2" />
          <h3>About This Shelter:</h3>
          <p className="lead">{details}</p>

          {!isAuthenticated ? (
            <div>
              <Button color="dark" className="mr-3" onClick={this.toggleModal}>
                Edit This Shelter
              </Button>
              <Button color="dark" className="mr-3" onClick={this.toggleModal}>
                Delete This Shelter
              </Button>
            </div>
          ) : null}
        </Jumbotron>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSite })(SingleSiteDetail);
