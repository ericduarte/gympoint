/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import { FloatInput } from './styles';

export default function InputFloat({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseValue(value) {
    return value && typeof value === 'string'
      ? parseFloat(value.replace('.', '').replace(',', '.'))
      : value;
  }

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <FloatInput
        decimalSeparator=","
        thousandSeparator="."
        name={fieldName}
        onChange={v => {
          setValue(v);
        }}
        value={parseValue(value)}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

InputFloat.propTypes = {
  name: PropTypes.string.isRequired,
};
