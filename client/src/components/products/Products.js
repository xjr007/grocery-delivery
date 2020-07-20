import React, { useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { formatCurrency } from '../../util';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProducts } from '../../actions/products';

const Products = ({ item: { items, loading }, fetchProducts }) => {
	useEffect(() => {
		fetchProducts();
		//eslint-diable-next-line
	}, []);
	if (loading || items === null) {
		return <Preloader />;
	}
	return (
		<Fade bottom cascade>
			<ul>
				{!loading && items.length === null ? (
					<Preloader />
				) : (
					items.map(product => (
						<li key={product._id}>
							<div className='product'>
								<a href={'#' + product._id} onClick={() => console.log(product)}>
									<img src={product.image} alt={product.title} />
									<h5>{product.title}</h5>
								</a>
								<div className='product-price'>{formatCurrency(product.price)}</div>
								<button onClick={() => console.log('Add to cart')}>Add To Cart</button>
							</div>
						</li>
					))
				)}
			</ul>
		</Fade>
	);
};

Products.propTypes = {
	item: PropTypes.object.isRequired,
};

const mapStatetoProps = state => ({
	item: state.item,
});

export default connect(mapStatetoProps, { fetchProducts })(Products);
