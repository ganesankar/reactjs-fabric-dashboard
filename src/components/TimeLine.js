import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";
import moment from "moment";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
// Components

// Redux
import { connect } from "react-redux";
import { getPosts, deleteItem } from "../actions/post";
export function getDate(tdate) {
  const pD =
    tdate === "c" || tdate === "p"
      ? moment(new Date()).format("DD/MM/YYYY")
      : tdate;
  const p = moment(pD, ["DD/MM/YYYY"]).format("YYYY-MM-DD");

  return p;
}
export function getUTCDate(tdate) {
  const pD =
    tdate === "c" || tdate === "p" ? moment().format("DD/MM/YYYY") : tdate;
  const p = moment(pD, ["DD/MM/YYYY"]).format("x");
  return Number(p);
}
class TimeLine extends Component {
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
    let allData = [];
    let allDataSorted = [];
    const notimeline = [
      "intro",
      "contacts",
      "social",
      "expertise",
      "profile",
      "otherprojects"
    ];
    if (this.props.post.length > 0) {
      this.props.post.forEach(function(item, index) {
        content.push(item.data);
        if (!notimeline.includes(item.data.type)) {
          if (item.data.values && item.data.values.length > 0) {
            item.data.values.forEach(function(itemx, indexx) {
              const newI = {
                start: getDate(itemx.startdate),
                id: getUTCDate(itemx.startdate),
                end: getDate(itemx.enddate || "c"), // end is optional
                content: itemx.name || itemx.title,
                ctype: item.type,
                className: item.data.type
              };
              allData.push(newI);
            });
          }
        }
      });
      contentdata = content.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );
      allDataSorted = allData.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );
    }

    console.log(allDataSorted);

    const allPosts =
      allDataSorted.length === 0 ? (
        <div>Loading...</div>
      ) : (
        allDataSorted.map(item => {
          return (
            <Fragment key={item.id}>
              <VerticalTimelineElement
                className={`vertical-timeline-element--${item.className}`}
                date={`${item.start} - ${item.end}`}
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={""}
              >
                <h3 className="vertical-timeline-element-title">
                  {item.content}
                </h3>
                <h4 className="vertical-timeline-element-subtitle"></h4>
                <p></p>
              </VerticalTimelineElement>
            </Fragment>
          );
        })
      );
    return (
      <Fragment>
        <Container className="py-4">
          <VerticalTimeline>{allPosts}</VerticalTimeline>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getPosts, deleteItem })(TimeLine);
