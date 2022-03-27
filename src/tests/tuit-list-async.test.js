import Tuits from '../components/tuits';
import { screen, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { findAllTuits } from '../services/tuits-service';

// tuit list renders async
test('tuit list renders async', async () => {
  const tuits = await findAllTuits();

  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  );

  const tuit = screen.getByText(/Dragon/i);
  expect(tuit).toBeInTheDocument();
});
