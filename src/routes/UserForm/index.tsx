/* eslint-disable no-bitwise */
import React, {
  FormEventHandler,
  useCallback,
  useContext,
  useMemo
} from 'react';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import Routes from '..';
import AppContext from '../../App/AppContext';
import GoBack from '../../App/CommonComponets/GoBack';
import { FormFields, UserType } from '../../types';
import Input from './Input';
import CountrySelect from './CountrySelect';

export default function UserForm({ title }: { title: string }) {
  const history = useHistory();
  const { manageUser, users } = useContext(AppContext);
  const { id: userId } = useParams<{
    id: string;
  }>();
  const user = useMemo(() => {
    if (userId && users) {
      return users.find(({ id }) => id === userId);
    }
    return undefined;
  }, [users, userId]);
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      try {
        const { target } = e;
        const newUser = { ...user } as UserType;
        let allowUpdate = false;
        Object.values(FormFields).forEach((formName) => {
          const elm = target[formName] as HTMLInputElement;
          if (elm) {
            if (elm.value) {
              if (newUser[FormFields[formName]] !== elm.value) {
                newUser[FormFields[formName]] = elm.value;
                allowUpdate = true;
              }
            } else {
              throw new Error(`No input value for '${formName}'`);
            }
          } else {
            throw new Error(`No input element '${formName}'`);
          }
        });
        if (!allowUpdate) {
          Swal.fire(
            'Warning',
            "Fields didn't change",
            'warning'
          ).finally(() => {});
          return;
        }
        if (userId) {
          if (user) {
            manageUser(newUser, 'update', () => {
              Swal.fire('Success', 'User updated', 'success')
                .then(() => {
                  history.push(Routes.landing);
                })
                .finally(() => {});
            });
          }
        } else {
          manageUser(
            {
              ...newUser,
              createdAt: new Date().getTime(),
              id: (((1 << 24) * Math.random()) | 0).toString(16)
            },
            'add',
            () => {
              Swal.fire('Success', 'User created', 'success')
                .then(() => {
                  history.push(Routes.landing);
                })
                .finally(() => {});
            }
          );
        }
      } catch (error) {
        Swal.fire('Error', error, 'error').finally(() => {});
      }
      //
    },
    [manageUser, userId, history, user]
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <h1>{title}</h1>
          <GoBack path={Routes.landing} />
          <form onSubmit={handleSubmit}>
            <Input
              label="First Name"
              required
              name={FormFields.firstName}
              initValue={user?.firstName}
              type="text"
            />
            <Input
              label="Last Name"
              required
              name={FormFields.lastName}
              initValue={user?.lastName}
              type="text"
            />
            <Input
              label="Email"
              required
              name={FormFields.email}
              initValue={user?.email}
              type="email"
            />
            <CountrySelect
              name={FormFields.country}
              initialValue={user?.country}
              label="Country"
              required
            />
            <Input
              label="Address"
              required
              name={FormFields.address}
              initValue={user?.address}
              type="address"
            />
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
