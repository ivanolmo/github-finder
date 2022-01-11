import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';

function UserSearch() {
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const [text, setText] = useState('');

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter a search term', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });
      setText('');
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='input input-lg w-full pr-40 bg-gray-200 text-black'
                placeholder='search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='btn btn-lg absolute top-0 right-0 rounded-l-none w-36'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {users.length > 1 && (
          <button
            className='btn btn-ghost btn-lg'
            onClick={() => dispatch({ type: 'CLEAR_RESULTS' })}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default UserSearch;
