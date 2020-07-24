import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../util';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/products';
import PropTypes from 'prop-types';
import { addToCart } from '../../actions/cart';

const Products = ({ auth: { isAuthenticated, loading }, products, fetchProducts, addToCart }) => {
	const [product, setProduct] = useState(null);

	useEffect(() => {
		if (isAuthenticated) {
			fetchProducts();
		}
		Modal.setAppElement('body');

		//eslint-disable-next-line
	}, [fetchProducts]);

	const openModal = product => {
		setProduct(product);
	};

	const closeModal = () => {
		setProduct(null);
	};
	return (
		<div>
			<Fade bottom cascade>
				{!products || (isAuthenticated && loading) ? (
					<div>Loading...</div>
				) : (
					<ul className='products'>
						{products.map(product => (
							<li key={product._id}>
								<div className='product'>
									<a href={'#' + product._id} onClick={() => openModal(product)}>
										<img src={product.image} alt={product.title} />
										<h5>{product.title}</h5>
									</a>
									<div className='product-price'>{formatCurrency(product.price)}</div>
									<button className='button primary' onClick={() => addToCart(product)}>
										Add To Cart
									</button>{' '}
									*
								</div>
							</li>
						))}
					</ul>
				)}
			</Fade>
			{product && (
				<Modal isOpen={true} onRequestClose={closeModal}>
					<Zoom>
						<button className='close-modal' onClick={closeModal}>
							x
						</button>
						<div className='product-details'>
							<img src={product.image} alt={product.title} />
							<div className='product-details-description'>
								<p>
									<strong>{product.title}</strong>
								</p>
								<p>{product.description}</p>

								<div className='product-price'>
									<div>{formatCurrency(product.price)}</div>
									<button
										className='button primary'
										onClick={() => {
											addToCart(product);
											closeModal();
										}}>
										Add To Cart
									</button>
								</div>
							</div>
						</div>
					</Zoom>
				</Modal>
			)}
		</div>
	);
};
//.items
Products.propTypes = {
	products: PropTypes.array,
	fetchProducts: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	products: state.products.filteredItems,
	fetchProducts: state.products.fetchProducts,
	auth: state.auth,
});
export default connect(mapStateToProps, {
	fetchProducts,
	addToCart,
})(Products);
