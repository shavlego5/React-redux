import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Overlay extends PureComponent {
  render() {
    return <div className={this.props.overlay}></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    overlay: state.overlay,
  };
};

export default connect(mapStateToProps)(Overlay);
