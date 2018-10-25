import React , {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../store/actions/index';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import URLs from '../../URLs';
import './Cart.css';
import CartProject from './CartProject/CartProject';

class Cart extends Component {

    state  = {
        prices: {}, loading: true, priceRequestSend: false,
    }

    componentDidMount() {
        console.log("Cart componentDidMount");console.log(this.props.token);
       if(this.props.token) {
           this.props.getCartFromServer(this.props.token);
       } else {
           if(this.props.cart.length === 0) {
               console.log("this.props.checkCartStore()");
               this.props.checkCartStore();
           }
       }
    }

    deleteFromCart = (productName,projectName) => {
        if(this.props.token) {
            console.log("removeFromCart with token");
            axios.post(URLs.base_URL + URLs.user_cart_remove, {
                token: this.props.token,
                keyword: productName,
                project: projectName
            })
                .then(response => {
                    console.log("deleteFromCart");
                    console.log(response);
                    this.props.restoreCart(response);
                    Alert.success("از سبد خرید حذف شد", {
                        position: 'bottom-right',
                        effect: 'scale',
                        beep: false,
                        timeout: 4000,
                        offset: 100
                    });
                })
                .catch(err => {
                    console.log(err);
                    Alert.error('اختلالی پیش آمدعه است،دوباره امتحن کنید', {
                        position: 'bottom-right',
                        effect: 'scale',
                        beep: false,
                        timeout: 4000,
                        offset: 100
                    });
                });
        } else {
            console.log("removeFromCart reducer without token");
           this.props.removeFromCart(productName,projectName)
        }
    }

    getProjectCost = (i) => {
        console.log(' projectsPrice  ');console.log(i);
        console.log(this.props.projectsPrice);
        console.log(' getProjectCost productPrices ');console.log(this.props.productPrices);
        if(this.props.projectsPrice.length > 0) {
            return this.props.projectsPrice[0].cost;
        }
    }

    renderCartTable = () => {
        let cartLsit = this.props.cart.map((project, i) => {
            // let entry = project.map((list,j) => {
            //     return (<CartProductPrice deleteFromCart={this.deleteFromCart} keyword={list.keyword} num={list.num} project={list.project} />);
            // });
            return (
               <CartProject  key={i} project={project} deleteFromCart={this.deleteFromCart} />
            );
        });
      return cartLsit;
    }

    render() {
        let cartList;let buyButton = null;let sum = null;
            if(this.props.cartLength > 0){  //} else
               cartList = this.renderCartTable();
               sum = <h2>جمع کل : {this.props.cartSumCost} تومان</h2>;
               buyButton = <Link to="/User/SetFactorInfo" className="btn btn-success">نهایی کردن خرید</Link>;
           } else { cartList = <h1 className="text-center">سبد خرید شما خالی هست</h1>;}

        return(
            <div className="container table-responsive text-center searchResultContainer">
                <br/>
                <br/>
                {cartList}
                {sum}
                <br/>
                {buyButton}
                <br/><br/>
                <ClipLoader size="200" color={'#123abc'} loading={this.props.cartLoading} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (productName,number,category) => dispatch(actions.addToCart(productName,number,category)),
        checkCartStore: () => dispatch(actions.getCartFromLocalStorage()),
        getCartFromServer: (token) => dispatch(actions.getCartFromServer(token)),
        restoreCart: (response) => dispatch(actions.restoreCart(response)),
        removeFromCart: (productName,projectName) => dispatch(actions.removeFromCart(productName,projectName)),
        updateCartPrices: (productPrices) => dispatch(actions.updateCartPrices(productPrices)),
    };
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        cartLength: state.cart.cartLength,
        cartLoading: state.cart.loading,
        token: state.auth.token,
        projectsPrice: state.cart.projectsPrice,
        productPrices: state.cart.productPrices,
        cartSumCost: state.cart.cartSumCost
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Cart));