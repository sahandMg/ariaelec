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

let prices = {};let counter = 0;

class Cart extends Component {

    state  = {
        prices: {}, loading: true, priceRequestSend: false
    }

    componentDidMount() {prices = {};
        console.log("Cart Component");console.log(this.props.token);
       if(this.props.token) {
           this.props.getCartFromServer(this.props.token);
       } else {
           console.log("Cart Component");console.log(this.props.cart);
           if(this.props.cart.length === 0) {
               console.log("this.props.checkCartStore()");
               this.props.checkCartStore();
           }
       }
    }

    deleteFromCart = (productName,projectName) => {
        axios.post(URLs.base_URL+URLs.user_cart_remove, {token: this.props.token, keyword: productName, project: projectName})
            .then(response => {
                console.log("deleteFromCart");console.log(response);
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
    }

    setInitialForPriceInput = () => {
        console.log( "setInitialForPriceInput");console.log(prices);console.log(this.state.loading);
        if(Object.keys(prices).length > 0 && (!this.state.priceRequestSend)) {let pricesBuf = {};counter = 0;
            console.log( "sendRequest");
            Object.keys(prices).map((property, j) => {
                console.log(j + " : " + property);
                axios.post(URLs.base_URL + URLs.product_get_price, {keyword: property})
                    .then(response => {
                        counter++;
                        console.log(j + " : " + counter);
                        console.log(response);
                        pricesBuf[property] = response.data.unit_price;
                        if (counter === Object.keys(prices).length) {
                            console.log("get last response ");
                            console.log(pricesBuf);
                            this.setState({prices: pricesBuf, loading: false});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
            this.setState({priceRequestSend: true});
        } else { console.log("prices array is zero")}
    }

    render() {
        let cartLsit;let buyButton = null;let sum = null;
        console.log('cart render if');console.log(this.props.cartLoading);
       if(!this.props.cartLoading) {
           console.log('cart render');console.log(this.props.cart);console.log(this.props.cartLoading);
           if (Number(this.props.cart) === 550) {
               cartLsit = <h1 className="text-center">سبد خرید شما خالی هست</h1>;
           } else if(this.props.cart.length > 0){
               cartLsit = this.props.cart.map((project, i) => {
                   let entry = project.map((list,j) => { prices[list.name] = 0;
                       return (
                           <tr key={(i*100)+j}>
                               <td><button onClick={()=>this.deleteFromCart(list.name, list.projectName)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                               <td>{list.name}</td>
                               <td>{list.num}</td>
                               <td><span hidden={this.state.loading}>{this.state.prices[list.name]}</span><ClipLoader size="50" color={'#123abc'} loading={this.state.loading} /></td>
                               <td><span hidden={this.state.loading}>{this.state.prices[list.name]*list.num}</span><ClipLoader size="50" color={'#123abc'} loading={this.state.loading} /></td>
                           </tr>);
                   });
                   return (
                       <div key={i}>
                        <h3>{project[0].project}</h3>
                        <table className="table table-striped">
                           <thead>
                           <th>حذف از سبد خرید</th><th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                           </thead>
                           <tbody>
                              {entry}
                              <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td><h3 className="cart-responsive-font">جمع کل :</h3></td>
                                  <td><h3 className="cart-responsive-font">20000 تومان</h3></td>
                              </tr>
                           </tbody>
                        </table>
                        <br/>
                       </div>
                   );
               });
               sum = <h2>جمع کل : 20000 تومان</h2>;
               buyButton = <Link to="/User/SetFactorInfo" className="btn btn-success">نهایی کردن خرید</Link>;
               this.setInitialForPriceInput();
           } else { cartLsit = <h1 className="text-center">سبد خرید شما خالی هست</h1>;}
       }

        return(
            <div className="container table-responsive text-center searchResultContainer">
                <br/>
                <br/>
                {cartLsit}
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
        restoreCart: (response) => dispatch(actions.restoreCart(response))
    };
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        cartLength: state.cart.cart,
        cartLoading: state.cart.loading,
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Cart));