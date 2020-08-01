import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setAlert } from '../../actions/alert';
import { clearErrors } from '../../actions/auth';

export const User = ({ auth: { user, error }, setAlert, clearErrors }) => {
	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
		//eslint-disable-next-line
	}, [setAlert, clearErrors]);
	return (
		<Form className='prof-form'>
			<fieldset disabled>
				<Form.Group>
					<Form.Label htmlFor='disabledName'>Name:</Form.Label>
					<Form.Control id='disabledName' placeholder={user.name} />
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor='disabledEmail'>Email:</Form.Label>
					<Form.Control id='disabledEmail' placeholder={user.email} />
				</Form.Group>
			</fieldset>
		</Form>
	);
};

User.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	setAlert,
	clearErrors,
})(User);
