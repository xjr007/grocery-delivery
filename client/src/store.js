import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import products from './reducers/products';
import auth from './reducers/auth';
import cart from './reducers/cart';
import orders from './reducers/orders';

const middleware = [thunk];

const rootReducer = combineReducers({
	products: products,
	auth: auth,
	cart: cart,
	orders: orders,
});

const initialState = {};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

export default store;
