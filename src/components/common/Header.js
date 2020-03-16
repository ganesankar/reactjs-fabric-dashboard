import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  NavbarBrand,
  Navbar,
  Nav,
  Container
} from "reactstrap";
// Redux
import { connect } from "react-redux";

class Header extends React.Component {
  state = {};

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

    const post = {
      title: this.state.title,
      body: this.state.body
    };

    this.props.addPost(post);
    this.toggle();
  };

  render() {
    return (
      <Fragment>
        <span className="sticky blue" onClick={this.toggle}>
          {""}
        </span>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody></ModalBody>
        </Modal>

        <Navbar className={`navbar-fixed ${this.state.color}`} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={`navbar-toggle d-inline ${
                  this.props.sidebarOpened ? "toggled" : ""
                }`}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="/" onClick={e => e.preventDefault()}>
                probe CV
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none"> MENU</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    {this.props.menu &&
                      this.props.menu.map(route => (
                        <NavLink to={route.path}>
                          <DropdownItem className="nav-item">
                            {route.title}
                          </DropdownItem>
                        </NavLink>
                      ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

export default connect(null)(Header);
