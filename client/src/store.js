import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//  import reducer
import products from './reducers/products';
import auth from './reducers/auth';
import cart from './reducers/cart';
import { composeWithDevTools } from 'redux-devtools-extension';
import orders from './reducers/orders';

const middleware = [thunk];

// const saveToLocalStorage = state => {
// 	try {
// 		const serialisedState = JSON.stringify(state);
// 		localStorage.setItem('state', serialisedState);
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// const fetchFromLocalStorage = () => {
// 	try {
// 		const serialisedState = localStorage.getItem('state');
// 		if (serialisedState === null) return undefined;
// 		return JSON.parse(serialisedState);
// 	} catch (err) {
// 		console.error(err);
// 		return undefined;
// 	}
// };

// const persistedState = fetchFromLocalStorage();

const appReducer = combineReducers({
	products: products,
	auth: auth,
	cart: cart,
	orders: orders,
	// order: orderReducer,
});

// const rootReducer = (state, action) => {
// 	if (action.type === 'LOGOUT') {
// 		state = undefined;
// 	}

// 	return appReducer(state, action);
// };

const initialState = {};

const store = createStore(
	appReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
