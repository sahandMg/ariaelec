import React , { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import InlineError from '../../messages/InlineError';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import CardWrapper from '../../CardWrapper/CardWrapper';
import Alert from 'react-s-alert';
import URLs from "../../../URLs";

class GoogleRegPass extends Component {

    state = {
        data: {
            password: '',
        },
        errors: {}
    }

    componentDidMount() {
        this.props.checkAuthState();
    }

    sendData = (event) => {
        event.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            console.log('token');console.log(this.props.match.params.token);
            console.log('password');console.log(this.state.data.password);
            axios.post(URLs.base_URL+URLs.user_register,{token: this.props.match.params.token,password: this.state.data.password})
            .then((response) => {
                console.log('response');
                console.log(response);
                this.props.authGoogle(response);
            })
            .catch(err => {
                    console.log("error");
                    console.log(err);
                Alert.error('اختلالی پیش آمده است، لطفا دوباره امتحان کنید', {
                    position: 'top-left',
                    effect: 'scale',
                    beep: false,
                    timeout: 4000,
                    offset: 100
                });
             });
        }
    }

    validate = (data) => {
        const errors = {};
        if (!data.password) errors.password = "رمز را وارد نکرده ابد";
        if (data.password.length<8) errors.password = "رمز حداقل باید 8 حرف باشد";
        return errors;
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    render() {
        if (this.props.token) {
            return <Redirect to="/" />;
        }
        const { data, errors } = this.state;
        return (
            <div className="container" style={{direction: "ltr"}}>
                <br/><br/>
              <CardWrapper>
                <h2>رمز خود را وارد کنید</h2>
                <form onSubmit={this.sendData} className="text-right" style={{direction: "rtl"}}>
                    {this.props.errorServer && <InlineError text={this.props.errorServer} />}
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">رمز</label>
                        <input name="password" value={data.password} onChange={this.onChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="رمز خود را وارد کنید"/>
                        {errors.password && <InlineError text={errors.password} />}
                    </div>
                    <div className="flex-row space-between">
                        <div>
                            <button  hidden={this.props.loading} type="submit" className="btn btn-success">ثبت رمز</button>
                            <ClipLoader color={'#123abc'} loading={this.props.loading} />
                        </div>
                    </div>
                </form>
              </CardWrapper>
              <br/><br/><br/><br/>
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        errorServer: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authGoogle: (response) => dispatch(actions.authGoogle(response)),
        checkAuthState: () => dispatch( actions.authCheckState() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(GoogleRegPass);


