import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cart: [], cartLength: 0, loading: false, errors: null, projectsPrice: [], productPrices: [], cartSumCost: 0
};

const cartADD = ( state, action ) => {
    let temp = state.cart ;let was = 0;let project = []; let projectPrices = state.projectsPrice;let length = state.cartLength;console.log("cartADD reducer :");
    console.log(temp);
    for(let i=0;i<temp.length;i++) {
       if(action.projectName == null) {console.log("projectName is null ");
           if (temp[i][0].project == null) {
               for (let j = 0; j < temp[i].length; j++) {
                   console.log("cart Add "+j+" : "+ temp[i][j].keyword );
                   if (temp[i][j].keyword === action.productName) {
                       temp[i][j].num = action.number + temp[i][j].num;
                       was = 1;console.log("was = 1 ");
                   }
               }
               if (was === 0) {
                   temp[i].push({
                       keyword: action.productName,
                       num: action.number,
                       category: action.category,
                       project: action.projectName,
                       price: 0
                   });
                   length = length + 1;
                   was = 1;
               }
           }
       } else {
           console.log("projectName is not null ");
           if (temp[i][0].project === action.projectName) {
               for (let j = 0; j < temp.length; j++) {
                   if (temp[i][j].keyword === action.productName) {
                       temp[i][j].num = action.number + temp[i][j].num;
                       was = 1;
                   }
               }
               if (was === 0) {
                   temp[i].push({
                       keyword: action.productName,
                       num: action.number,
                       category: action.category,
                       project: action.projectName,
                       price: 0
                   });
                   length = length + 1;
                   was = 1;
               }
           }
       }
    }
    if(was === 0) {
        project.push({keyword: action.productName, num: action.number, category: action.category, project: action.projectName, price: 0});
        temp.push(project);
        projectPrices.push({project: action.projectName, cost: 0});
        console.log("cartADD reducer  projectPrices: ");console.log(projectPrices);
        length = length + 1 ;
    }
    localStorage.setItem('cart', JSON.stringify(temp));
    return updateObject( state, { cart: temp, cartLength: length, projectsPrice: projectPrices} );
};

const updateCartPrices = (state, action) => {
    let productPrices = state.productPrices; let cartSumCost = 0;
    let temp = state.cart ;let projectCost = [];console.log("updateCartPrices reducer productPrices:");console.log(productPrices);
    for(let i=0;i<temp.length;i++) {
        let sumCost = 0;
        for (let j = 0; j < temp[i].length; j++) {
           for(let t = 0; t < productPrices.length; t++) {
               if(productPrices[t].productName === temp[i][j].keyword) {
                   temp[i][j].price = productPrices[t].productPrice;
                   sumCost = sumCost + (temp[i][j].price * temp[i][j].num);
               }
           }
        }
        projectCost.push({projectName: temp[i][0].project, cost: sumCost});
        cartSumCost = cartSumCost + sumCost ;
    }
    // localStorage.setItem('cart', JSON.stringify(temp));
    console.log(temp);console.log(projectCost);
    let test = state.cart;
    return updateObject( state, { cart: test, projectsPrice: projectCost, cartSumCost: cartSumCost} );
};

const addProductPrice = (state, action) => {
   let productPrices = state.productPrices;
    productPrices.push({productName: action.productName, productPrice: action.productPrice});
    console.log("addProductPrice reducer");console.log(productPrices);
    return updateObject( state, { productPrices: productPrices} );
}

const cartRemove = (state, action) => {
    let temp = state.cart; let cartLength = 0; let projectsPrice = state.projectPrices;
    if(temp.length > 0) {
        temp[0] = temp[0].filter((el) => {
            return el.keyword !== action.keyword
        });
        if(temp[0].length === 0) {temp = []} else {cartLength = temp[0].length;}
        localStorage.setItem('cart', JSON.stringify(temp));
    }
    localStorage.setItem('cart', JSON.stringify(temp));
    console.log("cartRemove reducer : ");console.log(temp);
    return updateObject( state, { cart: temp, cartLength: cartLength} );
};

const cartRemoveAll = (state, action) => {
    localStorage.removeItem('cart');
    return updateObject( state, { cart: [], cartLength: 0, projectsPrice: []} );
};

const cartChangeNum = (state, action) => {
    let temp = state.cart;
    for(let i=0;i<temp.length;i++) {
        if( temp[i].keyword === action.productkeyword ) {
           console.log('cartChangeNum');console.log(action.productkeyword);
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
        case actionTypes.UPDATE_CART_PRICES: return updateCartPrices(state, action);
        case actionTypes.ADD_PRODUCT_PRICE: return addProductPrice(state, action);
        default:
            return state;
    }
};

export default reducer;