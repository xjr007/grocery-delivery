import React from 'react';
import store from './store';
import Products from './components/Products';
import { Provider } from 'react-redux';
import Filter from './components/Filter';

function App() {
	return (
		<Provider store={store}>
			<Filter />
			<Products />
		</Provider>
	);
}

export default App;
