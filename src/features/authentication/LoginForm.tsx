import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthd } from './authSelectors';
import { loginThunk, logoutThunk } from './authThunks';

export function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const isAuthd = useSelector(selectIsAuthd);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const username = form.get('usr') as string;
    const password = form.get('pwd') as string;
    dispatch(loginThunk({ username, password }));
  };

  const handleLogoutButtonClick = (): void => {
    dispatch(logoutThunk());
  };

  return (
    <>
      {isAuthd ? <span>authd</span> : <span>not authd</span>}
      <form onSubmit={handleFormSubmit}>
        <input name="usr" />
        <input name="pwd" type="password" />
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={handleLogoutButtonClick}>
        Logout
      </button>
    </>
  );
}
