import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CheckOut from "./cart-components/CheckOut";
import Total from "./cart-components/Total";

class Cart extends PureComponent {
  constructor() {
    super();
    this.state = {
      length: [],
    };
  }

  chooseDetails = (event) => {
    let parentsChildren = event.target.parentNode.children;
    for (let i = 0; i < parentsChildren.length; i++) {
      parentsChildren[i].classList.remove("active");
    }
    event.target.classList.add("active");
  };

  increment = (event) => {
    let id = event.target.getAttribute("name");
    this.props.incrementQuantity(id);
  };

  decrement = (event) => {
    let id = event.target.getAttribute("name");
    this.props.decrementQuantity(id);
  };
  delete = (event) => {
    let id = event.target.getAttribute("name");
    this.props.deleteItem(id);
  };
  render() {
    return (
      <div className="cart">
        <h1 style={{ display: this.props.vissibleH }} className="cart-header">
          CART
        </h1>
        <h1 style={{ display: this.props.vissible }} className="bag">
          My Bag. <span>{this.props.cartLength} Items</span>
        </h1>
        {this.props.cart.map((item) => (
          <div className="cart-item-container">
            <div className="cart-item" id={item.id}>
              <h2>{item.brand}</h2>
              <p>{item.name}</p>
              {this.props.products.map((prod) =>
                prod.id === item.id ? (
                  <>
                    {prod.prices.map((price) =>
                      price.currency === this.props.currency ? (
                        <h3>
                          <span>
                            {(() => {
                              switch (price.currency) {
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
                          <span>{price.amount}</span>
                        </h3>
                      ) : (
                        <h3 style={{ display: "none" }}>NO PRICE FOR NOW...</h3>
                      )
                    )}
                    {prod.attributes.map((attr) => (
                      <>
                        {attr.name === "Color" || attr.name === "Size" ? (
                          <>
                            <div>
                              {attr.items.map((det) =>
                                attr.name === "Color" ? (
                                  <button
                                    onClick={this.chooseDetails}
                                    className={
                                      det.value === item[attr.name]
                                        ? "active"
                                        : ""
                                    }
                                    type="button"
                                  >
                                    <div
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        pointerEvents: "none",
                                        borderRadius: "50%",
                                        background: det.value,
                                      }}
                                    ></div>
                                  </button>
                                ) : (
                                  <button
                                    onClick={this.chooseDetails}
                                    className={
                                      det.value === item[attr.name]
                                        ? "active"
                                        : ""
                                    }
                                    type="button"
                                  >
                                    {det.value}
                                  </button>
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <p>{attr.name}</p>
                            <div>
                              {attr.items.map((det) =>
                                attr.name === "Color" ? (
                                  <button
                                    onClick={this.chooseDetails}
                                    type="button"
                                    style={{ background: det.value }}
                                    className={
                                      "colored " + det.value === item[attr.name]
                                        ? "activeColor"
                                        : ""
                                    }
                                  ></button>
                                ) : (
                                  <button
                                    onClick={this.chooseDetails}
                                    className={
                                      det.value === item[attr.name]
                                        ? "active"
                                        : ""
                                    }
                                    type="button"
                                  >
                                    {det.value}
                                  </button>
                                )
                              )}
                            </div>
                          </>
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <p style={{ display: "none" }}></p>
                )
              )}
            </div>
            <div className="cart-gallery">
              <div name={item.id} className="delete" onClick={this.delete}>
                +
              </div>
              <div className="counter">
                <button type="button" name={item.id} onClick={this.increment}>
                  +
                </button>
                <p>{this.props.quantities[item.id]}</p>
                <button
                  disabled={this.props.quantities[item.id] === 1 ? true : false}
                  type="button"
                  name={item.id}
                  onClick={this.decrement}
                >
                  -
                </button>
              </div>
              <div className="gallery" id={item.id}>
                {item.gallery.map((gall) => (
                  <img src={gall} alt="image" />
                ))}
              </div>
            </div>
          </div>
        ))}
        <Total />
        <CheckOut />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
    products: state.products,
    quantities: state.quantities,
    index: state.index,
    total: state.total,
    cartLength: state.cartLength,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQuantity: (item) => {
      dispatch({ type: "INCREMENT", item: item });
    },
    decrementQuantity: (item) => {
      dispatch({ type: "DECREMENT", item: item });
    },
    deleteItem: (id) => {
      dispatch({ type: "DELETE", id: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
