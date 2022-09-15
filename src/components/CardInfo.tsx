import classNames from "classnames";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { User } from "../types/User";
import {Postinfo} from "./Postinfo"

type Props = {
  users: User[],
   searchPerson: User,
    getFourusersFromArray: number,
  };

export const Cardinfo: React.FC<Props> = ({
  users,
  searchPerson,
  getFourusersFromArray,
}) => {
  const [usersIdForPost, setusersIdForPost] = useState(0);

  const getPersonId = (a: number) => {
    return setusersIdForPost((prev) => (prev === a ? 0 : a));
  };

  useEffect(() => {
    setusersIdForPost(0);
  }, [searchPerson, getFourusersFromArray, users]);

  return (
    <main
      className={classNames(
        usersIdForPost > 0 ? "App__body--width-post" : "App__body"
      )}
    >
      <div className="container">
        {users.length > 0 ? (
          Array.from(users)
            .slice(getFourusersFromArray, getFourusersFromArray + 4)
            .map((person) => (
              <div
                className={classNames(
                  "App__card",
                  usersIdForPost > 0 && "App__card--width-post"
                )}
                key={person.id}
              >
                <div className="App__info">{person.name}</div>
                <div className="App__info">{person.email}</div>
                <div className="App__info">{person.phone}</div>
                <div className="App__info">{person.www}</div>
                <div
                  className={classNames(
                    "App__info--button",
                    usersIdForPost === person.id ? "active-color" : ""
                  )}
                  onClick={() => getPersonId(person.id)}
                >
                  {usersIdForPost !== person.id ? `Show Posts` : "Hide Posts"}
                </div>
              </div>
            ))
        ) : (
          <>User is not found</>
        )}
      </div>

      {usersIdForPost > 0 && (
        <Postinfo
          usersIdForPost={usersIdForPost}
          setusersIdForPost={setusersIdForPost}
        />
      )}
    </main>
  );
};
