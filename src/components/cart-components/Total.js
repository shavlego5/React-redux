import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Total extends PureComponent {
  render() {
    return (
      <div className="total">
        <h1>Total</h1>
        <h3>
          <span>
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
          </span>
          <span>{Math.floor(this.props.total * 100) / 100}</span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    total: state.total,
  };
};

export default connect(mapStateToProps)(Total);
