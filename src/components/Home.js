import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";

// Components

// Redux
import { connect } from "react-redux";

class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    
  }

  render() {
   
   

    return (
      <Fragment>
        <Container className="py-4">
          <h2 className="text-primary">Posts -  </h2>
         dfdf
        </Container>
      </Fragment>
    );
  }
}



export default connect()(Home);
