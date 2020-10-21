import React from 'react';

import { useSelector } from 'react-redux';

const Inquiries = () => {
  const inquiries = useSelector(state => state.inquiryReducer.inquiries);

  let inquiriesList = inquiries.map((item) =>
    <div key={item.message} className='inquiry'>
      <p>Message: {item.message}</p>
    </div>
  );
  
  return (
    <div>
      <h1>Inquiries</h1>
      {inquiriesList}
    </div>
  );
};

export default Inquiries;
