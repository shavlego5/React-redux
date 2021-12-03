import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CheckOut extends PureComponent {
  render() {
    return (
      <div className="check-out">
        <Link to="/cart">
          <button style={{ display: this.props.vissible }} type="button">
            VIEW BAG
          </button>
        </Link>
        <button disabled={this.props.cartLength ? false : true} type="button">
          CHECK OUT
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartLength: state.cartLength,
  };
};

export default connect(mapStateToProps)(CheckOut);
