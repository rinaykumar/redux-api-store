import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../redux/reducers/rootReducer';
import thunk from 'redux-thunk';

import Inquiries from './Inquiries';

describe('<Inquiries>', () => {
  it('renders a listing', () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    store.getState().inquiryReducer.inquiries.push({
      message: 'This is a message.',
    });
    store.getState().inquiryReducer.inquiries.push({
      message: 'Hello World.',
    });
    const { container } = render(
      <Provider store={store}>
        <Inquiries />
      </Provider>
    );
    const inquiries = container.querySelectorAll('.inquiry');
    expect(inquiries.length).toBe(2);
  });
});