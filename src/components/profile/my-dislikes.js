import Tuits from '../tuits';
import * as service from '../../services/dislikes-service';
import { useEffect, useState } from 'react';
import SampleTuit from '../tuits/sampleTuit';

const MyDislikes = () => {
  const [dislikedTuits, setDislikedTuits] = useState([]);
  const findTuitsIDislike = () =>
    service
      .findAllTuitsDislikedByUser('me')
      .then((tuits) => setDislikedTuits(tuits));
  useEffect(findTuitsIDislike, []);

  const MOCKED_TUIT = {
    tuit: 'MOCKED TUIT',
    postedBy: '1',
    postedOn: '2000/01/01',
    stats: {
      replies: 1,
      retuits: 1,
      likes: 1,
      dislikes: 1,
    },
  };

  return (
    <div>
      <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike} />{' '}
      <SampleTuit tuit={MOCKED_TUIT}></SampleTuit>
    </div>
  );
};
export default MyDislikes;
