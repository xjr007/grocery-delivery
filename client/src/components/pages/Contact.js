import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
const Contact = () => {
	const [status, setStatus] = useState('');
	const [validated, setValidated] = useState(false);
	const [sendMail, setSendMail] = useState({
		name: '',
		email: '',
		message: '',
	});
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { name, email, message } = sendMail;

	const onChange = e =>
		setSendMail({
			...sendMail,
			[e.target.name]: e.target.value,
		});

	const onSubmit = e => {
		e.preventDefault();
		const form = e.target;
		if (form.checkValidity() === false || name === '' || email === '' || message === '') {
			e.stopPropagation();
		}
		setValidated(true);

		const data = new FormData(form);
		const xhr = new XMLHttpRequest();

		xhr.open(form.method, form.action);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== XMLHttpRequest.DONE) return;
			if (xhr.status === 200) {
				form.reset();
				setStatus('SUCCESS');
			} else {
				setStatus('ERROR');
			}
		};
		xhr.send(data);
	};

	return (
		<Form
			noValidate
			validated={validated}
			className='align-items-center flex-column d-flex'
			onSubmit={onSubmit}
			action='https://formspree.io/mjvapdoq'
			method='POST'>
			<div className='form-heading mt-5 d-flex flex-column align-items-center'>
				<h3>
					<span>Got something to say?</span>
				</h3>
				<p> Feel free to drop a comment below.</p>
			</div>

			{status === 'ERROR' && <p>Please make sure all fields are filled correctly...</p>}
			{status === 'SUCCESS' && <p>Message sent successfully!</p>}
			<Form.Row>
				<Col>
					{' '}
					<Form.Group className='form-name'>
						<Form.Label htmlFor='name'>Name</Form.Label>
						<Form.Control id='name' name='name' type='text' value={name} onChange={onChange} required />

						<Form.Control.Feedback type='invalid'>Please fill this in.</Form.Control.Feedback>
					</Form.Group>
				</Col>

				<Col>
					<Form.Group className='form-email'>
						<Form.Label htmlFor='email'>Email</Form.Label>
						<Form.Control
							id='email'
							name='email'
							type='email'
							value={email}
							onChange={onChange}
							required
						/>

						<Form.Control.Feedback type='invalid'>Please fill this in.</Form.Control.Feedback>
					</Form.Group>
				</Col>

				<Form.Group className='form-msg pl-1 pr-1'>
					<Form.Label htmlFor='message'>Message</Form.Label>
					<Form.Control
						id='message'
						name='message'
						as='textarea'
						row='5'
						value={message}
						onChange={onChange}
						required
					/>

					<Form.Control.Feedback type='invalid'>Please fill this in.</Form.Control.Feedback>
				</Form.Group>
			</Form.Row>

			{status === 'SUCCESS' ? (
				<p>Message sent successfully!</p>
			) : (
				<input
					className='form-button justify-content-center'
					type='submit'
					variant='primary'
					rel='noopener noerferrer'
					target='_blank'
					value='Submit'
				/>
			)}
		</Form>
	);
};

export default Contact;
