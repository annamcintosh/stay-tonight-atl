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
// import axios from "axios";

const Checkbox = ({ name, id, checked = false, onChange }) => (
  <CustomInput
    type="checkbox"
    id={id}
    name={name}
    checked={checked}
    onChange={onChange}
    inline
  />
);

class AddSite extends Component {
  state = {
    userId: "",
    msg: null,
    boundaryCheckboxes: [
      { id: "women", name: "women", label: "Women Welcome" },
      { id: "men", name: "men", label: "Men Welcome" },
      { id: "lgbtq", name: "lgbtq", label: "LGBTQ+ Welcome" },
      {
        id: "family",
        name: "family",
        label: "Families Welcome",
      },
      { id: "youth", name: "youth", label: "Youth Welcome" },
      { id: "pets", name: "pets", label: "Pet Friendly" },
    ],
    dayCheckboxes: [
      { id: "sunday", name: "sunday", label: "Sunday" },
      { id: "monday", name: "monday", label: "Monday" },
      { id: "tuesday", name: "tuesday", label: "Tuesday" },
      {
        id: "wednesday",
        name: "wednesday",
        label: "Wednesday",
      },
      { id: "thursday", name: "thursday", label: "Thursday" },
      { id: "friday", name: "friday", label: "Friday" },
      { id: "saturday", name: "saturday", label: "Saturday" },
    ],
    checkedItems: new Map(),
  };

  static propTypes = {
    // auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    // register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
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
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

  // handleGeocoding = (address) => {
  //   const google = window.google;
  //   const geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ address: address }, (results, status) => {
  //     if (status === "OK") {
  //       console.log(
  //         "The position of the address is:",
  //         results[0].geometry.placeId
  //       );
  //       return results[0].geometry.placeId;
  //     } else {
  //       alert("Geocode was not successful for the following reason: " + status);
  //     }
  //   });
  // };

  // handleGeocodingRequest = (addressFormatted) => {
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${addressFormatted}&key=YOUR_API_KEY`
  //     )
  //     .then((res) =>
  //       res
  //         .send(res[0].geometry.placeId)
  //         .catch((err) => console.log(err.response.data, err.response.status))
  //     );
  // };

  onSubmit = (e) => {
    // const { isAuthenticated } = this.props.auth;
    e.preventDefault();

    const siteId = uuidv4();
    const userId = uuidv4();

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
      // longitude,
      // latitude,
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
    // if (!isAuthenticated) {
    //   this.props.addsite(newSite);
    // } else {
    // }

    this.props.addSite(newSite);
  };

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
                {this.state.boundaryCheckboxes.map((item) => (
                  <label key={item.id}>
                    {item.label}
                    <Checkbox
                      id={item.id}
                      name={item.name}
                      checked={this.state.checkedItems.get(item.name)}
                      onChange={this.onCheck}
                    />
                  </label>
                ))}
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
                {this.state.dayCheckboxes.map((item) => (
                  <label key={item.id}>
                    {item.label}
                    <Checkbox
                      id={item.id}
                      name={item.name}
                      checked={this.state.checkedItems.get(item.name)}
                      onChange={this.onCheck}
                    />
                  </label>
                ))}
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
              <Button
                color="dark"
                className="mr-2"
                onClick={this.state.onSubmit}
              >
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { addSite, clearErrors })(AddSite);
