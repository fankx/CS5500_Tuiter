import { act, create } from 'react-test-renderer';
import { HashRouter } from 'react-router-dom';
import TuitStats from '../tuits/tuit-stats';
import MyDislikes from './my-dislikes';
import Tuits from '../tuits';

test('disliked tuits render correctly', () => {
  let MOCKED_DISLIKES_TUIT = {
    _id: '1',
    tuit: 'Hello World!!!',
    stats: {
      dislikes: 1,
      retuits: 0,
      replies: 0,
      likes: 0,
    },
  };

  let MOCKED_USER = {
    username: 'ellen_ripley',
    password: 'lv426',
    email: 'repley@weyland.com',
    _id: '123',
  };

  render(
    <HashRouter>
      <MyDislikes tuit={MOCKED_DISLIKES_TUIT} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();

  const dislikeTuit = () => {
    act(() => {
      stats.dislikes++;
      MyDislikes.update(
        <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike} />
      );
    });
  };
});
