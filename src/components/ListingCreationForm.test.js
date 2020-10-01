import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../redux/reducers/rootReducer';
import thunk from 'redux-thunk';

import ListingCreationForm from './ListingCreationForm';
import axios from 'axios';

jest.mock('axios');

describe('<ListingCreationForm>', () => {
  it('renders a listing', (done) => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const { container, queryByText } = render(
      <Provider store={store}>
        <ListingCreationForm />
      </Provider>
    );

    expect(queryByText('hello')).not.toBeInTheDocument();
    fireEvent.change(container.querySelector('#input-description'), { target: { value: 'hello' } });
    expect(store.getState().listingReducer.description).toBe('hello');
    expect(queryByText('hello')).toBeInTheDocument();

    expect(queryByText('itemType')).not.toBeInTheDocument();
    fireEvent.change(container.querySelector('#input-type'), { target: { value: 'itemType' } });
    expect(store.getState().listingReducer.type).toBe('itemType');
    // expect(queryByText('itemType')).toBeInTheDocument();


    expect(queryByText('123')).not.toBeInTheDocument();
    fireEvent.change(container.querySelector('#input-price'), { target: { value: 123 } });
    expect(store.getState().listingReducer.price).toBe('123');
    //expect(queryByText('123')).toBeInTheDocument();

    expect(queryByText('My Title')).not.toBeInTheDocument();
    fireEvent.change(container.querySelector('#input-title'), { target: { value: 'My Title' } });
    expect(store.getState().listingReducer.title).toBe('My Title');

    axios.post.mockImplementation(() => Promise.resolve({}));
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: {
          items: [],
        }
      });
    }
    );
    fireEvent.click(container.querySelector('#submit'));
    setTimeout(() => {
      expect(axios.post.mock.calls.length).toBe(1);
      expect(axios.post.mock.calls[0][0]).toBe('/api/createListing');
      expect(axios.post.mock.calls[0][1].description).toBe('hello');
      expect(axios.post.mock.calls[0][1].type).toBe('itemType');
      expect(axios.post.mock.calls[0][1].price).toBe('123');
      expect(axios.post.mock.calls[0][1].title).toBe('My Title');
      expect(axios.get.mock.calls.length).toBe(1);
      expect(axios.get.mock.calls[0][0]).toBe('/api/viewListings');
      done();
    }, 2);
  });
});