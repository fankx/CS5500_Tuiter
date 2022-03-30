import React from 'react';
import axios from 'axios';
import { screen, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import MyDislikes from '../components/profile/my-dislikes';

test('user list renders async', async () => {
  const users = await findAllUsers();
  render(
    <HashRouter>
      <UserList users={users} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice/i);
  expect(linkElement).toBeInTheDocument();
});
