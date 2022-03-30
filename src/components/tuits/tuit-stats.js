import React from 'react';
import { useState, useEffect } from 'react';
import { checkIfLike } from '../../services/likes-service';
import { checkIfDislike } from '../../services/dislikes-service';

const TuitStats = ({ tuit, likeTuit = () => {}, dislikeTuit = () => {} }) => {
  const [isliked, setLiked] = useState([]);
  const [isdisliked, setDisliked] = useState([]);

  const checkLike = async () => {
    let liked = await checkIfLike('me', tuit._id);
    liked ? setLiked(true) : setLiked(false);
  };
  const checkDislike = async () => {
    let disliked = await checkIfDislike('me', tuit._id);
    disliked ? setDisliked(true) : setDisliked(false);
  };

  useEffect(() => {
    checkLike();
    checkDislike();
  }, []);

  const likeHandler = async () => {
    await likeTuit(tuit);
    await checkLike();
    await checkDislike();
  };
  const disikeHandler = async () => {
    await dislikeTuit(tuit);
    await checkLike();
    await checkDislike();
  };

  return (
    <div className='row mt-2'>
      <div className='col'>
        <i className='far fa-message me-1'></i>
        {tuit.stats && tuit.stats.replies}
      </div>

      <div className='col'>
        <i className='far fa-retweet me-1'></i>
        {tuit.stats && tuit.stats.retuits}
      </div>

      <div className='col'>
        <span onClick={() => likeHandler()}>
          {isliked ? (
            <i
              className='fa-solid fa-thumbs-up me-1'
              style={{ color: 'red' }}
            ></i>
          ) : (
            <i className='fa-light fa-thumbs-up me-1'></i>
          )}
          {tuit.stats && tuit.stats.likes}
        </span>
      </div>

      <div className='col'>
        <span onClick={() => disikeHandler()}>
          {isdisliked ? (
            <i
              className='fa-solid fa-thumbs-down me-1'
              style={{ color: 'red' }}
            ></i>
          ) : (
            <i className='fa-light fa-thumbs-down me-1'></i>
          )}
          {tuit.stats && tuit.stats.dislikes}
        </span>
      </div>

      <div className='col'>
        <i className='far fa-inbox-out'></i>
      </div>
    </div>
  );
};
export default TuitStats;
