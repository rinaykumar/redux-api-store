import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setDescription, setPrice, setTitle, setType } from '../redux/actions/listingActions';

const axios = require('axios');

const handleClick = (description, type, price, title) => (e) => {
  e.preventDefault();
  
  const bodyData = {
    description: description,
    type: type,
    price: price,
    title: title,
  }
  axios.post('/api/createListing', bodyData)
  axios.get('/api/viewListings') 
}

const ListingCreationForm = () => {
  const dispatch = useDispatch();
  const description = useSelector(state => state.listingReducer.description);
  const type = useSelector(state => state.listingReducer.type);
  const price = useSelector(state => state.listingReducer.price);
  const title = useSelector(state => state.listingReducer.title);
  
  return (
    <div>
      <form>
        <input type='text' id='input-description' 
          onChange={e => dispatch(setDescription(e.target.value))}/>
        <p>{description}</p>
        <br/>

        <input type='text' id='input-type' 
          onChange={e => dispatch(setType(e.target.value))}/>
        <p>{type}</p> 
        <br/>

        <input type='text' id='input-price'  
          onChange={e => dispatch(setPrice(e.target.value))}/>
        <p>{price}</p>
        <br/>

        <input type='text' id='input-title' 
          onChange={e => dispatch(setTitle(e.target.value))}/>
        <p>{title}</p>  
        <br/>

        <button type='submit' id='submit' onClick={handleClick(description, type, price, title)}>Submit</button>
      </form>
    </div>
  );
};

export default ListingCreationForm;
