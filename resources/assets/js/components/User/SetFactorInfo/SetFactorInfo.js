import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWrapper from "../../CardWrapper/CardWrapper";
import URLs from "../../../URLs";
import axios from 'axios';

class SetFactorInfo extends Component {
    state = {
        data: {
            address: '', phone: ''
        },
        price: 0, number: '',
        errors: {}
    }

    componentDidMount() {
        console.log("SetFactorInfo");
        axios.post(URLs.base_URL+URLs.user_cart_submit, {token: this.props.token})
            .then(response => {
                console.log("deleteFromCart");console.log(response);
                this.setState({price: response.data.price, number: response.data.number});
            })
            .catch(err => {
                console.log(err);
            });
    }
    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    confirmFactor = () => {

    }

    render() {
        console.log("SetFactorInfo render");
        let data = this.state.data;
        return (
            <div className="container" style={{direction: 'rtl'}}>
                <CardWrapper>
                    <form method="post" action={URLs.base_URL+URLs.user_cart_confirm}>
                        <h2>شماره فاکتور : {this.state.number} </h2>
                        <input name="token" value={this.props.token} hidden />
                        <div className="form-group">
                            <label>آدرس</label>
                            <input name="address" value={data.address} onChange={this.onChange} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>شماره تلفن</label>
                            <input name="phone" value={data.phone} onChange={this.onChange} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <h3>مبلغ پرداختی : {this.state.price} تومان</h3>
                        </div>
                        <button type="submit" className="btn btn-primary">پرداخت</button>
                    </form>
                </CardWrapper>
                <br/><br/><br/><br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,null)(SetFactorInfo);

