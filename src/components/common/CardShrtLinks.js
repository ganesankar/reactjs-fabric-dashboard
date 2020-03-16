import React, { Fragment } from "react";

// Redux]

export default class CardShrtLinks extends React.Component {
  state = {
    modal: false,
    title: "",
    body: ""
  };

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        {data && (
          <div className="card-stats card">
            <div className="card-body">
              <div className="row">
                <div className="col-5">
                  <div className="info-icon text-center icon-warning">
                    <i className={` fas fa-user pt-2 fa-2x text-white`}></i>
                  </div>
                </div>
                <div className="col-7">
                  <div className="numbers">
                    <h5 className="card-category"> {data.desc}</h5>
                    <h3 className="card-title">{data.title || data.name}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <hr />

              <div className="row ml-0 mr-0">
                {data.values &&
                  data.values.length > 0 &&
                  data.values.map((item, index) => {
                    return (
                      <a
                        rel="noopener noreferrer"
                        href={item.link}
                        target="_blank"
                        className="ml-auto mr-auto col-3 text-center"
                      >
                        {" "}
                        <span className="card-stats justify-content-center ">
                          <i className={` fab  ${item.icon}`}></i>
                        </span>
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
