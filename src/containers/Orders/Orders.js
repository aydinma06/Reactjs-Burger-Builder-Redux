import React, { Component } from "react";
import Order from "./Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = null;
    if (this.state.loading) {
      orders = <Spinner />;
    } else {
      orders = this.state.orders.map(order => {
        return <Order key={order.id} order={order} />;
      });
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
