import { render, screen } from '@testing-library/react';
import Greetings from '../../../src/app/2440111573/component/greetings.jsx';

describe('Greeting component', () => {
  it('renders the correct greeting message', () => {
    render(<Greetings name="Theo" />);
    const heading = screen.getByText('Hello, Theo!');
    expect(heading).toBeInTheDocument();
  });
});