import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import URLs from "../../../URLs";

class CartProductPrice extends Component {

    state = {
        price: 0, loading: true, number: 1
    }
    componentDidMount() {
        axios.post(URLs.base_URL+URLs.product_get_price, {keyword: this.props.keyword})
            .then(response => {
                console.log("CartProductPrice price");
                this.setState({price: response.data.unit_price, loading: false});
                this.props.addProductPrice(this.props.keyword, response.data.unit_price);
                this.props.calculateProjectPrice(response.data.unit_price * this.props.num);
            })
            .catch(err => {
                console.log("CartProductPrice price error");
                console.log(err);
            });
    }


    render() {

        return (
            <tr>
                <td>
                    <button onClick={() => this.props.deleteFromCart(this.props.keyword, this.props.project)}><i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
                <td>{this.props.keyword}</td>
                <td>{this.props.num}</td>
                <td>
                    <span hidden={this.state.loading}>{this.state.price}</span>
                    <ClipLoader size="50" color={'#123abc'} loading={this.state.loading}/>
                </td>
                <td><span hidden={this.state.loading}>{this.state.price * this.props.num}</span><ClipLoader
                    size="50" color={'#123abc'} loading={this.state.loading}/></td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRole: state.auth.userRole,
        cartLength: state.cart.cartLength,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() ),
        addProductPrice: (productName, productPrice) => dispatch( actions.addProductPrice(productName, productPrice) )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CartProductPrice);

