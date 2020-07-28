import React from "react";
import "./styles.css";

// setState of other components
function dprState(dprValue) {
  this.setState({ dprValue });
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dpr: "auto",
      url: "https://ontologic.imgix.net/nz2.jpg"
    };

    dprState = dprState.bind(this);
  }

  imgState = url => {
    this.setState({ url });
  };

  render() {
    return (
      <div id="app">
        <UrlInput
          dprState={dprState}
          className="input large-12 small-12 medium-12"
          option="all"
          imgState={this.imgState}
        />
        <Row
          title="Quality comparison"
          description="Compare images of a different quality."
          parameters={[`q=1`, `q=25`, `q=50`, `q=100`]}
          // input settings
          compress={true}
          autoFormat={true}
          dpr={this.state.dpr}
          // default props
          url={this.state.url}
        />
        <Row
          title="DPR comparison"
          description="Compare images by DPR (Device-Pixel-Resolution)"
          parameters={[`dpr=1`, `dpr=2`, `dpr=3`, `dpr=4`]}
          // input settings
          compress={true}
          autoFormat={true}
          // default props
          url={this.state.url}
        />
        <Row
          title="Variable quality to resolution"
          description="You can compare this to other resolutions"
          parameters={[`q=1&dpr=4`, `q=25&dpr=3`, `q=50&dpr=2`, `q=100&dpr=1`]}
          // input settings
          compress={true}
          autoFormat={true}
          // default props
          url={this.state.url}
        />
      </div>
    );
  }
}

class UrlInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        url: "https://ontologic.imgix.net/nz2.jpg"
      }
    };
  }

  _handleSubmit = event => {
    event.preventDefault();
    this.props.imgState(this.state.formState.url);
  };
  render() {
    return (
      <div className="page-width landing__form__container">
        <div className="page-width-inner grid-x">
          <form
            id="urlForm"
            className="landing__form large-12 medium-12 small-12 grid-x"
            onSubmit={e => {
              this._handleSubmit(e);
              e.preventDefault();
            }}
          >
            <input
              type="text"
              className="landing__form__group__input input--landing large-10 medium-10 small-8"
              placeholder={this.state.formState.url}
              onChange={e => {
                let url = e.target.value;

                if (url.includes("?")) {
                  url = url.split("?")[0];
                } else if (url.includes("#")) {
                  url = url.split("#")[0];
                }
                this.setState({ formState: { url } });
              }}
            />
            <div className="landing__form__group large-2 medium-2 small-4">
              <button
                type="submit"
                className="button button--inline button--landing large-2 medium-2 small-4"
                value="Submit"
                form="urlForm"
              >
                Show Me!
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerOptionsState: {
        compress: true,
        dpr: "auto",
        showBy: "dpr",
        autoFormat: true
      },
      compress: true,
      autoFormat: true
    };
  }

  _handleOptionsSubmit = e => {
    event.preventDefault();
    this.props._optionsState(this.state.innerOptionsState);
  };
  _handleOptionsChange = target => {
    let fieldname = target.getAttribute("fieldname");
    let dummyState = { ...this.state.innerOptionsState };
    if (target.type === "checkbox") {
      dummyState[fieldname] = this.state.innerOptionsState[fieldname];
    } else {
      dummyState[fieldname] = target.value;
    }
    this.setState({ innerOptionsState: dummyState });
  };
  // most input choices are binded to the Column class
  _dprOption = () => {
    if (this.props.dpr) {
      return (
        <div className="grid-x option_row">
          <label for="dpr_display" className="large-4 medium-4 small-4">
            DPR control
          </label>

          <div className="large-4 medium-4 small-4" />

          <select
            className="large-4 medium-4 small-4"
            fieldname="dpr"
            onChange={e => {
              let target = e.target;
              this._handleOptionsChange(target);
            }}
          >
            <option value="auto">Auto</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
          </select>
        </div>
      );
    }
  };

  _compressOption = () => {
    if (this.props.compress) {
      return (
        <div className="grid-x option_row">
          <label for="compress" className="large-4 medium-4 small-4">
            Compress image
          </label>
          <div className="large-4 medium-4 small-4" />
          <div className="large-4 medium-4 small-4 checkbox">
            <input
              type="checkbox"
              fieldname="compress"
              checked={this.state.innerOptionsState.compress}
              onChange={e => {
                let target = e.target;
                let dummyState = { ...this.state.innerOptionsState };

                dummyState.compress = !this.state.innerOptionsState.compress;
                this.setState({ innerOptionsState: dummyState }, () => {
                  this._handleOptionsChange(target);
                });
              }}
            />
          </div>
        </div>
      );
    }
  };

  _formatOption = () => {
    if (this.props.autoFormat) {
      return (
        <div className="grid-x option_row">
          <label for="autoFormat" className="large-4 medium-4 small-4">
            Apply auto format
          </label>
          <div className="large-4 medium-4 small-4" />
          <div className="large-4 medium-4 small-4 checkbox">
            <input
              type="checkbox"
              fieldname="autoFormat"
              checked={this.state.innerOptionsState.autoFormat}
              onChange={e => {
                let target = e.target;
                let dummyState = { ...this.state.innerOptionsState };

                dummyState.autoFormat = !this.state.innerOptionsState
                  .autoFormat;

                this.setState({ innerOptionsState: dummyState }, () => {
                  this._handleOptionsChange(target);
                });
              }}
            />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="optionsContainer large-12 medium-12 small-12">
        <div className="grid-x">
          <h2 class="options_header large-12 medium-12 small-12">
            Preview Options
          </h2>
          <form
            className="options_form large-12 medium-12 small-12 cell grid-x"
            onSubmit={e => {
              this._handleOptionsSubmit(e);
              e.preventDefault();
            }}
          >
            {this._dprOption()}
            {this._compressOption()}
            {this._formatOption()}
            <div className="large-7 medium-6 small-7 cell spacer" />
            <button
              type="submit"
              className="large-5 medium-6 small-5 cell"
              value="Submit"
            >
              Reload Images
            </button>
          </form>
        </div>
      </div>
    );
  }
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsState: {
        compress: true,
        dpr: "auto",
        showBy: "dpr",
        autoFormat: true
      }
    };
  }

  _optionsState = optionsState => {
    this.setState({
      optionsState: {
        compress: optionsState.compress,
        dpr: optionsState.dpr,
        showBy: optionsState.showBy,
        autoFormat: optionsState.autoFormat
      }
    });
  };

  _renderColumns = () => {
    if (this.props.parameters) {
      return this.props.parameters.map(quality => {
        let auto = "";
        let dpr = "";

        if (this.state.optionsState.compress === true) {
          auto = "&auto=compress";
        }

        if (this.state.optionsState.dpr) {
          if (!quality.includes("dpr")) {
            if (this.state.optionsState.dpr === "auto") {
              let selectedDpr = Math.round(window.devicePixelRatio);
              dpr += `&dpr=${selectedDpr}`;
            } else {
              dpr += `&dpr=${this.state.optionsState.dpr}`;
            }
          }
        }

        if (this.state.optionsState.autoFormat === true) {
          if (auto.includes("auto")) {
            auto += ",format";
          } else {
            auto = "&auto=format";
          }
        }

        let finalParams = quality + dpr + auto + "&w=285";

        return (
          <div className="large-3 medium-3 small-2 cell">
            <Column
              url={`${this.props.url}?${finalParams}`}
              parameters={finalParams}
            />
          </div>
        );
      });
    }
  };

  render() {
    return (
      <section className="row page-width">
        <div className="page-width-inner grid-x grid-margin-x">
          <div className="large-12 medium-12 small-12 cell">
            <div className="section_divider" />
          </div>
          <h1 className="large-6 medium-6 small-12 cell section_title">
            {this.props.title}
          </h1>
          <div className="large-6 medium-6 small-12 cell">
            <p>{this.props.description || "Row description"}</p>
            <Input
              compress={this.props.compress}
              dpr={this.props.dpr}
              _optionsState={this._optionsState}
              autoFormat={this.props.autoFormat}
            />
          </div>
        </div>
        <div className="row grid-x grid-margin-x page-width-inner">
          {this._renderColumns()}
        </div>
      </section>
    );
  }
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "0kb"
    };
  }
  // get image sizes
  imgSize = url => {
    var size = -1;
    const mbSize = 1000000;
    const kbSize = 1000;
    const sizeUrl =
      "https://imgix-sandbox-server.herokuapp.com/size?url64=" +
      window.btoa(url);

    fetch(sizeUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        var use_kb = data["size"] / mbSize < 1 ? true : false;

        if (use_kb) {
          size = data["size"] / kbSize + " kB";
        } else {
          size = data["size"] / mbSize + " mB";
        }
        this.setState({ size: size });
      });
  };

  render() {
    return (
      <div className="large-3 medium-3 small-2 cell column">
        <img alt={this.props.parameters || ""} src={this.props.url} />
        <MetaData
          parameters={this.props.parameters || ""}
          url={this.props.url}
          size={this.state.size}
          // functions
          imgSize={this.imgSize}
          imgState={this.props.imgState}
        />
      </div>
    );
  }
}

// build the MetaData
class MetaData extends React.PureComponent {
  render() {
    return (
      <div className="center subtext metadata">
        <p>
          <span className="bold">url: </span>
          <a href={this.props.url}>{this.props.url}</a>
        </p>
        <p>
          <span className="bold">size: </span>
          {this.props.size}
        </p>
        <p className="wrap">
          <span className="bold">parameters: </span>
          <code className="parameters inline">{this.props.parameters}</code>
        </p>

        <br />
        {/* image weight: <span className="img-weight">{this.state.imgWeight}</span> */}
        {this.props.imgSize(this.props.url)}
      </div>
    );
  }
}
