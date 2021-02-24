import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from '../routes';
import Landing from '../routes/Landing';
import UserForm from '../routes/UserForm';
import AppContext from './AppContext';
import './main.css';
import { AppContextType, CountryType, UserType } from '../types';
import Loader from './CommonComponets/Loader';

export default function App() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    const stashedUsersString = localStorage.getItem('stash-users');
    if (stashedUsersString) {
      try {
        const stashedUsers = JSON.parse(stashedUsersString) as UserType[];
        setUsers(stashedUsers);
      } catch (e) {}
    }
    fetch('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code')
      .then((response) => response.json())
      .then(setCountries)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      if (users) {
        localStorage.setItem('stash-users', JSON.stringify(users));
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [users]);

  const manageUser = useCallback<AppContextType['manageUser']>(
    (user, action, callback) => {
      setUsers((oldUsers) => {
        const index = oldUsers.findIndex(({ id }) => user.id === id);
        let toReturn = oldUsers;
        switch (action) {
          case 'add':
            if (index === -1) {
              toReturn = [...oldUsers, user];
            }
            break;
          case 'remove':
            if (index !== -1) {
              oldUsers.splice(index, 1);
              toReturn = [...oldUsers];
            }
            break;
          case 'update':
            if (index !== -1) {
              const newUsers = [...oldUsers];
              newUsers[index] = { ...user };
              toReturn = newUsers;
            }
            break;
          default:
            break;
        }
        if (callback) {
          callback();
        }
        return toReturn;
      });
    },
    []
  );
  return (
    <AppContext.Provider
      value={{
        manageUser,
        countries,
        loading,
        users
      }}
    >
      <Router>
        <Switch>
          <Route path={Routes.createUser}>
            <UserForm title="Create user" />
          </Route>
          <Route path={`${Routes.updateUser}/:id`}>
            <UserForm title="Update user" />
          </Route>
          <Route path={Routes.landing} component={Landing} />
        </Switch>
      </Router>
      <Loader loading={loading} />
    </AppContext.Provider>
  );
}
