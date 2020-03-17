import React, { Component, Fragment } from "react";
import { Jumbotron, Container, Button } from "reactstrap";

// Components

// Redux
import { connect } from "react-redux";

class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Jumbotron fluid>
          <Container fluid>
            <div className="row">
              {" "}
              <div className="col">
                {" "}
                <h1 className=""> DASHBOARD</h1>
              </div>
              <div className="col">
                {" "}
                <Button color="primary">primary</Button>{" "}
                <Button color="secondary">secondary</Button>{" "}
                <Button color="success">success</Button>{" "}
                <Button color="info">info</Button>{" "}
              </div>
            </div>
          </Container>
        </Jumbotron>
        <Container className="py-4">
          <h2 className="text-primary">Posts - </h2>
          dfdf
        </Container>
      </Fragment>
    );
  }
}

export default connect()(Home);
