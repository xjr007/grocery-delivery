import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//  import reducer
import products from './reducers/products';
import auth from './reducers/auth';
import cart from './reducers/cart';
import { composeWithDevTools } from 'redux-devtools-extension';
import orders from './reducers/orders';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	combineReducers({
		products: products,
		auth: auth,
		cart: cart,
		orders: orders,
		// order: orderReducer,
	}),
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
