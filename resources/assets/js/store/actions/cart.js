import * as actionTypes from './actionTypes';
import axios from 'axios';
import URLS from '../../URLs';

export const addToCart = (productName,number,category,projectName) => {
    return {
       type: actionTypes.ADD_TO_CART,
       productName: productName, number: number, category: category, projectName: projectName
    }
}

export const removeFromCart = (productName) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        productName: productName
    }
}

export const removeAllCart = (productName) => {
    return {
        type: actionTypes.REMOVE_ALL_FROM_CART
    }
}

export const changeNumFromCart = (productName,number,category) => {
    return {
        type: actionTypes.REMOVE_ALL_FROM_CART,
        productName: productName, number: number, category: category
    }
}

export const getCartFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    let cartLength = 0;
    // console.log("getCartFromLocalStorage");console.log(cart);console.log(cart.length);
    if(cart != null) {
        cart = JSON.parse(cart);
        if(cart.length > 0 ) {
            for(let i=0;i<cart.length;i++) {
                // console.log(i+" : " + cart[i].length);
                cartLength = cartLength + cart[i].length;
            }
        }
        return {
            type: actionTypes.GET_CART_FROM_LOCALSTORAGE,
            cart: cart, cartLength: cartLength
        }
    } else {
        return {
            type: actionTypes.GET_CART_FROM_LOCALSTORAGE,
            cart: [], cartLength: cartLength
        }
    }
}

export const getCartFromServer = (token) => {
    return dispatch => {
        dispatch(setLoadingAndError(true, null));
        axios.post(URLS.base_URL+URLS.user_cart_read, {token: token})
            .then(response => {
                dispatch(setLoadingAndError(false, null));
                let cartNumber = 0;
                response.data.map((project, i) => {
                    cartNumber = cartNumber + project.length;
                });
                dispatch(getCartSuccess(response.data, cartNumber));
            })
            .catch(err => {
                console.log(err);
                // Alert.error('دوباره امتحن کنید', {
                //     position: 'bottom-right',
                //     effect: 'scale',
                //     beep: false,
                //     timeout: 3000,
                //     offset: 100
                // });
                dispatch(setLoadingAndError(false, err));
            });
    }
}

export const getCartSuccess = (cart,cartLength) => {
    return {
        type: actionTypes.GET_CART_FROM_SERVER,
        cart: cart, cartLength: cartLength
    }
}

export const setLoadingAndError = (loading,error) => {
    return {
        type: actionTypes.SET_LOADING_AND_ERROR,
        loading: loading, error: error
    }
}

export const sendCartToServer = (cart) => {
    return dispatch => {
        console.log("cart action sendCartToServer");
        let cart = localStorage.getItem('cart');
        if(cart != null) {
            if(cart.length > 0 ) {
                axios.post(URLS.base_URL + URLS.send_cart_to_server, {cart: cart})
                    .then(response => {
                        console.log("cart action sendCartToServer is done");
                    })
                    .catch(err => {
                        console.log(err);
                        Alert.error('دوباره امتحن کنید', {
                            position: 'bottom-right',
                            effect: 'scale',
                            beep: false,
                            timeout: 3000,
                            offset: 100
                        });
                    });
            }
        }
    }
}
