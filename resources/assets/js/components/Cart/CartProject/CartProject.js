import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import URLs from "../../../URLs";
import CartProductPrice from "../CartProductPrice/CartProductPrice";
class CartProject extends Component {

    state = {
        projectPrice: 0, loading: true,
    }
    componentDidMount() {

    }

    calculateProjectPrice = (cost) => {
        let temp = this.state.projectPrice;
        temp = temp + cost;
        this.setState({projectPrice: temp});
    }

    render() {
        let entry = this.props.project.map((list,j) => {
            return (<CartProductPrice calculateProjectPrice={this.calculateProjectPrice} deleteFromCart={this.props.deleteFromCart} keyword={list.keyword} num={list.num} project={list.project} />);
        });
        return (
            <div>
                <h3>{this.props.project[0].project}</h3>
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
                        <td><h3 className="cart-responsive-font">{this.state.projectPrice} تومان</h3></td>
                    </tr>
                    </tbody>
                </table>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addProductPrice: (productName, productPrice) => dispatch( actions.addProductPrice(productName, productPrice) )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CartProject);

