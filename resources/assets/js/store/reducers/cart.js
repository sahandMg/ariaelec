import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cart: [], cartLength: 0, loading: false, errors: null
};

const cartADD = ( state, action ) => {
    let temp = state.cart ;let was = 0;let project = [];let length = state.cartLength;
    for(let i=0;i<temp.length;i++) {
       if(temp[i][0].name === action.projectName) {
           for(let j=0;j<temp.length;j++) {
               if (temp[i][j].name === action.productName) {
                   temp[i][j].num = action.number + temp[i][j].num;
                   was = 1;
               }
           }
           if(was === 0) {
               temp[i].push({name: action.productName, num: action.number, category: action.category, projectName: action.projectName});
               length = length + 1 ; was = 1;
           }
       }
    }
    if(was === 0) {
        project.push({name: action.productName, num: action.number, category: action.category, projectName: action.projectName});
        temp.push(project);
        length = length + 1 ;
    }
    localStorage.setItem('cart', JSON.stringify(temp));
    console.log("cartADD reducer : ");console.log(temp);
    return updateObject( state, { cart: temp, cartLength: length} );
};

const cartRemove = (state, action) => {
    let temp = state.cart;
    temp = temp.filter((el) => {
        return el !== action.name
    });
    localStorage.setItem('cart', JSON.stringify(temp));
    return updateObject( state, { cart: temp, cartLength: temp.length} );
};

const cartRemoveAll = (state, action) => {
    localStorage.removeItem('cart');
    return updateObject( state, { cart: [], cartLength: 0} );
};

const cartChangeNum = (state, action) => {
    let temp = state.cart;
    for(let i=0;i<temp.length;i++) {
        if( temp[i].name === action.productName ) {
           console.log('cartChangeNum');console.log(action.productName);
           temp[i].num = action.number ;
        }
    }
    localStorage.setItem('cart', JSON.stringify(temp));
    return updateObject( state, { cart: temp, cartLength: temp.length} );
};

const storeCart = (state, action) => {
    // console.log("reducers cart");console.log(action.cart);console.log(action.cartLength);
    return updateObject( state, { cart: action.cart, cartLength: action.cartLength, loading: false, errors: null} );
};

const setLoadingAndError = (state, action) => {
    return updateObject( state, { loading: action.loading, errors: action.errors} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TO_CART: return cartADD(state, action);
        case actionTypes.REMOVE_ALL_FROM_CART: return cartRemoveAll(state, action);
        case actionTypes.REMOVE_FROM_CART: return cartRemove(state, action);
        case actionTypes.CHANGE_NUM_FROM_CART: return cartChangeNum(state, action);
        case actionTypes.GET_CART_FROM_LOCALSTORAGE: return storeCart(state, action);
        case actionTypes.GET_CART_FROM_SERVER: return storeCart(state, action);
        case actionTypes.SET_LOADING_AND_ERROR: return setLoadingAndError(state, action);
        default:
            return state;
    }
};

export default reducer;