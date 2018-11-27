import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import URLs from "../../../URLs";
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

class Followup extends Component {

    state = {
        factors: [], loading: true,
    }

    componentDidMount() {
        axios.post(URLs.base_URL+URLs.user_get_orders, {token: this.props.token})
            .then(response => {
                // console.log("componentDidMount Followup response");console.log(response);
                this.setState({factors: response.data, loading: false});
            })
            .catch(err => {
                console.log("componentDidMount Followup err");
                console.log(err);this.setState({loading: false});
            });
    }


    render() {
        let factors;
        if(!this.state.loading) {
            if (this.state.factors.length > 0) {
                let entry = this.state.factors.map((factor, i) => {
                    let status;
                    if (factor.status === "50") {
                        status = <td>در حال جمع آوری</td>
                    }
                    if (factor.status === '100') {
                        status = <td>ارسال شده</td>
                    }
                    if (factor.status === '0') {
                        status = <td>تحویل داده شد</td>
                    }
                    return (
                        <tr>
                            <td><Link to={"/User/Factors/" + factor.order_number}> {factor.order_number} </Link></td>
                            <td>{factor.created_at}</td>
                            <td>{factor.price} تومان</td>
                            {status}
                        </tr>
                    )
                })
                factors = (<div style={{direction: 'rtl', textAlign: "right"}}>
                    <table className="table table-striped">
                        <thead>
                        <th>شماره فاکتور</th>
                        <th>زمان</th>
                        <th>هزینه کل</th>
                        <th>وضعیت</th>
                        </thead>
                        <tbody>
                        {entry}
                        </tbody>
                    </table>
                </div>)
            } else {
                factors = <div><br/><br/><h2 className="text-center">هیچ سفارشی ثبت نکردید</h2><br/></div>
            }
        }
        return (
            <div className="container responsive-margin" style={{direction: "ltr"}}>
                <h1 className="text-center">سفارش ها </h1>
                {factors}
                <br/>
                <ClipLoader style={{margin: 'auto', display: 'block'}} size="200" color={'#123abc'} loading={this.state.loading} />
                <br/><br/>
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps,null)(Followup);


