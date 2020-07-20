import React, { Fragment } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import SearchBar from './components/layout/SearchBar';
import Products from './components/products/Products';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Provider store={store}>
			<Fragment>
				<SearchBar />
				<Products />
			</Fragment>
		</Provider>
	);
}

export default App;
