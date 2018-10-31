import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuxWrapper from '../../../AuxWrapper/AuxWrapper';
import './Navigation.css';
import Alert from 'react-s-alert';
import URLs from "../../../../URLs";
import * as actions from '../../../../store/actions/index';

class Navigation extends Component {

    LogOutHandler = (e) => {
        e.preventDefault();
        // this.setState({loggingOut: true});
        // this.props.logout();
        // console.log("token 2 : "+this.props.token);
        let url = URLs.base_URL+URLs.user_logout;
        axios.post(url,{token: this.props.token})
            .then(response => {
                // console.log("Not error start");
                // console.log(response);
                this.props.logout();
                // this.setState({loggingOut: false});
                // this.props.history.push(`/`);
                // console.log("Not error");
            })
            .catch(err => {
                console.log("error");console.log(err);
                // this.setState({loggingOut: false});
                Alert.error('اختلالی پیش آمده است، لطفا دوباره امتحان کنید', {
                    position: 'top-left',
                    effect: 'scale',
                    beep: false,
                    timeout: 3000,
                    offset: 100
                });
            });

    }

    render() {
        let authlink;
        if(this.props.token) {
            authlink = (
                <AuxWrapper>
                    <li className="list-group-item text-right"><Link className="desktop-item-nav" to="/User/Projects">پروژه ها</Link></li>
                    <li className="list-group-item text-right"><Link className="desktop-item-nav" to="/User/Follow-up">پیگیری سفارش ها</Link></li>
                    <li className="list-group-item text-right"><Link className="desktop-item-nav" to="" onClick={this.LogOutHandler}>خروج</Link></li>
                </AuxWrapper>
            );
        } else {
            authlink = (
               <AuxWrapper>
                <li className="list-group-item text-right"><Link to="/Login">ورود</Link></li>
                <li className="list-group-item text-right"><Link to="/Signup">ثبت نام</Link></li>
               </AuxWrapper>
            );
        }
        return (
        <div className="navbar-sticky-bg col-12 m-0 p-0">
            <div className="navbar-sticky col-md-6 col-sm-8 col-10 p-0">
                <ul className="list-group list-group-flush p-0">
                    <li className="list-group-item text-right p-0">
                        <a className="collapsed card-link w-100 p-2 pl-4" data-toggle="collapse" href="#list-first">
                            <span className="dropdown-icon fa fa-arrow-down"></span>
                            <span className="text-right pr-2">محصولات</span>
                        </a>
                        <div className="collapse m-0 pt-2 " id="list-first" dir="rtl">
                            <ul className="w-100 m-0 list-group list-group-flush p-0">
                                <li className="list-group-item text-right p-0 first-dropdwon-background">
                                    <a href="#hey" data-toggle="collapse"
                                       className="m-0 p-2 pl-4 collapsed card-link w-100">
                                        <span className="dropdown-icon fa fa-arrow-down"></span>
                                        <span className="text-right pr-2">آموزش</span>
                                    </a>
                                    <div className="collapse m-0 pt-2" id="hey">
                                        <ul className="w-100 list-group list-group-flush p-0">
                                            <li className="list-group-item text-right second-dropdwon-background"><a
                                                href="/">مجله</a></li>
                                            <li className="list-group-item text-right second-dropdwon-background"><a
                                                href="/">محاسبه تبدیل</a></li>
                                            <li className="list-group-item text-right second-dropdwon-background p-0">
                                                <a href="#third-col" data-toggle="collapse" className="m-0 p-2 pl-4 collapsed card-link w-100">
                                                    <span className="dropdown-icon fa fa-arrow-down"></span>
                                                    <span className="text-right pr-2">فوت پرینت</span>
                                                </a>
                                                <div className="collapse m-0 pt-2" id="third-col">
                                                    <ul className="w-100 list-group list-group-flush p-0">
                                                        <li className="list-group-item text-right third-dropdwon-background"><a href="/">مجله</a></li>
                                                        <li className="list-group-item text-right third-dropdwon-background"><a href="/">محاسبه تبدیل</a></li>
                                                        <li className="list-group-item text-right third-dropdwon-background"><a href="/">فوت پرینت</a></li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="list-group-item text-right first-dropdwon-background"><a href="/">مجله</a></li>
                                <li className="list-group-item text-right first-dropdwon-background"><a href="/">محاسبه تبدیل</a></li>
                                <li className="list-group-item text-right first-dropdwon-background"><a href="/">فوتپرینتها</a></li>
                            </ul>
                        </div>
                    </li>
                    {/*<li className="list-group-item text-right"><a href="/">آموزش</a></li>*/}
                    {/*<li className="list-group-item text-right"><a href="/">مجله</a></li>*/}
                    <li className="list-group-item text-right"><Link className="desktop-item-nav" to="/online-conversion-calculator">محاسبه تبدیل</Link></li>
                    <li className="list-group-item text-right"><Link className="desktop-item-nav" to="/articles">مجله</Link></li>
                    <li className="list-group-item text-right"><Link className="desktop-item-nav" to="/videos">ویدیوها</Link></li>
                    {/*<li className="list-group-item text-right"><a href="/">فوت پرینت</a></li>*/}
                    {authlink}
                </ul>
            </div>
        </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() ),
        logout: () => dispatch( actions.logout() )
    };
};

export default connect(mapStateToProps ,mapDispatchToProps)(Navigation);

