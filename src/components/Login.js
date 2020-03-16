import React, { Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { login } from "../actions/auth";

class Login extends React.Component {
  state = {
    modal: false,
    email: "",
    password: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handlesChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handlesSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
    this.toggle();
  };

  render() {
    return (
      <Fragment>
        <Button color="dark my-2 mr-2" onClick={this.toggle}>
          Login
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form className="form" method="POST" onSubmit={this.handlesSubmit}>
              <div className="form-group">
                <label> Email </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Type your email"
                  onChange={this.handlesChange}
                ></input>
              </div>
              <div className="form-group">
                <label> Password </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={this.handlesChange}
                ></input>
              </div>
              <button className="btn btn-primary">Login User </button>
            </form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { login })(Login);
