import axios from 'axios';
import * as CartActions from './cart';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userData: userData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('cart');
        localStorage.removeItem('cartLength');
        localStorage.removeItem('firstLogin');
        dispatch(sendlogoutToReducer());
        dispatch(CartActions.removeAllCart());
    }
};

export const sendlogoutToReducer = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password,url) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        console.log("auth action");console.log(url);
        axios.post(url, authData)
            .then((response) => {
                if(response.data !== 404)
                {
                    // response.data.expiresIn
                    const expirationDate = new Date(new Date().getTime() +  10000* 1000);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.userData));
                    console.log("auth");console.log(response);
                    dispatch(authSuccess(response.data.token,response.data.userData));
                    if(response.data.userData.role === null) {
                        dispatch(CartActions.updateCart(response.data.token));
                    }
                    dispatch(checkAuthTimeout(10000));
                } else {
                    console.log("Erorr");
                    dispatch(authFail('ایمیل یا رمز خود را اشتباه وارد کرده اید'));
                }
            })
            .catch(err => {
                console.log("error");
                console.log(err);
                dispatch(authFail('دوباره امتحان کنید'));
            });
    };
};


export const authGoogle = (response) => {
    return dispatch => {
                    console.log("authGoogle");console.log(response);
                    // response.data.expiresIn
                    const expirationDate = new Date(new Date().getTime() +  10000* 1000);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.userData));
                    dispatch(authSuccess(response.data.token,response.data.userData));
                    dispatch(checkAuthTimeout(10000));
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        const firstLogin = localStorage.getItem('firstLogin'); // for send cart to server when log in

        // console.log("authCheckState");console.log(token);
        // dispatch(logout());
        // dispatch(CartActions.removeAllCart());
        if (!token) {
            // console.log("authCheckState");console.log("token null");
            dispatch(CartActions.updateCart(null));
        } else {
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
            // console.log("authCheckState");console.log(token);
            let temp = JSON.parse(userData);
            // console.log("authCheckState");console.log(temp);
            dispatch(authSuccess(token,temp));
            if(temp.role === null) {
                // console.log("userData role");console.log(temp.userData);
                if (firstLogin !== 'false' || firstLogin === null) {
                    dispatch(CartActions.updateCart(token));
                    localStorage.setItem('firstLogin', 'false');
                } else {
                    dispatch(CartActions.getCartFromServer(token));
                }
            }
            //  dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            // }
        }
    };
};