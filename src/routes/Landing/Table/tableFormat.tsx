import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import Routes from '../..';
import AppContext from '../../../App/AppContext';
import { UserType } from '../../../types';

const tableFormat = [
  {
    Header: 'Id',
    accessor: 'id',
    Cell: ({ value }) => (
      <span
        style={{
          color: `#${value}`
        }}
      >
        {value}
      </span>
    )
  },
  {
    Header: 'First name',
    accessor: 'firstName'
  },
  {
    Header: 'Last name',
    accessor: 'lastName'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Address',
    accessor: 'address'
  },
  {
    Header: 'Country',
    accessor: 'country',
    Cell: ({ value }) => {
      const { countries } = useContext(AppContext);
      const countryCode = useMemo(
        () => countries.find(({ name }) => value === name)?.alpha2Code,
        [value, countries]
      );
      return countryCode ? (
        <span className="country-image">
          <img
            alt={value}
            title={value}
            src={`https://www.countryflags.io/${countryCode}/flat/64.png`}
          />
        </span>
      ) : (
        ''
      );
    }
  },
  {
    Header: 'Edit',
    accessor: 'id',
    id: 'edit-user',
    Cell: ({ value }) => {
      const { manageUser, users } = useContext(AppContext);
      const user = useMemo(() => users.find(({ id }) => id === value), [
        users,
        value
      ]);
      return (
        <span>
          <Link
            to={`${Routes.updateUser}/${value}`}
            className="btn btn-success btn-sm me-2"
          >
            Update
          </Link>
          <button
            onClick={() => {
              if (user) {
                manageUser(user, 'remove');
              }
            }}
            type="button"
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </span>
      );
    }
  }
] as Array<Column<UserType>>;

export default tableFormat;
