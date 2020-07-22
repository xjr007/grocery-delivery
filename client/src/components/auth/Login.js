import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import { clearErrors, login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ auth: { isAuthenticated, error }, clearErrors, login, history }) => {
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;

	useEffect(() => {
		if (error === 'Invalid email/password') {
			setAlert(error, 'danger');
			clearErrors();
		}
		//eslint-disable-next-line
	}, [error, clearErrors, setAlert]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert('Please fill in all fields', 'danger');
		} else {
			login({
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
						Account <span className='text-primary'>Login</span>
					</h1>
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<label htmlFor='email'>Email Address</label>
							<input id='email' type='email' name='email' value={email} onChange={onChange} required />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								name='password'
								value={password}
								onChange={onChange}
								required
							/>
						</div>
						<input type='submit' value='Login' className='btn btn-primary btn-block' />
					</form>
				</div>
			) : (
				history.push('/')
			)}
		</div>
	);
};

Login.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { clearErrors, login })(Login);
