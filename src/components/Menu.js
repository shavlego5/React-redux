import React, { PureComponent } from "react";
import Filter from "./menu-components/Filter";
import Currency from "./menu-components/Currency";
import { Link } from "react-router-dom";
import MenuCart from "./menu-components/MenuCart";

class Menu extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <Link to="/">
          <Filter />
        </Link>
        <div className="currency-quantity">
          <Currency />
          <MenuCart />
        </div>
      </div>
    );
  }
}

export default Menu;
