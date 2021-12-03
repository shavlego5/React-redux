import React, { PureComponent } from "react";
import ddd from "../../images/cart.png";
import Quantity from "./Quantity";
import Cart from "../Cart";
import { connect } from "react-redux";

class MenuCart extends PureComponent {
  constructor() {
    super();
    this.state = {
      overlay: "",
    };
  }

  openOverlay = () => {
    this.state.overlay === ""
      ? this.setState({ overlay: "overlay" })
      : this.setState({ overlay: "" });
    this.props.overlay0(this.state.overlay === "" ? "overlay0" : "");
  };

  render() {
    return (
      <div className="menu-cart">
        <img src={ddd} alt="cart" onClick={this.openOverlay} />
        <Quantity />
        <div
          className={"cart-overlay " + this.state.overlay}
          onMouseLeave={this.openOverlay}
        >
          <Cart vissibleH="none" vissible="initial" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    overlay: state.overlay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    overlay0: (over) => {
      dispatch({ type: "OVERLAY", over: over });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCart);
