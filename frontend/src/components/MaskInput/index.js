/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import { MaskInput } from './styles';

export default function InputMask({ name, mask, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <MaskInput
        mask={mask}
        name={fieldName}
        maskChar="_"
        alwaysShowMask
        onChange={e => setSelected(e.target.value)}
        value={selected}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
};
