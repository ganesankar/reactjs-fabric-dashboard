import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";

// Components
import HighPieChart from "./charts/HighPieChart";
import HighBarChart from "./charts/HighBarChart";
import HighXrangeChart from "./charts/HighXrangeChart";
import CardUser from "./common/CardUser";
import CardShrtLinks from "./common/CardShrtLinks";

import CardList1 from "./common/CardList1";

// Redux
import { connect } from "react-redux";
import { getPosts, deleteItem } from "../actions/post";

let drawCharts = false;
class Highchart extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    console.log(this.props);
    const content = [];
    let contentdata = [];
    if (this.props.post.length > 0) {
      this.props.post.forEach(function(item, index) {
        content.push(item.data);
      });
      contentdata = content.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );
    }
    console.log(contentdata);

    const introContent = contentdata.find(o => o.type === "intro");
    const socialContent = contentdata.find(o => o.type === "social");
    const otherProj = contentdata.find(o => o.type === "otherprojects");
    const expertiseRaw = contentdata.find(o => o.type === "expertise");
    const skillsData = contentdata.find(o => o.type === "skills");
    const profile = contentdata.find(o => o.type === "profile");
    const contact = contentdata.find(o => o.type === "contacts");
    const experienceData = contentdata.find(o => o.type === "experience");
    const awards = contentdata.find(o => o.type === "awards");
    const projects = contentdata.find(o => o.type === "projects");
    const education = contentdata.find(o => o.type === "education");
    drawCharts = true;

    return (
      <Fragment>
        {drawCharts && (
          <div className=" container-xl">
            <div className="row">
              <div className="col-12 col-lg-4 py-5">
                <h4>Ganesan Karuppaiya</h4>
                <p className="text-gray">Curriculum vitae Dashboard</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <CardUser
                  introContent={introContent}
                  socialContent={socialContent}
                />
              </div>
              <div className="col-12 col-lg-8">
                <div className="row">
                  <div className="col-12 col-sm-6 ">
                    <CardShrtLinks data={profile} />
                  </div>
                  <div className="col-12 col-sm-6 ">
                    <CardShrtLinks data={contact} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 ">
                    <HighPieChart data={expertiseRaw} />
                  </div>
                  <div className="col-12 col-sm-6 ">
                    <HighBarChart data={skillsData} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-12 col-lg-4">
                {" "}
                <HighXrangeChart data={experienceData} />
              </div>{" "}
              <div className="col-12 col-sm-6 col-lg-4">
                <HighXrangeChart data={education} />
              </div>{" "}
              <div className="col-12 col-sm-6 col-lg-4">
                <HighXrangeChart data={awards} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 ">
                {" "}
                <HighXrangeChart data={projects} />
              </div>{" "}
              <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <CardList1 data={otherProj} />
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getPosts, deleteItem })(Highchart);
