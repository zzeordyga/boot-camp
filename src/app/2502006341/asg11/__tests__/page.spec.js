import '@testing-library/jest-dom'
const { render, screen } = require('@testing-library/react')
import Main from '../page'
import { ThemeProvider } from '../context/ThemeContext'

describe('Assignment 11', () => {
  it('renders a heading', () => {
    render(
        <ThemeProvider>
            <Main />
        </ThemeProvider>
    );
 
    const heading = screen.getByRole('heading', { level: 1 });
 
    expect(heading).toBeInTheDocument();
  })
})