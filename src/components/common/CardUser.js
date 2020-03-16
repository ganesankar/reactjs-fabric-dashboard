import React, { Fragment } from "react";

// Redux]

export default class CardUser extends React.Component {
  state = {
    modal: false,
    title: "",
    body: ""
  };

  render() {
    const { introContent, socialContent } = this.props;
    return (
      <Fragment>
        {introContent && (
          <div className="card-user card">
            <div className="card-body">
              <p className="card-text"></p>
              <div className="author">
                <div className="block block-one"></div>
                <div className="block block-two"></div>
                <div className="block block-three"></div>
                <div className="block block-four"></div>
                <a href="#pablo">
                  <img
                    alt="..."
                    className="avatar"
                    src="https://en.gravatar.com/userimage/4994122/50c326e83deff24090a2e8f5bb74d62f.jpg?size=200"
                  />
                  <h3 className="title"> {introContent.name}</h3>
                </a>
                <p className="description"> {introContent.title}</p>
              </div>
              <div
                className="card-description"
                dangerouslySetInnerHTML={{ __html: introContent.desc }}
              ></div>
            </div>
            <div className="card-footer">
              <div className="button-container">
                {socialContent &&
                  socialContent.values.length > 0 &&
                  socialContent.values.map((item, index) => {
                    return (
                      <a
                        rel="noopener noreferrer"
                        href={item.elink}
                        target="_blank"
                        className="btn-icon btn-round btn btn-facebook"
                      >
                        <i className={` fab  ${item.icon}`}></i>
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
