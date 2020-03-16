import React, { Fragment } from "react";

// Redux]

export default class CardList1 extends React.Component {
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
          <div className="card-chart card">
            <div className="card-header">
              <h5 className="card-category"> {data.desc}</h5>
              <h3 className="card-title">{data.title || data.name}</h3>
            </div>
            <div className="card-body">
              <ol className="list-unstyled">
                {data &&
                  data.values.length > 0 &&
                  data.values.map((item, index) => {
                    return (
                      <li className="pb-1 pl-1 pr-1">
                        <h5 className="mt-0 mb-1">
                          <a
                            rel="noopener noreferrer"
                            href={item.link || item.portfolio}
                            target="_blank"
                            className="elp"
                          >
                            {item.name}
                          </a>
                        </h5>
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
