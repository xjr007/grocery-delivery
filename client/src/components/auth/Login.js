import React, { useState, useContext, useEffect, Fragment } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import { clearErrors, login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../types';

const Login = ({ auth: { isAuthenticated, loading, error }, clearErrors, login, history }) => {
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}

		//eslint-disable-next-line
	}, [error, setAlert]);

	const { email, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		if (email === 'Enter email' || password === 'Enter password') {
			setAlert('Please fill in all fields', 'danger');
		} else {
			login({
				email,
				password,
			});
		}
	};

	return (
		<div className='form-container'>
			{!isAuthenticated && !loading ? (
				<form onSubmit={onSubmit}>
					<h1>
						<span>Login</span>
					</h1>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							className='form-control'
							id='email'
							type='email'
							name='email'
							value={email}
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							className='form-control'
							id='password'
							type='password'
							name='password'
							value={password}
							onChange={onChange}
							required
						/>
					</div>
					<input type='submit' value='Login' className='button' />
					<br />
					<div className='login-register'>
						<span>
							Don't have an account? <Link to={ROUTES.REGISTER}> Register</Link> here.
						</span>
					</div>
				</form>
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
	error: state.err,
});

export default connect(mapStateToProps, { clearErrors, login })(Login);
