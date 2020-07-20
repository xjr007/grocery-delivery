import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const SearchBar = () => {
	return (
		<div>
			<Form inline>
				<Form.Control type='text' placeholder='Search' className='mr-sm-2' />
				<Button variant='outline-info'>Search</Button>
			</Form>
		</div>
	);
};

export default SearchBar;
