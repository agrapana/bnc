import { combineReducers } from 'redux';
import user from './reducers/user_reducer';
import client from './reducers/client_reducer';
import loading from './reducers/loading_reducer';
import category from './reducers/category_reducer';
import gallery from './reducers/gallery_reducer';
import slider from './reducers/slider_reducer';
import portfolio from './reducers/portfolio_reducer';
import product from './reducers/product_reducer';
import productcat from './reducers/productcat_reducer';
import productbrand from './reducers/productbrand_reducer';
import application from './reducers/application_reducer';
import servers from './reducers/server_reducer';
// import role from './general/role_reducer';


const rootReducer = combineReducers({
    user,
    client,
    loading,
    category,
    gallery,
    slider,
    portfolio,
    product,
    productcat,
    productbrand,
    application,
    servers
    // role
});

export default rootReducer;