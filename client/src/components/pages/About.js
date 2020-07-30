import React from 'react';

const About = () => {
	return (
		<div className='about d-flex flex-column justify-content-center align-items-center align-items-center '>
			<h4>About</h4>
			<p>
				Here at <span className='d-logo'>Buy&Dash</span>, we wanted to create a safer option for our
				consumers to purchase their groceries with ease.
			</p>
			<p>
				We offer a variety of products, and with our <b>7 days a week</b> delivery service, we make it
				convenient for you to just log on our website and start ordering <i>now</i>.
			</p>
			<p>
				With just a few clicks, your order can be on it's way with our <b>easy-to-use</b> website and{' '}
				<b>reliable,</b> <b> no contact </b> courier service.
			</p>

			<a href='http://www.google.com'>Sign up for our newsletter</a>
		</div>
	);
};

export default About;
