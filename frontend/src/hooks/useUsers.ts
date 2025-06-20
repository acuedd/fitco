import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllUsers } from '../services/users.service';

export function useUsers() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.list);
  const loading = useAppSelector((state) => state.users.loading);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        dispatch({ type: 'users/fetchUsers/fulfilled', payload: data });
      })
      .catch((error) => {
        dispatch({ type: 'users/fetchUsers/rejected', error: { message: error.message } });
      });
  }, [dispatch]);

  return { users, loading };
}