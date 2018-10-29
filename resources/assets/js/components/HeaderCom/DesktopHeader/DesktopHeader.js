import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import './DesktopHeader.css';
import ShoppingCart from '../../../assets/Images/shopping_cart.png';
import Search from './Search/Search';
import Navigation from './Navigation/Navigation';
import URLs from "../../../URLs";
import user_avatar from  "../../../assets/Images/user_avatar.png";

class DesktopHeader extends Component {

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
        // console.log("header");console.log(this.props.cartLength);
        let authLinks = null;
        let className = this.state.userIconClicked ? 'User-Dropdown U-open' : 'User-Dropdown';
        if(this.props.isAuthenticated) {
            authLinks = (
                <ul className="breadcrumb">
                    <li className="mr-lg-5 mr-md-3">
                        <Link to="/cart" className="border border-1 rounded pl-2 pr-2 pt-1 pb-1 shopping-cart-border-color">
                            <span className="badge">{this.props.cartLength}</span>
                            <img src={ShoppingCart} alt="سبد خرید" className="img-fluid" width="29"/>
                        </Link>
                    </li>
                    <li hidden={this.state.loggingOut} className="breadcrumb-item user-menu">
                        <div className="User-area">
                            <div className="User-avtar">
                                <img ref={node => this.node = node} src={user_avatar}
                                     onClick={()=> this.setState({userIconClicked: !this.state.userIconClicked})}/>
                            </div>
                            <ul className={className}>
                                <li><Link to="/User/Projects">پروژه ها</Link></li>
                                <li><Link to="/User/Follow-up">پیگیری سفارش ها</Link></li>
                                <li><Link to="" onClick={this.LogOutHandler}>خروج</Link></li>
                            </ul>
                        </div>
                        {/*<Link to="/Login" onClick={this.LogOutHandler}><i className="fa fa-user-circle-o" aria-hidden="true"></i>*/}
                    {/*</Link>*/}
                        {/*<ul className="dropdown-user">*/}
                            {/*<li><Link to="/User/Projects">پروژه ها</Link></li>*/}
                            {/*<li><Link to="/User/Follow-up">پیگیری خرید</Link></li>*/}
                            {/*<li><Link to="" onClick={this.LogOutHandler}>خروج</Link></li>*/}
                        {/*</ul>*/}
                    </li>
                    <ClipLoader color={'#123abc'} loading={this.state.loggingOut} />
                </ul>
            );
        } else {
            authLinks = (
                <ul className="breadcrumb">
                    <li className="mr-lg-5 mr-md-3">
                        <Link to="/cart" className="border border-1 rounded pl-2 pr-2 pt-2 pb-2 shopping-cart-border-color">
                            <span className="badge">{this.props.cartLength}</span><span> سبد خرید </span>
                            <img src={ShoppingCart} alt="سبد خرید" className="img-fluid" width="29"/>
                        </Link>
                    </li>
                    <li className="breadcrumb-item" style={{color: 'white'}}><Link to="/Login">ورود</Link></li>
                    <li className="breadcrumb-item"><Link to="/Signup">ثبت نام</Link></li>
                </ul>
            );
        }
        return (
        <nav className="navbar-custom p-0 d-none d-lg-block">
            <div className="d-flex justify-content-between pr-5 pl-1">
                <div>
                    <Link to="/" className="navbar-custom-link pt-1" >
                        <h2 className="text-light">ETRIX</h2>
                    </Link>
                </div>
                <Search/>
                {authLinks}
            </div>
            <Navigation/>
        </nav>
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

export default connect(mapStateToProps,mapDispatchToProps)(DesktopHeader);

