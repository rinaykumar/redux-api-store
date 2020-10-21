import React from 'react';

const axios = require('axios');

const ViewListings = () => {
  const [items, setItems] = React.useState([]);
  
  const fetchItems = () => {
    axios.get('/api/viewListings')
      .then((res) => {
        console.log(res);
        setItems(res.data.items);
      })
      .catch(console.log);
  }; 

  React.useEffect(() => {
    fetchItems();
  }, []);
  
  let itemsList = items.map((item) =>
    <div key={item.id} className='listing'>
      <p>Description: {item.description}</p>
      <p>Type: {item.type}</p>
      <p>Price: {item.price}</p>
      <p>Title: {item.title}</p>
      <p>ID: {item.id}</p>
    </div>
  );

  return (
    <div>
      <h1>ViewListings</h1>
      <div>
        {itemsList}
      </div>
    </div>
  );
};

export default ViewListings;