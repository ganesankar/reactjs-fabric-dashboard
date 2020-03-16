import React, { Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { addPost } from "../actions/post";

class AddPost extends React.Component {
  state = {
    modal: false,
    title: "",
    body: ""
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
        <Button color="primary my-2" onClick={this.toggle}>
          Add New Post
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form className="form" method="POST" onSubmit={this.handlesSubmit}>
              <div className="form-group">
                <label> Title </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter your post title"
                  onChange={this.handlesChange}
                ></input>
              </div>
              <div className="form-group">
                <label> Body </label>
                <input
                  type="text"
                  id="body"
                  className="form-control"
                  placeholder="Enter your Post body"
                  onChange={this.handlesChange}
                ></input>
              </div>
              <button className="btn btn-primary">Add Posts</button>
            </form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { addPost })(AddPost);
