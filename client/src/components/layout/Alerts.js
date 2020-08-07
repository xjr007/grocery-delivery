import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Alerts = ({ alerts }) => {
	if (alerts.length !== 0) {
		const alertsList = alerts.map(alert => {
			return (
				<div key={alert.id} className={`alert alert-${alert.alertType}`}>
					{alert.msg}
				</div>
			);
		});
		return alertsList;
	} else {
		return null;
	}
};

Alerts.propTypes = {
	alerts: PropTypes.array,
};
const mapStateToProps = state => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
