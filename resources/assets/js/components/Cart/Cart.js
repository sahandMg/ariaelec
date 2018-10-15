import React , {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../store/actions/index';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import URLs from '../../URLs';

class Cart extends Component {

    state  = {
        prices: {}, loading: true
    }

    componentDidMount() {
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

    deleteFromCart = (productName) => {

    }


    render() {
        let cartLsit;let buyButton = null;let sum = null;
       if(!this.props.cartLoading) {
           console.log('cart render');console.log(this.props.cart);
           if (Number(this.props.cart) === 550) {
               cartLsit = <h1 className="text-center">سبد خرید شما خالی هست</h1>;
           } else if(this.props.cart.length > 0){
               cartLsit = this.props.cart.map((project, i) => {
                   let entry = project.map((list,j) => {
                       return (
                           <tr key={(i*100)+j}>
                               <td><button onClick={()=>this.deleteFromCart(list.name)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                               <td>{list.name}</td>
                               <td>{list.num}</td>
                               <td><ClipLoader size="50" color={'#123abc'} loading={this.state.loading} /></td>
                               <td><ClipLoader size="50" color={'#123abc'} loading={this.state.loading} /></td>
                           </tr>);
                   });
                   return (
                       <div key={i}>
                        <h3> project name </h3>
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
                                  <td><h3>جمع کل :</h3></td>
                                  <td><h3>20000 تومان</h3></td>
                              </tr>
                           </tbody>
                        </table>
                        <br/>
                       </div>
                   );
               });
               sum = <h2>جمع کل : 20000 تومان</h2>;
               buyButton = <Link to="/User/SetFactorInfo" className="btn btn-success">نهایی کردن خرید</Link>;
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
        getCartFromServer: (token) => dispatch(actions.getCartFromServer(token))
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