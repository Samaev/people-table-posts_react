import classNames from 'classnames';
import React from 'react';
import Left from "../images/left.svg";
import Right from "../images/right.svg";

type Props = {
  getusersFromTabletoShow: (str: string)=>void,
  setSortedByName: (flag: any)=>void,
  sortedByName: boolean,
}
export const Searchbar: React.FC<Props> = ({ getusersFromTabletoShow, setSortedByName, sortedByName }) => {
  return (
    <div className='nav'>
      <div
        className='nav__point '
        onClick={() => getusersFromTabletoShow('prev')}
      >
        <img src={Left} alt="previos" />
        <div className='nav__point'> Previous</div>
      </div>

      <div
        className={classNames('nav--button',
          (sortedByName && 'active-color')
        )}
        onClick={() => setSortedByName((prev: boolean) => prev === false ? true : false)}
      >
        {(sortedByName) ? 'Sorted' : 'Sort by name'}
      </div>

      <div
        className='nav__point'
        onClick={() => getusersFromTabletoShow('next')}
      >
        <div>Next</div>
        <img src={Right} alt="next" />
      </div>
    </div>
  );
};