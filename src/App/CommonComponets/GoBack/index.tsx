import React from 'react';
import { useHistory } from 'react-router';
import Routes from '../../../routes';

export default function GoBack({ path }: { path?: Routes }) {
  const history = useHistory();

  return (
    <button
      type="button"
      className="my-3 btn btn-link px-0"
      title="Go back"
      onClick={() => {
        if (path) {
          history.push(path);
        } else {
          history.goBack();
        }
      }}
    >
      Go back
    </button>
  );
}
