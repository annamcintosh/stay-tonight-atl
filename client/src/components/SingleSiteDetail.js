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
import { getSite, deleteSite } from "../actions/siteActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class SingleSiteDetail extends Component {
  static propTypes = {
    getSite: PropTypes.func.isRequired,
    deleteSite: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSite(this.props.match.params.siteId);
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.props.history.push(`/api/sites/edit/${this.props.match.params.siteId}`);
  };

  handleDelete = (e) => {
    e.preventDefault();
    const siteId = `${this.props.match.params.siteId}`;
    this.props.deleteSite(siteId);
    this.props.history.push("/api/sites");
  };

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

          {isAuthenticated ? (
            <div>
              <Button color="dark" className="mr-3" onClick={this.handleEdit}>
                Edit This Shelter
              </Button>
              <Button color="dark" className="mr-3" onClick={this.handleDelete}>
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

export default withRouter(
  connect(mapStateToProps, { getSite, deleteSite })(SingleSiteDetail)
);
