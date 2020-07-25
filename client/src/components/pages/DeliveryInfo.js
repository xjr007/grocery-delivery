import React from 'react';
// MUST STILL ADD MAP OF COURIER OUTPOSTS
const DeliveryInfo = () => {
	return (
		<div className='container delivery-info'>
			<h4>Delivery Information</h4>
			<div className='delivery-content-1'>
				<h6>Placing an order is as simple as:</h6>
				<p>
					1. Search for your product. <br />
					2. Add it to your cart. <br />
					3. Proceed to checkout.
				</p>
				<p className='solo-center'>Now wait for your delivery!</p>
			</div>
			<div className='delivery-content'>
				<h6>Your privacy is important to us:</h6>
				<p>
					{' '}
					We took great care in selecting our trusted payment gateways so you can feel safe at all times!{' '}
					<br /> Only <span>registered</span> <i>third party</i> has access to Information such as the
					items you buy.
				</p>
			</div>
			<div className='delivery-content'>
				<h6>Delivery Process:</h6>
				<p>
					{' '}
					Expect your order to be delivered within 40 - 50 minutes. <br /> Need faster deliveries? <br />{' '}
					Use our <span>High Priority</span> courier services, ETA 20 - 30 minutes <br />
				</p>
				<p className='solo-center'>
					View our delivery zones <a href='#'>here.</a>
				</p>
			</div>
		</div>
	);
};

export default DeliveryInfo;
