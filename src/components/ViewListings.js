import React from 'react';
import Listing from '../components/Listing';

const axios = require('axios');

const ViewListings = ({userMode}) => {
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
    <div key={item.id}>
      <Listing listing={item} userMode={userMode} />
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