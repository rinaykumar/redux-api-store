import React from 'react';

const ListingCreationForm = () => {
  return (
    <div>
      <form>
        <input type='text' id='input-title' placeholder='Title'/>
        <br/>
        <input type='text' id='input-type' placeholder='Type'/>
        <br/>
        <input type='text' id='input-price' placeholder='Price'/>
        <br/>
        <input type='text' id='input-description' placeholder='Description'/>
        <br/>
        <button type='submit' id='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ListingCreationForm;
