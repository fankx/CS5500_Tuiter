import { UserList } from '../components/profile/user-list';
import { screen, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { findAllUsers } from '../services/users-service';

// Testing user interfaces rendering data from remote asynchronous RESTful APIs
test('user list renders async', async () => {
  const users = await findAllUsers();
  render(
    <HashRouter>
      <UserList users={users} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/spacex/i);
  expect(linkElement).toBeInTheDocument();
});
