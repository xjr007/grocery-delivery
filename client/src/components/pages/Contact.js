import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
const Contact = () => {
	const [status, setStatus] = useState('');
	const [isFill, setIsFill] = useState(false);
	const [validated, setValidated] = useState(null);
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
		setValidated(true);
		const form = e.target;
		if (form.checkValidity() === false || name === '' || email === '' || message === '') {
			e.stopPropagation();
		} else {
			setIsFill(true);
		}

		if (isFill) {
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
		}
	};

	return (
		<Form
			noValidate
			validated={validated}
			className=''
			onSubmit={onSubmit}
			action='https://formspree.io/mjvapdoq'
			method='POST'>
			<div className='form-heading'>
				<h3>
					<span>Got something to say?</span>
				</h3>
				<p> Feel free to drop a comment below.</p>
			</div>

			{status === 'ERROR' && <p>Please make sure all fields are filled correctly...</p>}
			{status === 'SUCCESS' && <p>Message sent successfully!</p>}
			<Form.Row>
				<Col className='col-name'>
					{' '}
					<Form.Group className='form-name'>
						<Form.Label htmlFor='name'>Name</Form.Label>
						<Form.Control
							id='name'
							className='msgbox'
							name='name'
							type='text'
							value={name}
							onChange={onChange}
							required
						/>

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
							className='msgbox'
							value={email}
							onChange={onChange}
							required
						/>

						<Form.Control.Feedback type='invalid'>Please fill this in.</Form.Control.Feedback>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				{' '}
				<Col className=' '>
					<Form.Group className='form-msg'>
						<Form.Label htmlFor='message'>Message</Form.Label>
						<Form.Control
							id='message'
							name='message'
							as='textarea'
							className='msgbox'
							row='5'
							value={message}
							onChange={onChange}
							required
						/>

						<Form.Control.Feedback type='invalid'>Please fill this in.</Form.Control.Feedback>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col className='d-flex justify-content-center '>
					{' '}
					{status ? (
						<p>Message sent!</p>
					) : (
						<input
							className='button  pl-4 pr-4 pt-2 pb-2'
							type='submit'
							variant='primary'
							rel='noopener noerferrer'
							target='_blank'
							value='Submit'
						/>
					)}
				</Col>
			</Form.Row>
		</Form>
	);
};

export default Contact;
