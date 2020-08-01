import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../util';
import Fade from 'react-reveal/Fade';
import { loadUser, clearErrors } from '../../actions/auth';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/products';
import PropTypes from 'prop-types';
import { addToCart } from '../../actions/cart';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setAlert } from '../../actions/alert';

const Products = ({
	auth: { loading, error },
	loadUser,
	products,
	fetchProducts,
	addToCart,
	setAlert,
	clearErrors,
}) => {
	const [product, setProduct] = useState(null);
	const [showProduct, setShowProduct] = useState(null);

	useEffect(() => {
		loadUser();
		fetchProducts();
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}

		//eslint-disable-next-line
	}, [fetchProducts, setAlert, clearErrors]);

	const openModal = product => {
		setProduct(product);
		setShowProduct(true);
	};

	return (
		<div className='container'>
			<Fade bottom cascade>
				{!products || loading ? (
					<div>Loading...</div>
				) : (
					<div className='d-flex flex-wrap '>
						{products.map(product => (
							<Card
								className='product-card shadow-sm p-3 mb-5 bg-white d-flex flex-column justify-content-center align-items-center flex-wrap'
								key={product._id}>
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
						className='container '
						size='md'
						show={showProduct}
						onHide={() => setShowProduct(null)}
						aria-labelledby='product-modal-size'>
						<div className='modal-container'>
							{' '}
							<Modal.Header closeButton>
								<Modal.Title id='product-modal-size'>
									<img className='product-image' src={product.image} alt={product.title} />
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className='container d-flex flex-column '>
								<div className='d-flex justify-content-center align-items-center flex-column'>
									<div>Name: {product.title}</div>
									<div>Description: {product.description}</div>
									<div>Price:{formatCurrency(product.price)}</div>
								</div>
								<Button
									className='button m-2'
									onClick={() => {
										addToCart(product);
										setShowProduct(null);
										setProduct(null);
									}}>
									Add To Cart
								</Button>
							</Modal.Body>
						</div>
					</Modal>
				</Fade>
			)}
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
	loadUser,
	setAlert,
	clearErrors,
})(Products);
