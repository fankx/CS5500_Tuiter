import TuitStats from '../../components/tuits/tuit-stats.js';
import { screen, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const MOCKED_DISLIKES_TUIT = {
  tuit: 'Hello World!!!',
  stats: {
    likes: 0,
    dislikes: 1,
    retuits: 0,
    replies: 0,
  },
};

test('TuitStats renders correct dislikes button', () => {
  render(
    <HashRouter>
      <TuitStats tuit={MOCKED_DISLIKES_TUIT} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/1/i);
  expect(linkElement).toBeInTheDocument();
});
