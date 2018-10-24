export default {
    base_URL: 'http://localhost:80/api',
    product: '/get-price',
    send_cart_to_server: '/user/cart/add',
    react_search_url: 'http://localhost:80/search/',
    search_part: '/search-part?keyword=',
    search_part_category: '/search-part-comp?category=',
    product_get_price: '/get-price', // keyword => price
    user_cart_create: '/user/cart/create',
    user_cart_read: '/user/cart/read',
    user_cart_remove: '/user/cart/edit', // token, keyword, project  => return cart
    user_cart_submit: '/user/cart/price', // token => price, factor number
    user_cart_confirm: '/user/cart/confirm', // token adress phonenumber => redirect
    user_logout: '/logout',
    user_login: '/user/login',
    user_google_signup: 'http://localhost:80/login/google',
    user_register: '/user/register',
    user_create_project: '/user/project/create', // token , name
    user_get_projects: '/user/project/detail', //  token => projects
    user_get_data: '/user/data',  // token => get user data and token
}