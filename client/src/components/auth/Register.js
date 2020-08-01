import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { register, clearErrors } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../types';
import { setAlert } from '../../actions/alert';

const Register = ({
	auth: { isAuthenticated, error, loading },
	register,
	clearErrors,
	history,
	setAlert,
}) => {
	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
		//eslint-disable-next-line
	}, [error, setAlert, clearErrors]);

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
		if (name === '' || email === '' || password === '' || passwordConfirm === '') {
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
		<div className='form-container'>
			{!isAuthenticated && !loading ? (
				<form onSubmit={onSubmit}>
					<h1>
						<span>Register</span>
					</h1>
					<div className='form-group'>
						<label htmlFor='name'>Name</label>
						<input
							className='form-control'
							id='name'
							type='name'
							name='name'
							value={name}
							onChange={onChange}
							required
						/>
					</div>
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
							minLength='6'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='passwordConfirm'>Confirm Password</label>
						<input
							className='form-control'
							id='passwordConfirm'
							type='password'
							name='passwordConfirm'
							value={passwordConfirm}
							onChange={onChange}
							required
						/>
					</div>
					<input type='submit' value='Register' className='button' />
					<br />
					<div className='login-register container d-flex flex-column flex-wrap justify-content-center'>
						<span>
							Already have an account? Sign in <Link to={ROUTES.LOGIN}> here</Link>.
						</span>
					</div>
				</form>
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

export default connect(mapStateToProps, { clearErrors, register, setAlert })(Register);
