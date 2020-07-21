import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//  import reducer
import products from './reducers/products';
import auth from './reducers/auth';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	combineReducers({
		products: products,
		auth: auth,
		// order: orderReducer,
	}),
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
