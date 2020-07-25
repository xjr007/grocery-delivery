import React from 'react';

const About = () => {
	return (
		<div className='about d-flex flex-column justify-content-center align-items-center align-items-center '>
			<h1>About</h1>
			<p>
				Here at <b>Buy&Dash</b>, we wanted to create a safer option for our consumers to purchase their
				groceries with ease.
			</p>
			<p>
				We offer a variety of products and with our <i>7 days a week</i> delivery service makes it
				convenient for you to just log on our website and start ordering now.
			</p>
			<p>
				With just a few clicks, your order can be on it's way with our <b>easy-to-use</b> website and{' '}
				<b>reliable</b> and <b> no contact </b> courier services
			</p>

			<a href='#'>Sign up for our newsletter</a>
		</div>
	);
};

export default About;
