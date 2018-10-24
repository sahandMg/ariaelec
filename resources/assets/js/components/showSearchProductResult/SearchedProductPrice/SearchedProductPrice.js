import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import URLs from "../../../URLs";

class SearchedProductPrice extends Component {

    state = {
        price: 0, loadingAddCart: true, number: 1
    }
    componentDidMount() {
        axios.post(URLs.base_URL+URLs.product_get_price, {keyword: this.props.keyword})
            .then(response => {
                console.log("SearchedProductPrice price");
                this.setState({price: response.data.unit_price, loadingAddCart: false});
            })
            .catch(err => {
                console.log("SearchedProductPrice price error");
                console.log(err);
            });
    }

    componentWillUnmount() {

    }

// <td key={property}><p hidden={this.state.loadingAddCart}>{this.state.prices[item['manufacturer_part_number']]}</p>
// <input value={this.state.number[item['manufacturer_part_number']]} onChange={(e) => this.setNumber(e,item['manufacturer_part_number'])} type="number" className="form-control" placeholder="1"/>
// <button hidden={this.state.loadingAddCart} onClick={()=> this.onOpenModal(item['manufacturer_part_number'],item[property])} className="btn btn-success" style={{margin: '5px'}}>خرید</button>
// <ClipLoader color={'#123abc'} loading={this.state.loadingAddCart} />
// </td>

    render() {

        return (
            <td >
                <p hidden={this.state.loadingAddCart}>{this.state.price}</p>
                <input value={this.state.number} onChange={(e) => this.setState({number: e.target.value})} type="number" className="form-control" placeholder="1"/>
                <button hidden={this.state.loadingAddCart} onClick={() => this.props.openModal(this.props.keyword,this.props.category,this.state.number)} className="btn btn-success" style={{margin: '5px'}}>خرید</button>
                <ClipLoader color={'#123abc'} loading={this.state.loadingAddCart} />
            </td>
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
        logout: () => dispatch( actions.logout() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchedProductPrice);

