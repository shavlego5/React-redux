import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Details extends PureComponent {
  constructor() {
    super();
    this.state = {
      mainImageSrc: "",
      cart: [],
      details: [],
      cartObject: {},
    };

    // this.changeMainImage = this.changeMainImage.bind(this)
  }

  componentDidMount() {
    let img = document.querySelector(".image-options div").children[0];
    let imgSrc = img.getAttribute("src");
    this.setState({ mainImageSrc: imgSrc });

    setTimeout(() => {
      let buttons = document.getElementsByClassName("description-buttons");
      console.log(buttons);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].children[0].click();
      }
    }, 10);
  }

  changeMainImage(event) {
    let src = event.target.getAttribute("src");
    this.setState({ mainImageSrc: src });
  }

  addToCart = () => {
    this.props.addCart(this.state.cartObject);
  };

  chooseDetails = (event) => {
    this.setState({
      cartObject: {
        ...this.state.cartObject,
        id: this.props.products.id,
        name: this.props.products.name,
        brand: this.props.products.brand,
        price: this.props.products.prices,
        gallery: this.props.products.gallery,
        [event.target.getAttribute("detailsName")]:
          event.target.getAttribute("detailsValue"),
      },
    });
    let parentsChildren = event.target.parentNode.children;
    for (let i = 0; i < parentsChildren.length; i++) {
      parentsChildren[i].classList.remove("active");
    }
    event.target.classList.add("active");
    setTimeout(() => {
      console.log(this.state.cartObject);
    }, 10);
  };

  render() {
    return (
      <>
        {this.props.products ? (
          <div className="product-details" id={this.props.products.id}>
            <div className="product-carousel">
              <div className="image-options">
                {this.props.products.gallery.map((img) => (
                  <div key={img.id}>
                    <img
                      src={img}
                      onClick={this.changeMainImage.bind(this)}
                      alt="image not found"
                    />
                  </div>
                ))}
              </div>
              <div className="main-image">
                <img src={this.state.mainImageSrc} alt="image not found" />
              </div>
            </div>
            <div className="details-description">
              <h1>{this.props.products.brand}</h1>
              <h2>{this.props.products.name}</h2>

              {this.props.products.attributes.map((attribute) => (
                <div className="description-name">
                  <h1>{attribute.name}:</h1>
                  <div className="description-buttons">
                    {attribute.items.map((values) =>
                      attribute.name === "Color" ? (
                        <button
                          onClick={this.chooseDetails}
                          detailsName={attribute.name}
                          detailsValue={values.value}
                          type="button"
                          value={values.value}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              pointerEvents: "none",
                              borderRadius: "50%",
                              background: values.value,
                            }}
                          ></div>
                        </button>
                      ) : (
                        <button
                          onClick={this.chooseDetails}
                          detailsName={attribute.name}
                          detailsValue={values.value}
                          type="button"
                          value={values.value}
                        >
                          {values.value}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
              <h1>PRICE:</h1>
              {this.props.products.prices.map((price) =>
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
                  <h3 style={{ display: "none" }}>NO PR0ICE FOR NOW...</h3>
                )
              )}
              <button
                type="button"
                value="add to cart"
                onClick={this.addToCart}
                disabled={this.props.products.inStock ? false : true}
                className="add-to-cart"
              >
                ADD TO CART
              </button>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: this.props.products.description,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <p>Product NOT FOUND :(</p>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.product_id;
  //console.log(this.props.product)
  return {
    ...state,
    products: state.products.find((product) => product.id === id),
    product: state.product,
    currency: state.currency,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item) => {
      dispatch({ type: "ADD_TO_CART", item: item });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
