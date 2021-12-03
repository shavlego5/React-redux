import React, { PureComponent } from "react";
import { connect } from "react-redux";
import arrow from "../../images/Vector.png";

class Currency extends PureComponent {
  constructor() {
    super();
    this.state = {
      vissible: "",
      rotate: 0,
    };
  }

  changeCurrency = (event) => {
    this.props.changeCurr(event.target.children[1].textContent);
  };

  toggleCurrency = () => {
    this.state.vissible === ""
      ? this.setState({ vissible: "show" })
      : this.setState({ vissible: "" });
    this.state.rotate === 0
      ? this.setState({ rotate: 180 })
      : this.setState({ rotate: 0 });
  };

  render() {
    return (
      <div className="currency">
        <div className="currency-menu" onClick={this.toggleCurrency}>
          {(() => {
            switch (this.props.currency) {
              case "USD":
                return "$";
              case "GBP":
                return "£";
              case "AUD":
                return "A$";
              case "JPY":
                return "¥";
              case "RUB":
                return "₽";
            }
          })()}
          <img
            src={arrow}
            alt="arrow0"
            style={{ transform: `rotate(${this.state.rotate}deg)` }}
          />
        </div>
        <div
          className={"currency-container " + this.state.vissible}
          onClick={this.toggleCurrency}
        >
          {this.props.currencies.map((curr) => (
            <div
              key={curr}
              className="currency-list"
              onClick={(event) => this.changeCurrency(event)}
            >
              <span>
                {(() => {
                  switch (curr) {
                    case "USD":
                      return "$";
                    case "GBP":
                      return "£";
                    case "AUD":
                      return "A$";
                    case "JPY":
                      return "¥";
                    case "RUB":
                      return "₽";
                  }
                })()}
              </span>
              <span>{curr}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    currency: state.currency,
    currencies: state.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurr: (currency) => {
      dispatch({ type: "CHANGE_CURRENCY", currency });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
