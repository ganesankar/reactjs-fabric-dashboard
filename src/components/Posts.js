import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";

// Components
import AddPost from "./AddPost";
import Login from "./Login";

// Redux
import { connect } from "react-redux";
import { getPosts, deleteItem } from "../actions/post";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    console.log(this.props);
    const content= [];
    let contentdata= [];
    if(this.props.post.length > 0){
      this.props.post.forEach(function(item, index) {
        content.push(item.data);
      });
      contentdata = content.sort((a, b) =>
      a.id > b.id ? 1 : b.id > a.id ? -1 : 0
    );
    }
    console.log(contentdata);
   

    const allPosts =
    contentdata.length === 0 ? (
        <div>Loading...</div>
      ) : (
        contentdata.map(item => {
          return (
            <div className="card my-1" key={item.id}>
              <div className="card-body">
                <h2 className="card-title">{item.title|| item.name}</h2>
                <p className="card-text">{item.body}</p>
                {this.props.auth === false ? (
                  <p> N</p>
                ) : (
                  <p> Nd</p>
                )}
              </div>
            </div>
          );
        })
      );
    return (
      <Fragment>
        <Container className="py-4">
          <h2 className="text-primary">Posts - {this.props.post.length} </h2>
          {allPosts}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getPosts, deleteItem })(Posts);
