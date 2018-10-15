import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWrapper from "../../CardWrapper/CardWrapper";

class SetFactorInfo extends Component {
    state = {
        data: {
            projectName: '',
        },
        errors: {}
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    newProject = () => {

    }

    render() {
        let data = this.state.data;
        return (
            <div className="container" style={{direction: 'rtl'}}>
                <CardWrapper>
                    <form>
                        <h2>شماره فاکتور : 425648 </h2>
                        <div className="form-group">
                            <label>آدرس</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>شماره تلفن</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <h3>مبلغ پرداختی : 20000 تومان</h3>
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
        cart: state.cart.cart
    };
};

export default connect(mapStateToProps,null)(SetFactorInfo);

