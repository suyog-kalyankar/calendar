import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './state/store';

test('renders the landing app', () => {
  render( <Provider store={store}> <App /></Provider>);
});
