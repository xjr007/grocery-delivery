import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../util';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/products';
import PropTypes from 'prop-types';
import { addToCart } from '../../actions/cart';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Products = ({ auth: { isAuthenticated, loading }, products, fetchProducts, addToCart }) => {
	const [product, setProduct] = useState(null);
	const [showProduct, setShowProduct] = useState(null);

	useEffect(() => {
		if (isAuthenticated) {
			fetchProducts();
		}
		// Modal.setAppElement('body');

		//eslint-disable-next-line
	}, [fetchProducts]);

	const openModal = product => {
		setProduct(product);
		setShowProduct(true);
	};

	const closeModal = () => {
		setProduct(null);
	};
	return (
		<div className='container'>
			<Fade bottom cascade>
				{!products || (!isAuthenticated && loading) ? (
					<div>Loading...</div>
				) : (
					<div className='d-flex flex-wrap'>
						{products.map(product => (
							<Card className='product-card shadow-sm p-3 mb-5 bg-white' key={product._id}>
								<Card.Img onClick={() => openModal(product)} variant='top' src={product.image} />
								<Card.Body>
									<Card.Title>
										{' '}
										{formatCurrency(product.price)} <br /> {product.title}
									</Card.Title>
									<Card.Text>{product.description}</Card.Text>
									<Button
										className='button'
										onClick={() => {
											addToCart(product);
											setShowProduct(null);
											setProduct(null);
										}}>
										Add To Cart
									</Button>
								</Card.Body>
							</Card>
						))}
					</div>
				)}
			</Fade>

			{product && (
				<Fade bottom>
					<Modal
						size='md'
						show={showProduct}
						onHide={() => setShowProduct(null)}
						aria-labelledby='product-modal-size'>
						<Modal.Header closeButton>
							<Modal.Title id='container justify-content-center product-modal-size'>
								<img className='product-image' src={product.image} alt={product.title} />
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{product.title} <br />
							{product.description} <br />
							{formatCurrency(product.price)} <br />
							<Button
								className='button'
								onClick={() => {
									addToCart(product);
									setShowProduct(null);
									setProduct(null);
								}}>
								Add To Cart
							</Button>
						</Modal.Body>
					</Modal>
				</Fade>
			)}

			{/* {product && (
				<Modal className='custom-modal' isOpen={true} onRequestClose={closeModal}>
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
										className='button'
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
			)} */}
		</div>
	);
};

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
