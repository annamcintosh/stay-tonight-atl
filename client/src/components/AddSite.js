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
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { addSite } from "../actions/siteActions";
import { clearErrors } from "../actions/errorActions";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import axios from "axios";

class AddSite extends Component {
  state = {
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
    clearErrors: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

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
    const { user } = this.props.auth;
    e.preventDefault();

    const siteId = uuidv4();
    const userId = user.id;

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

    // //Add site
    this.props.addSite(newSite);
    this.props.history.push("/api/sites");
  }

  render() {
    return (
      <div>
        <Container>
          <h1 className="mb-4">Add a New Place to Stay</h1>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="siteName">Shelter Name</Label>
              <Input
                type="text"
                name="siteName"
                id="siteName"
                placeholder="Name"
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
                    placeholder="123-456-7890"
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
                placeholder="1234 Main St"
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
                placeholder="Tell us more about this site. Do you need identification to stay here? What time do you need to arrive? What services are available?"
                className="mb-4"
              />
            </FormGroup>
            <FormGroup>
              <Button color="dark" className="mr-2" onClick={this.onSubmit}>
                Submit
              </Button>
              <Link to={"/api/sites"}>Cancel</Link>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default withRouter(
  connect(mapStateToProps, { addSite, clearErrors })(AddSite)
);
