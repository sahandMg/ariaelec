import React , { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import axios from "axios";
import URLs from "../../../URLs";

class GoogleLogin extends Component {

    state = {
        data: {
            email: '',
            password: '',
        },
        errors: {}
    }

    componentDidMount() {
        console.log("GoogleLogin");
        console.log(this.props.match.params.token);
        // this.props.checkAuthState();
        axios.post(URLs.base_URL+URLs.user_get_data, {token: this.props.match.params.token})
            .then(response => {
                console.log("GoogleLogin");console.log(response);
                this.props.authGoogle(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        console.log("GoogleLogin");console.log(this.props.token);
        if (this.props.token) {
            return <Redirect to="/" />;
        }
        const { data, errors } = this.state;
        return (
            <div className="container" style={{direction: "ltr", padding: '20%'}}>
               <ClipLoader  loaderStyle={{size: '200'}} color={'#123abc'} loading={this.props.loading} />
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

export default connect(mapStateToProps,mapDispatchToProps)(GoogleLogin);


