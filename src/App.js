import { Component } from "react";
import Menu from "./components/Menu";
import ProductsList from "./components/ProductsList";
import Details from "./components/Details";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Overlay from "./components/Overlay";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Menu />
          <Switch>
            <Route exact path="/" component={ProductsList} />
            <Route path="/cart" component={Cart} />
            <Route path="/:product_id" component={Details} />
          </Switch>
          <Overlay />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
