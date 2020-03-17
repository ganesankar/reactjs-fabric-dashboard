import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "react-sidebar";
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
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
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
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }
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

        <Navbar
          className={`navbar navbar-dark fixed-top bg-dark  ${this.state.color}`}
          expand="lg"
        >
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
              <button onClick={() => this.onSetSidebarOpen(true)}>
                Open sidebar
              </button>
              <NavbarBrand href="/" onClick={e => e.preventDefault()}>
                DASHBOARD
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
                    {" "}
                    MENU
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
        <Sidebar
          sidebar={
            <div className="sidebar-sticky">
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a
                  className="d-flex align-items-center text-muted"
                  href="/"
                  aria-label="Add a new report"
                ></a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", zIndex: 2000 } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
        </Sidebar>
      </Fragment>
    );
  }
}

export default connect(null)(Header);
