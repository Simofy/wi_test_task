/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormFields } from '../../types';

export default function Input({
  name,
  label,
  initValue,
  required,
  type
}: {
  name: FormFields;
  label: string;
  type: string;
  required?: boolean;
  initValue?: string;
}) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        required={required}
        className="form-control"
        name={name}
        defaultValue={initValue}
      />
    </div>
  );
}
