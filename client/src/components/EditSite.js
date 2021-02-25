import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Col,
  Row,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSite, getSite } from "../actions/siteActions";
import { clearErrors } from "../actions/errorActions";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import axios from "axios";

class AddSite extends Component {
  state = {
    userId: "",
    msg: null,
    women: false,
    men: false,
    lgbtq: false,
    family: false,
    youth: false,
    pets: false,
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    getSite: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSite(this.props.match.params.siteId);
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    const { isAuthenticated, user } = this.props.auth;
    const { sites } = this.props.site;
    e.preventDefault();

    const {
      youth,
      thursday,
      monday,
      women,
      stateName,
      address,
      tuesday,
      wednesday,
      friday,
      city,
      zipcode,
      siteName,
      lgbtq,
      sunday,
      pets,
      men,
      saturday,
      details,
      family,
      phone,
    } = this.state;

    const siteId = sites.siteId;
    const userId = user.id;

    // const fullAddress = `${address} ${city} ${stateName} ${zipcode}`;

    // const position = this.handleGeocodingRequest(fullAddress);

    // console.log(position);

    // Create site object
    const newSite = {
      siteId,
      userId,
      youth,
      thursday,
      monday,
      women,
      stateName,
      address,
      tuesday,
      wednesday,
      friday,
      city,
      zipcode,
      siteName,
      lgbtq,
      sunday,
      pets,
      men,
      saturday,
      details,
      family,
      phone,
    };

    // //Attempt to add site
    if (isAuthenticated) {
      this.props.addsite(newSite);
    }

    // this.props.addSite(newSite);
    this.props.history.push("/api/sites");
  };

  render() {
    const { sites } = this.props.site;
    const {
      siteName,
      siteId,
      phone,
      address,
      stateName,
      city,
      zipcode,
    //   youth,
    //   thursday,
    //   monday,
    //   women,
    //   tuesday,
    //   wednesday,
    //   friday,
    //   lgbtq,
    //   sunday,
    //   pets,
    //   men,
    //   saturday,
      details,
    //   family,
    } = sites;

    return (
      <div>
        <Container>
          <h1 className="mb-4">Edit {siteName}</h1>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="siteName">Shelter Name</Label>
              <Input
                type="text"
                name="siteName"
                id="siteName"
                placeholder={siteName}
                onChange={this.onChange}
                className="mb-4"
              />
            </FormGroup>
            <FormGroup>
              <Label for="welcome">Boundaries (Select All That Apply):</Label>
              <div className="mb-4 ml-3">
                <CustomInput
                  type="checkbox"
                  label="Women Welcome"
                  id="women"
                  name="women"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Men Welcome"
                  id="men"
                  name="men"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="LGBTQ+ Welcome"
                  id="lgbtq"
                  name="lgbtq"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Families Welcome"
                  id="family"
                  name="family"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Youth Welcome"
                  id="youth"
                  name="youth"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Pet Friendly"
                  id="pets"
                  name="pets"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
              </div>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder={phone}
                    onChange={this.onChange}
                    className="mb-4"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder={address}
                onChange={this.onChange}
                className="mb-4"
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder={city}
                    onChange={this.onChange}
                    className="mb-4"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="stateName">State</Label>
                  <Input
                    type="text"
                    name="stateName"
                    placeholder={stateName}
                    onChange={this.onChange}
                    id="stateName"
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="zipcode">Zip</Label>
                  <Input
                    type="text"
                    name="zipcode"
                    placeholder={zipcode}
                    onChange={this.onChange}
                    id="zipcode"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="daysCheckbox">Days Open:</Label>
              <div className="mb-4">
                <CustomInput
                  type="checkbox"
                  label="Sunday"
                  id="sunday"
                  name="sunday"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Monday"
                  id="monday"
                  name="monday"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Tuesday"
                  id="tuesday"
                  name="tuesday"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Wednesday"
                  id="wednesday"
                  name="wednesday"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Thursday"
                  id="thursday"
                  name="thursday"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Friday"
                  id="friday"
                  name="friday"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Saturday"
                  id="saturday"
                  name="saturday"
                  checked={this.state.checked}
                  onChange={this.onChange}
                  inline
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="details">Details</Label>
              <Input
                type="textarea"
                name="details"
                id="details"
                onChange={this.onChange}
                placeholder={details}
                className="mb-4"
              />
            </FormGroup>
            <FormGroup>
              <Button
                color="dark"
                className="mr-2"
                onClick={this.state.onSubmit}
              >
                Submit
              </Button>
              <Link to={`/api/sites/${siteId}`}>Cancel</Link>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default withRouter(
  connect(mapStateToProps, { addSite, clearErrors })(AddSite)
);
