import React, { useEffect, useCallback, useState } from 'react';
import './App.scss';
import { Cardinfo } from './components/CardInfo';
import { getUsers } from './api/api';
import { Searchbar } from './components/Searchbar';
import { User } from './types/User';


function App() {
  const [users, setusers] = useState<User[]>([]);
  const [queryusers, setQueryusers] = useState("");
  const [getFourusersFromArray, setgetFourusersFromArray] = useState(0);
  const [sortedByName, setSortedByName] = useState(false);
  const [visibleusers, setVisibleusers] = useState<User[]>([]);

  const debounce = (f: any, delay: number) => {
    let timerId: any;

    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay, ...args);
    };
  };

  useEffect(() => {
    getUsers().then(usersFromServer => {
      setusers(usersFromServer);
      setVisibleusers(usersFromServer);
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getQueryPerson = useCallback(
    debounce(setQueryusers, 1000),
    []
  );

  useEffect(() => {
    return (
      setgetFourusersFromArray(0),
      sortedByName === true ?
        (setVisibleusers([...users]
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(person => person.name
            .toLowerCase()
            .includes(queryusers))))
        : (setVisibleusers(users
          .filter(person => person.name
            .toLowerCase()
            .includes(queryusers))))
    )
  }, [sortedByName, queryusers]);

  const getusersFromTabletoShow = (value: string) => {
    switch (value) {
      case 'next':
        return setgetFourusersFromArray(prev => prev < visibleusers.length - 4 ? prev += 4 : prev);
      case 'prev':
        return setgetFourusersFromArray(prev => prev > 0 ? prev -= 4 : 0);

      default:
        return setgetFourusersFromArray(getFourusersFromArray);
    }
  }

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__logo">Lorem ipsum</div>
        <input
          type="text"
          placeholder='Search'
          className='App__search'
          onChange={(event) => getQueryPerson(event.target.value)}
        />
      </header>

      <Cardinfo
        users={visibleusers}
        getFourusersFromArray={getFourusersFromArray} searchPerson={{
          id: 0,
          name: '',
          username: '',
          email: '',
          phone: '',
          www: ''
        }}      />

      <Searchbar
        getusersFromTabletoShow={getusersFromTabletoShow}
        setSortedByName={setSortedByName}
        sortedByName={sortedByName}
      />

    </div>
  );
}

export default App;