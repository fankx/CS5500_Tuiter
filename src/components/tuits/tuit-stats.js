import React from 'react';
import { useState, useEffect } from 'react';
import { checkIfLike } from '../../services/likes-service';
import { checkIfDislike } from '../../services/dislikes-service';

const TuitStats = ({ tuit, likeTuit = () => {}, dislikeTuit = () => {} }) => {
  const [isliked, setLiked] = useState(null);
  const [isdisliked, setDisliked] = useState(null);

  const checkLike = async () => {
    let liked = await checkIfLike('me', tuit._id);
    if (liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  const checkDislike = async () => {
    let disliked = await checkIfDislike('me', tuit._id);
    if (disliked) {
      setDisliked(true);
    } else {
      setDisliked(false);
    }
  };

  // useEffect(() => {
  //   checkLike();
  //   checkDislike();
  // }, []);

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
        {tuit.stats && (
          <span className='ttr-stats-replies'>{tuit.stats.replies}</span>
        )}
      </div>

      <div className='col'>
        <i className='far fa-retweet me-1'></i>
        {tuit.stats && (
          <span className='ttr-stats-retuits'>{tuit.stats.retuits}</span>
        )}
      </div>

      <div className='col'>
        <span className='ttr-like-tuit-click' onClick={() => likeHandler()}>
          {isliked ? (
            <i
              className='fa-solid fa-thumbs-up me-1'
              style={{ color: 'red' }}
            ></i>
          ) : (
            <i className='fa-light fa-thumbs-up me-1'></i>
          )}
          <span className='ttr-stats-likes'>
            {tuit.stats && tuit.stats.likes}
          </span>
        </span>
      </div>

      <div className='col'>
        <span
          className='ttr-dislike-tuit-click'
          onClick={() => disikeHandler()}
        >
          {isdisliked ? (
            <i
              className='fa-solid fa-thumbs-down me-1'
              style={{ color: 'red' }}
            ></i>
          ) : (
            <i className='fa-light fa-thumbs-down me-1'></i>
          )}
          <span className='ttr-stats-dislikes'>
            {tuit.stats && tuit.stats.dislikes}
          </span>
        </span>
      </div>

      <div className='col'>
        <i className='far fa-inbox-out'></i>
      </div>
    </div>
  );
};
export default TuitStats;
