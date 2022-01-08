import { useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';

function UserResultsList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users.map((user, index) => (
        <li key={index}>{user.login}</li>
      ))}
    </div>
  );
}

export default UserResultsList;
