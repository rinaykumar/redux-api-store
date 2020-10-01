import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../redux/reducers/rootReducer';
import thunk from 'redux-thunk';

import ViewListings from './ViewListings';

import axios from 'axios';

jest.mock('axios');

axios.get.mockImplementation(() => {
  return Promise.resolve({
    data: {
      items: [
        {
          description: 'This is my item for sale.',
          type: 'lawnEquipment',
          price: 456,
          title: 'Lawn Mower.',
          id: 'a'
        },
        {
          description: 'This is my item for sale.',
          type: 'gymEquipment',
          price: 123,
          title: 'Gym equipment for sale.',
          id: 'b'
        }
      ],
    }
  });
}
);

describe('<ViewListings>', () => {
  it('renders a listing', (done) => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const { container } = render(
      <Provider store={store}>
        <ViewListings />
      </Provider>
    );
    const listings = container.querySelectorAll('.listing');
    expect(listings.length).toBe(0);

    setTimeout(() => {
      expect(axios.get.mock.calls.length).toBe(1);
      expect(axios.get.mock.calls[0][0]).toBe('/api/viewListings');
      const listings = container.querySelectorAll('.listing');
      expect(listings.length).toBe(2);
      done();
    }, 2);
  });
});