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

class EditSite extends Component {
  state = {
    msg: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    getSite: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSite(this.props.match.params.siteId);
    const {
      siteName,
      siteId,
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
    } = this.props.site.selectedSite;
    this.setState({
      siteName,
      siteId,
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
    });
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
    const { user } = this.props.auth;
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
      siteId,
    } = this.state;

    const editUserId = user.id;

    // Create site object
    const newSite = {
      siteId,
      editUserId,
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
    console.log("onSubmit called!")
    this.props.addSite(newSite)
    setTimeout(() => this.props.history.push("/"), 500);
  };

  render() {
    return (
      <div>
        <Container>
          <h1 className="mb-4">Edit {this.state.siteName}</h1>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="siteName">Shelter Name</Label>
              <Input
                type="text"
                name="siteName"
                id="siteName"
                value={this.state.siteName}
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
                  checked={this.state.women}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Men Welcome"
                  id="men"
                  name="men"
                  checked={this.state.men}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="LGBTQ+ Welcome"
                  id="lgbtq"
                  name="lgbtq"
                  checked={this.state.lgbtq}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Families Welcome"
                  id="family"
                  name="family"
                  checked={this.state.family}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Youth Welcome"
                  id="youth"
                  name="youth"
                  checked={this.state.youth}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Pet Friendly"
                  id="pets"
                  name="pets"
                  checked={this.state.pets}
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
                    value={this.state.phone}
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
                value={this.state.address}
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
                    value={this.state.city}
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
                    value={this.state.stateName}
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
                    value={this.state.zipcode}
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
                  checked={this.state.sunday}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Monday"
                  id="monday"
                  name="monday"
                  checked={this.state.monday}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Tuesday"
                  id="tuesday"
                  name="tuesday"
                  checked={this.state.tuesday}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Wednesday"
                  id="wednesday"
                  name="wednesday"
                  checked={this.state.wednesday}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Thursday"
                  id="thursday"
                  name="thursday"
                  checked={this.state.thursday}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Friday"
                  id="friday"
                  name="friday"
                  checked={this.state.friday}
                  onChange={this.onChange}
                  inline
                />
                <CustomInput
                  type="checkbox"
                  label="Saturday"
                  id="saturday"
                  name="saturday"
                  checked={this.state.saturday}
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
                value={this.state.details}
                className="mb-4"
              />
            </FormGroup>
            <FormGroup>
              <Button color="dark" className="mr-2" onClick={this.onSubmit}>
                Submit
              </Button>
              <Link to={`/${this.state.siteId}`} className="styledLinkText">Cancel</Link>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
  error: state.error,
});

export default withRouter(
  connect(mapStateToProps, { getSite, addSite, clearErrors })(EditSite)
);
