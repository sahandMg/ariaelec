import React, { Component } from 'react';
import { Route , Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';
import Main from './main';
import AuxWrapper from './components/AuxWrapper/AuxWrapper';
import HeaderCom from './components/HeaderCom/HeaderCom';
import FooterCom from './components/FooterCom/FooterCom';
import My404Component from './components/My404Component/My404Component';
import Login from './components/User/Login/Login';
import Logout from './components/User/Logout/Logout';
import GoogleRegPass from './components/User/GoogleRegPass/GoogleRegPass';
import GoogleLogin from './components/User/GoogleLogin/GoogleLogin';
import Signup from './components/User/Signup/Signup';
import Cart from './components/Cart/Cart';
import showSearchProductResult from './components/showSearchProductResult/showSearchProductResult';
import Projects from './components/User/Projects/Projects';
import SetFactorInfo from './components/User/SetFactorInfo/SetFactorInfo';
import Conversions from './components/Conversions/Conversions';
import Project from './components/User/Projects/Project/Project';
import Followup from './components/User/Followup/Followup';
import Factor from './components/User/Factor/Factor';
import AdminControlPanel from './components/AdminControlPanel/AdminControlPanel';
import AdminLogIn from './components/AdminControlPanel/AdminLogIn/AdminLogIn';
import ContentManagerPanel from './components/ContentManagerPanel/ContentManagerPanel';
import ContentManagerLogin from './components/ContentManagerPanel/ContentManagerLogin/ContentManagerLogin';
import ContentDetail from './components/Content/ContentDetail/ContentDetail';
import RequireAuth from './components/require_auth/require_auth';
import ContainerSmallSize from './components/Content/ContainerSmallSize/ContainerSmallSize';
import VideoContentContainer from './components/Content/VideoContentContainer/VideoContentContainer';
// import './react-select.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class RouteAPI extends Component {

    render() {

        return (
            <AuxWrapper>
                <HeaderCom/>
                <Alert stack={{limit: 3}} />
                <main className="flex-column">
                    <Switch>
                        <Route path="/User/SetFactorInfo" component={RequireAuth(SetFactorInfo,null)}/>
                        <Route path="/User/Follow-up" component={RequireAuth(Followup,null)}/>
                        <Route path="/User/Factors/:orderNumber" component={RequireAuth(Factor,null)}/>
                        <Route path="/User/Projects/:projectName" component={RequireAuth(Project,null)}/>
                        <Route path="/User/Projects" component={RequireAuth(Projects,null)}/>
                        <Route path="/Logout" component={RequireAuth(Logout,null)}/>
                        <Route path="/googleLogin/:token" component={GoogleLogin}/>
                        <Route path="/google/:token" component={GoogleRegPass}/>
                        <Route path="/search/:category/:keyword" component={showSearchProductResult}/>
                        <Route path="/search/:category/:keyword/:filter" component={showSearchProductResult}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/online-conversion-calculator" component={Conversions}/>
                        <Route path="/Signup" component={Signup}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/articles/:id/:title" component={ContentDetail}/>
                        <Route path="/videos" component={ContainerSmallSize}/>
                        <Route path="/articles" component={ContainerSmallSize}/>
                        <Route path="/ContentManagerPanel" component={RequireAuth(ContentManagerPanel,'cm')}/>
                        <Route path="/AdminLogIn" component={AdminLogIn}/>
                        <Route path="/AdminControlPanel" component={RequireAuth(AdminControlPanel,'admin')}/>
                        <Route path="/ContentManagerLogin" component={ContentManagerLogin}/>
                        <Route exact path="/" component={Main}/>
                        <Route component={My404Component} />
                    </Switch>
                </main>
                <FooterCom/>
            </AuxWrapper>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRole: state.auth.userRole
    };
};


export default withRouter(connect(mapStateToProps,null)(RouteAPI));

