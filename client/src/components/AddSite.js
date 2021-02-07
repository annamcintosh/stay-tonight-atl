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
  NavLink,
  Alert,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSite } from "../actions/siteActions";
import { clearErrors } from "../actions/errorActions";

class AddSite extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //Clear Errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // Create user object
    const newSite = {
      name,
      email,
      password,
    };

    //Attempt to register
    this.props.addsite(newSite);
  };

  render() {
    return (
      <div>
        <Container>
          <h1 className="mb-4">Add a New Place to Stay</h1>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">Shelter Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
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
                  id="Women"
                  label="Women Only"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Youth"
                  label="Youth Only"
                  inline
                />
                <CustomInput type="checkbox" id="Men" label="Men Only" inline />
                <CustomInput
                  type="checkbox"
                  id="lgbtq"
                  label="LGBTQ+ Friendly"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Families"
                  label="Families Welcome"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Pets"
                  label="Pet Friendly"
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
                    className="mb-4"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleAddress">Address</Label>
              <Input
                type="text"
                name="address"
                id="exampleAddress"
                placeholder="1234 Main St"
                className="mb-4"
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="exampleCity"
                    className="mb-4"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">State</Label>
                  <Input type="text" name="state" id="exampleState" />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleZip">Zip</Label>
                  <Input type="text" name="zip" id="exampleZip" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleCheckbox">Days Open:</Label>
              <div className="mb-4">
                <CustomInput
                  type="checkbox"
                  id="Sunday"
                  label="Sunday"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Monday"
                  label="Monday"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Tuesday"
                  label="Tuesday"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Wednesday"
                  label="Wednesday"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Thursday"
                  label="Thursday"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Friday"
                  label="Friday"
                  inline
                />
                <CustomInput
                  type="checkbox"
                  id="Saturday"
                  label="Saturday"
                  inline
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="details">Details</Label>
              <Input
                type="textarea"
                name="text"
                id="details"
                placeholder="Tell us more about this site. What does someone need to stay here? What time do they need to arrive? What services are available?"
                className="mb-4"
              />
            </FormGroup>
            <FormGroup>
              <Button
                color="dark"
                style={{ marginTop: "2rem" }}
                block
                onClick={this.state.onSubmit}
              >
                Submit
              </Button>
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
