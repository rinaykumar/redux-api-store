import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../redux/actions/inquiryActions';

const axios = require('axios');

let inquiries = [];

const Listing = ({listing, userMode}) => {
  const dispatch = useDispatch();
  const message = useSelector(state => state.inquiryReducer.inquiries);

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    axios.get('/api/deleteListing?id=' + id); 
  };
  
  const handleSubmit = (id, message) => (e) => {
    e.preventDefault();
    axios.post('/api/makeInquiry?listingId=' + id, {
      message
    }); 
  };

  const handleView = (id) => (e) => {
    e.preventDefault();
  
    axios.get('/api/getInquiries?listingId=' + id)
      .then((res) => {
        console.log(res);
        inquiries = res.data.inquiries;
        console.log(inquiries);
        dispatch(setMessage(inquiries));
      })
      .catch(console.log);
  };

  return (
    <div>
      <table className="listing">
        <tbody>
          <tr>
            <td>Description: </td>
            <td>{listing.description}</td>
          </tr>
          <tr>
            <td>Type: </td>
            <td>{listing.type}</td>
          </tr>
          <tr>
            <td>Price: </td>
            <td>{listing.price}</td>
          </tr>
          <tr>
            <td>Title: </td>
            <td>{listing.title}</td>
          </tr>
        </tbody>
      </table>
      <div>
        {userMode && (
          <div>
            <textarea value={message} onChange={e => dispatch(setMessage(e.target.value))}></textarea>
            <button className='submit' onClick={handleSubmit(listing.id, message)}>Submit</button>
          </div>
        )}
        {!userMode && (
          <div>
            <button onClick={handleDelete(listing.id)}>Delete</button>
            <button onClick={handleView(listing.id)}>View Inquiries</button>
          </div>
        )}
      </div>
    </div>   
  );
};

export default Listing;