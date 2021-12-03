import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Filter extends PureComponent {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  filterCategory = (event) => {
    this.props.fillter(event.target.innerHTML);
    let parent = event.target.parentNode.children;
    for (let i = 0; i < parent.length; i++) {
      parent[i].classList.remove("choosen");
    }
    event.target.classList.add("choosen");
  };

  render() {
    return (
      <div className="filter">
        <button
          className="choosen"
          type="button"
          onClick={(event) => this.filterCategory(event)}
        >
          all
        </button>
        {this.props.categories.map((name) => (
          <button
            type="button"
            key={name.name}
            onClick={(event) => this.filterCategory(event)}
          >
            {name.name}
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fillter: (name) => {
      dispatch({ type: "FILTER_CATEGORY", name: name });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
