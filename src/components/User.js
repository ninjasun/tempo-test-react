import React, { useEffect, useState, } from 'react';

const USERS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/users";

const  User = ({id}) => {
  const [user, setUser] = useState({
    first: '', last: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return
      try {
        const user = await (await fetch(USERS_URL + "/" + id)).json();
          setUser({
            first: user.name.first, last: user.name.last
          });
      }
      catch (e) {

      }
    }
    fetchUser()
  }, [id]);

  return (
    <li className="user">
      <p >{user.first} - {user.last}</p>
    </li>
  )
}

export default User;