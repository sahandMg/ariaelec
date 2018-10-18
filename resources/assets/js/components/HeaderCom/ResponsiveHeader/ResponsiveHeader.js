import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ShoppingCart from '../../../assets/Images/shopping_cart.png';
import './ResponsiveHeader.css';
import Search from './Search/Search';
import Navigation from './Navigation/Navigation'
import URLs from "../../../URLs";
import axios from "axios";
import Alert from "react-s-alert";
import * as actions from "../../../store/actions";

class ResponsiveHeader extends Component {
    state = {
        loggingOut: false, userIconClicked: false
    }

    componentDidMount() { console.log("componentDidMount DesktopHeader");
        this.props.checkAuthState();document.addEventListener('mousedown', this.handleClickOutside, false);

    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    LogOutHandler = (e) => {
        e.preventDefault();
        this.setState({loggingOut: true});
        // this.props.logout();
        console.log("token 2 : "+this.props.token);
        let url = URLs.base_URL+URLs.user_logout;
        axios.post(url,{token: this.props.token})
            .then(response => {
                console.log("Not error start");
                console.log(response);
                this.props.logout();
                this.setState({loggingOut: false});
                // this.props.history.push(`/`);
                console.log("Not error");
            })
            .catch(err => {
                console.log("error");console.log(err);
                this.setState({loggingOut: false});
                Alert.error('اختلالی پیش آمده است، لطفا دوباره امتحان کنید', {
                    position: 'top-left',
                    effect: 'scale',
                    beep: false,
                    timeout: 3000,
                    offset: 100
                });
            });

    }

    handleClickOutside = (e) => {
        if( (this.node !== null) && (typeof this.node !== 'undefined') ) {
            if (!this.node.contains(e.target)) {
                this.setState({userIconClicked: false})
            }
        }
    }
    render() {
        return (
        <div className="navbar-sticky-container d-block d-lg-none col-12 p-0">
            <div className="fixed-navbar-top">
                <div className="d-flex justify-content-between bg-dark  pl-2 pr-2 pt-1 pb-1">
                    <div className="flex-grow-1">
                        <h3 className="res-header pt-2"><Link to="/" className="text-light">ETRIX</Link></h3>
                    </div>
                    <div className="shopping-cart-div p-1 mr-5">
                        <Link to="/cart" style={{fontSize: '22px'}}
                              className="border border-1 pl-1 pr-1 pt-1 pb-1 rounded shopping-cart-border-color">
                            <span className="badge" style={{color: 'white'}}>{this.props.cartLength}</span>
                            <img src={ShoppingCart} alt="سبد خرید" className="img-fluid" width="25"/>
                        </Link>
                    </div>
                    <div className="iconbar-container">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                <Search/>
            </div>
            <Navigation/>
        </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRole: state.auth.userRole,
        cartLength: state.cart.cartLength,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() ),
        logout: () => dispatch( actions.logout() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ResponsiveHeader);

