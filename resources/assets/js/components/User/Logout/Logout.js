import React , {Component} from 'react';
import { Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        if (this.props.token) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch( actions.logout() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Logout);