import React , {Component} from 'react';
import GoogleSingup from  '../GoogleSignup/GoogleSignup';
import CardWrapper from '../../CardWrapper/CardWrapper';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import LoginCom from '../../LoginCom/LoginCom';
import './Login.css';
import URLs from "../../../URLs";

class Login extends Component {

    render() {

        return (
            <div className="container loginWidth">
                <CardWrapper>
                    <h1>ورود</h1>
                    <hr/>
                    <GoogleSingup text="ورود با گوگل"/>
                    <br/>
                    <div className="text-center">
                        <strong>یا</strong>
                    </div>
                    <br/>
                    <LoginCom redirectTo='/' url={URLs.base_URL+URLs.user_login} />
                    <br/>
                    <br/>
                </CardWrapper>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        errorServer: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);