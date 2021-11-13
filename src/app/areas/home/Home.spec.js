import { render } from '@testing-library/react';
import Home from './Home';

it('renders', () => {
  const { getByText, getByAltText } = render(<Home />)

  // getByAltText throws if element is not present on dom
  expect(getByAltText('logo')).toHaveAttribute('src');
  expect(getByText('Learn React')).toHaveAttribute('href');
})
