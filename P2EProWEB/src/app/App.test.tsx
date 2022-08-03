import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../core/store';
import App from './App';

test('renders App', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
    const headerElement = screen.getByText(/My Reading List/i);
    expect(headerElement).toBeInTheDocument();
});
