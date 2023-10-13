import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Signup from '../component/signup';

test('renders form', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});