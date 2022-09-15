import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getPosts } from "../api/api";
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  usersIdForPost: number,
  setusersIdForPost: (num: number)=>void,
}

export const Postinfo: React.FC<Props> = ({ usersIdForPost, setusersIdForPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [toShowBodyPost, settoShowBodyPost] = useState(0);
  const availableScreenWidth = window.screen.availWidth;

  useEffect(() => {
    getPosts().then((postsFromServer: React.SetStateAction<Post[]>) => {
      setPosts(postsFromServer);
    });
  }, [usersIdForPost]);

  return (
    <div className='App__post'>
      <ul className='post'>
        {posts.filter(post => post.userId === usersIdForPost)
          .map(post => (
            <div
              key={post.id}
              onClick={() => settoShowBodyPost(prev => prev === post.id ? 0 : post.id)}
            >
              <div
                className='post__title'
              >
                {post.title}
              </div>
              <div
                className={classNames('post__body',
                  post.id === toShowBodyPost ? '' : 'hide')}
              >
                {post.text}
              </div>
              <hr />
            </div>
          ))}
      </ul>

      {(availableScreenWidth <= 800) && 
        (
          <div 
            className='post__button'
            onClick={() => setusersIdForPost(0)}
          >
            Close
          </div>
        )
      }
    </div>
  );
};