import { act } from "react-dom/test-utils";

const initState = {
  store: [],
  categories: [],
  category: [],
  currencies: [],
  filterCategory: "all",
  currency: "USD",
  products: [],
  cart: [],
  cartLength: 0,
  quantities: {},
  index: 0,
  total: [0],
  overlay: ""
};

const query = `
      query {
        category {
            name
            products {
                id
              category
              brand
              prices {
                currency
                amount
              }
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              description
              gallery
              inStock
              name
              id
            }
          }
          currencies
          categories {
            name
            products {
              id
              name
              inStock
              gallery
              description
              category
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                currency
                amount
              }
              brand
            }
          }
      }
    `;

fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query,
  }),
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    initState.categories = data.data.categories;
    initState.category = data.data.category;
    initState.currencies = data.data.currencies;
    initState.products = data.data.category.products;
  });

const rootReducer = (state = initState, action) => {
  const calculateTotal = () => {
    let sum = 0;
    state.cart.forEach((item) =>
      item.price.forEach((cur) =>
        cur.currency === state.currency
          ? (sum = cur.amount * state.quantities[item.id] + sum)
          : 0
      )
    );
    state = {
      ...state,
      total: sum,
    };
  };
  if (action.type === "FILTER_CATEGORY") {
    // initState.filterCategory =  action.name;
    state = {
      ...state,
      filterCategory: action.name,
    };
  }
  if (action.type === "CHANGE_CURRENCY") {
    state = {
      ...state,
      currency: action.currency,
    };
    calculateTotal();
  }
  if (action.type === "ADD_TO_CART") {
    if (state.cart.filter((e) => e.id === action.item.id).length < 1) {
      state = {
        ...state,
        cart: [...state.cart, action.item],
        quantities: { ...state.quantities, [action.item.id]: 1 },
      };
    }
    state = {
      ...state,
      cartLength: state.cart.length,
    };
    calculateTotal();
  }
  if (action.type === "INCREMENT") {
    state = {
      ...state,
      quantities: {
        ...state.quantities,
        [action.item]: Number([state.quantities[action.item]]) + 1,
      },
    };
    calculateTotal();
  }
  if (action.type === "DECREMENT") {
    state = {
      ...state,
      quantities: {
        ...state.quantities,
        [action.item]: Number([state.quantities[action.item]]) - 1,
      },
    };
    calculateTotal();
  }
  if (action.type === "DELETE") {
    let newCart = state.cart.filter((cart) => {
      return action.id !== cart.id;
    });
    state = {
      ...state,
      cart: newCart,
    };

    state = {
      ...state,
      cartLength: state.cart.length,
    };
    calculateTotal();
  }
  if (action.type === "OVERLAY") {
    state = {
      ...state,
      overlay: action.over,
    };
    calculateTotal();
  }
  return state;
};

export default rootReducer;
