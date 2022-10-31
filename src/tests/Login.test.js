import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Login from '../pages/Login';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test the login component', () => {
  it('should elements have the expected behavior', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const enterButton = screen.getByRole('button', { name: /enter/i });

    expect(enterButton).toBeDisabled();
    userEvent.type(emailInput, 'tryber@teste.com');
    userEvent.type(passwordInput, '1234567');
    expect(enterButton).toBeEnabled();
    userEvent.click(enterButton);
    expect(enterButton).not.toBeInTheDocument();
    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');
  });
});
