import React, { PureComponent } from "react";
import { connect } from "react-redux";
import cart from "../images/shopping-cart.png";
import { Link } from "react-router-dom";

class Product extends PureComponent {
  constructor() {
    super();
    this.state = {
      filterCategory: "",
      cartObject: {},
    };
  }

  addToCart = (event) => {
    let item = this.props.products.filter((prod) => {
      return event.target.getAttribute("id") === prod.id;
    });

    setTimeout(() => {
      this.setState({
        cartObject: {
          ...this.state.cartObject,
          id: item[0].id,
          name: item[0].name,
          brand: item[0].brand,
          price: item[0].prices,
          gallery: item[0].gallery,
        },
      });
      this.props.addCart(this.state.cartObject);
    }, 100);
  };

  render() {
    return (
      <div className="products-container">
        {this.props.category.map((product) => (
          <div
            className={`products ${(() => {
              if (this.props.filterCategory === "all") {
                return "";
              } else {
                return product.category === this.props.filterCategory
                  ? ""
                  : "none";
              }
            })()}`}
            key={product.id}
            style={product.inStock ? { opacity: 1 } : { opacity: 0.5 }}
          >
            <div className="images">
              {product.gallery.map((image) => (
                <img src={image} key={image} alt="images" />
              ))}
              <p
                style={
                  product.inStock ? { display: "none" } : { display: "inherit" }
                }
              >
                OUT OF STOCK
              </p>
            </div>
            <Link to={"/" + product.id}>
              <p>{product.name}</p>
            </Link>
            {product.prices.map((price) =>
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
            <div
              id={product.id}
              onClick={this.addToCart}
              className="cart-button"
              style={
                product.inStock ? { display: "inherit" } : { display: "none" }
              }
            >
              <img src={cart} style={{ pointerEvents: "none" }} alt="cart" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category.products,
    currency: state.currency,
    filterCategory: state.filterCategory,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item) => {
      dispatch({ type: "ADD_TO_CART", item: item });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
