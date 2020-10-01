import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../redux/reducers/rootReducer';
import thunk from 'redux-thunk';

import Listing from './Listing';

import axios from 'axios';

jest.mock('axios');

describe('<Listing>', () => {
  it('renders a listing', (done) => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const listing = {
      description: 'This is my item for sale.',
      type: 'gymEquipment',
      price: 123,
      title: 'Gym equipment for sale.',
      id: 'abc'
    };
    const { getByText } = render(
      <Provider store={store}>
        <Listing listing={listing} />
      </Provider>
    );

    expect(getByText('This is my item for sale.')).toBeInTheDocument();
    expect(getByText('gymEquipment')).toBeInTheDocument();
    expect(getByText('123')).toBeInTheDocument();
    expect(getByText('Gym equipment for sale.')).toBeInTheDocument();

    expect(getByText('Delete')).toBeInTheDocument();
    expect(getByText('View Inquiries')).toBeInTheDocument();


    //Delete
    axios.get.mockImplementation(() => Promise.resolve({

    }));
    fireEvent.click(getByText('Delete'));
    expect(axios.get.mock.calls.length).toBe(1);
    expect(axios.get.mock.calls[0][0]).toBe('/api/deleteListing?id=abc');

    // View Inquiries
    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        inquiries: [
          {}
        ]
      }
    }));
    fireEvent.click(getByText('View Inquiries'));
    expect(axios.get.mock.calls.length).toBe(2);
    expect(axios.get.mock.calls[1][0]).toBe('/api/getInquiries?listingId=abc');
    setTimeout(() => {
      expect(store.getState().inquiryReducer.inquiries.length).toBe(1);
      done();
    }, 2);
  });

  it('renders a listing', () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const listing = {
      description: 'This is my item for sale.',
      type: 'gymEquipment',
      price: 123,
      title: 'Gym equipment for sale.',
      id: 123,
    };
    const { container, getByText, queryByText } = render(
      <Provider store={store}>
        <Listing listing={listing} userMode={true} />
      </Provider>
    );

    expect(getByText('This is my item for sale.')).toBeInTheDocument();
    expect(getByText('gymEquipment')).toBeInTheDocument();
    expect(getByText('123')).toBeInTheDocument();
    expect(getByText('Gym equipment for sale.')).toBeInTheDocument();

    expect(queryByText('Delete')).not.toBeInTheDocument();
    expect(queryByText('View Inquiries')).not.toBeInTheDocument();

    axios.post.mockImplementation(() => Promise.resolve({

    }));

    fireEvent.change(container.querySelector('textarea'), { target: { value: 'Hello World' } });
    expect(getByText('Hello World')).toBeInTheDocument();

    fireEvent.click(container.querySelector('.submit'));
    expect(axios.post.mock.calls.length).toBe(1);
    expect(axios.post.mock.calls[0][0]).toBe('/api/makeInquiry?listingId=123');
    expect(axios.post.mock.calls[0][1].message).toBe('Hello World');
  });
});