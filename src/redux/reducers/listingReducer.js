const initState = () => ({
  description: 'Description',
  type: 'Type',
  price: 'Price',
  title: 'Title',
});

const listingReducer = (state = initState(), action) => {
  console.log(action);
  switch(action.type) {
    case 'DESCRIPTION_SET':
      return {
        ...state,
        description: action.description, 
      };
    case 'TYPE_SET':
      return {
        ...state,
        type: action.itemType,
      };
    case 'PRICE_SET':
      return {
        ...state,
        price: action.price,
      };
    case 'TITLE_SET':
      return {
        ...state,
        title: action.title,
      }; 
    default:
      // Don't modify state, ignore action
      return state;
  }
};

export default listingReducer;
