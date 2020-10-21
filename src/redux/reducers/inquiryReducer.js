const initState = () => ({
  inquiries: [],
});

const inquiryReducer = (state = initState(), action) => {
  console.log(action);
  switch(action.type) {
    case 'MESSAGE_SET':
      return {
        ...state,
        inquiries: action.message, 
      };
    default:
      // Don't modify state, ignore action
      return state;
  }
};


export default inquiryReducer;
