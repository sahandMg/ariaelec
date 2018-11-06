export default {
    base_URL: 'http://localhost:80/api',
    home: '/home',
    get_more_content: '/more-content',
    get_videos: '/videos',
    get_more_videos: '/more-videos', // num(starts from 1) => 10*num videos
    product: '/get-price',
    send_cart_to_server: '/user/cart/add',
    react_search_url: 'http://localhost:80/search/',
    search_part: '/search-part?keyword=',
    search_part_category: '/search-part-comp?category=',
    product_get_price: '/get-price', // keyword => price
    admin_log_in: '/admin/login',
    admin_control_panel: '/admin/control-panel',
    admin_control_cm_delete: '/admin/cm/delete',
    admin_control_cm_register: '/admin/cm/register',
    cm_login: '/cm/login',
    cm_add_content: '/cm/content/add',
    cm_add_image: '/cm/image/add',
    cm_get_images: '/cm/image/get?token=',
    user_cart_create: '/user/cart/create',
    user_cart_read: '/user/cart/read',
    user_cart_remove: '/user/cart/edit', // token, keyword, project  => return cart
    user_cart_submit: '/user/cart/price', // token => price, factor number
    user_cart_confirm: '/user/cart/confirm', // token address phone => redirect
    user_get_orders: '/user/bom', //token => all orders
    user_get_bill: '/user/bill', // token , factor number => get bill
    user_logout: '/logout',
    user_login: '/user/login',
    user_google_signup: 'http://localhost:80/login/google',
    user_register: '/user/register',
    user_create_project: '/user/project/create', // token , name
    user_get_projects: '/user/project/detail', //  token => projects
    user_get_data: '/user/data',  // token => get user data and token
}