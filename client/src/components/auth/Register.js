import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/AlertContext';
import { register, clearErrors } from '../../actions/auth';
import { connect } from 'react-redux';

const Register = ({ auth: { isAuthenticated, error }, register, clearErrors, history }) => {
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;
	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
		//eslint-disable-next-line
	}, [error, setAlert]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const { name, email, password, passwordConfirm } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== passwordConfirm) {
			setAlert('Passwords do not match!', 'danger');
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div>
			{!isAuthenticated ? (
				<div className='form-container'>
					<h1>
						Account <span className='text-primary'>Register</span>
					</h1>
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<label htmlFor='name'>Name</label>
							<input type='text' name='name' value={name} onChange={onChange} required />
						</div>
						<div className='form-group'>
							<label htmlFor='email'>Email Address</label>
							<input type='email' name='email' value={email} onChange={onChange} required />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								name='password'
								value={password}
								onChange={onChange}
								required
								minLength='6'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='passwordConfirm'>Confirm password</label>
							<input
								type='password'
								name='passwordConfirm'
								value={passwordConfirm}
								onChange={onChange}
								required
								minLength='6'
							/>
						</div>
						<input type='submit' value='Register' className='btn btn-primary btn-block' />
					</form>
				</div>
			) : (
				history.push('/')
			)}
		</div>
	);
};

Register.propTypes = {
	auth: PropTypes.object.isRequired,
	register: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	error: state.err,
});

export default connect(mapStateToProps, { clearErrors, register })(Register);
