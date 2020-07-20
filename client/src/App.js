import React from 'react';
import store from './store';
import Products from './components/Products';
import { Provider } from 'react-redux';

function App() {
	return (
		<Provider store={store}>
			<Products />
		</Provider>
	);
}

export default App;
