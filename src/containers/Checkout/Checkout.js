import React, { Component } from "react";

import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  };
  dangerButtonClicked = () => {
    this.props.history.goBack();
  };

  successButtonClicked = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] == "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          dangerButtonClicked={this.dangerButtonClicked}
          successButtonClicked={this.successButtonClicked}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => {
            return (
              <ContactData
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                {...props}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
