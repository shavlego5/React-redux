import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Quantity extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div
        style={
          this.props.cartLength ? { display: "flex" } : { display: "none" }
        }
        className="quantity"
      >
        <p>{this.props.cartLength}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartLength: state.cartLength,
  };
};

export default connect(mapStateToProps)(Quantity);
