import React, { useEffect } from 'react';

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className='about d-flex flex-column justify-content-center align-items-center align-items-center '>
			<h4>About</h4>
			<p>
				Here at Buy&Dash, we wanted to create a safer option for our consumers to purchase their
				groceries with ease.
			</p>
			<p>
				We offer a variety of products, and with our <span className='para-fonts'>7 days a week</span>{' '}
				delivery service, we make it convenient for you to just log on our website and start ordering
				now!
			</p>
			<p>
				With just a few clicks, your order can be on it's way with our{' '}
				<span className='para-fonts'>easy-to-use</span> website and{' '}
				<span className='para-fonts'>reliable, no contact </span> courier service.
			</p>
		</div>
	);
};

export default About;
