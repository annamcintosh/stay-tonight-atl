import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Jumbotron } from "reactstrap";
import { getSite } from "../actions/siteActions";
import PropTypes from "prop-types";

class SingleSiteDetail extends Component() {
  static propTypes = {
    getSite: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSite();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { sites } = this.props.site;
    return (
      <div>
        <Container>
          {sites.map(
            ({ siteName, phone, address, stateName, city, zipcode,  }) => (
              <Jumbotron>
                <h1 className="display-3">{siteName}</h1>
                <p className="lead">{phone}</p>
                <p className="lead">{address}</p>
                <p className="lead">{`${city}, ${stateName} ${zipcode}`}</p>
                <hr className="my-2" />

                {!isAuthenticated ? (
                  <div>
                    <Button color="dark" size="sm" onClick={this.toggleModal}>
                      Delete This Shelter
                    </Button>
                    <Button color="dark" size="sm" onClick={this.toggleModal}>
                      Edit This Shelter
                    </Button>
                  </div>
                ) : null}
              </Jumbotron>
            )
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSite })(SingleSiteDetail);
