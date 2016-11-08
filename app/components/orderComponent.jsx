'use strict'

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

export default class OrderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            total: 0
        }
    }
    
    componentDidMount() {
        // Temporary axios call
        axios.get(`/api/orders/${this.props.props.params.order_id}`)
            .then(res => {
                this.setState({ order: res.data });
                this.forceUpdate();
            })
            .catch(err => console.log('Error receiving order', err));
    }

    render() {
        const order = this.state.order;
        return (
            <div className="order-container">
                {order && order.user ? <h1>Order Made By: {order.user.name}</h1> : ''}
                <h1>Order Status: {order.status}</h1>
                <h1>Order Address: {order.address}</h1>
                {
                    order.products && order.products.map((product, index) => {
                        const order_product = product.order_product;
                        this.state.total += Number(order_product.subTotal);
                        return (
                            <div className={`order-product-${index}`} key={index}>
                                <Link to={`/products/${product.id}`}>
                                    <p>{product.title}</p>
                                </Link>
                                <p>Quantity: {order_product.quantity}</p>
                                <p>Subtotal: ${order_product.subTotal}</p>
                            </div>
                        );
                    })
                }
                <h1>Grand Total: ${this.state.total}</h1>
            </div>
        );
    }
}