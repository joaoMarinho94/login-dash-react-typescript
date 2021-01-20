import React, { useEffect, useRef } from 'react';
import { FormLabel, FormGroup } from 'react-bootstrap';
import { useField } from '@unform/core';

import './styles.css';

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ name, label, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <FormGroup>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        className={`form-control ${error ? 'invalid-input' : ''}`}
        {...rest}
      />

      {error && <span className="invalid-text">{error}</span>}
    </FormGroup>
  );
};

export default Input;
