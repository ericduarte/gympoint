import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import AsyncSelect from 'react-select/async';

export default function ASelect({ name, loadOptions, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select.state.value',
      parseValue: selectRef => {
        return selectRef.id;
      },
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <AsyncSelect
        name={fieldName}
        ref={ref}
        cacheOptions
        defaultValue={defaultValue}
        defaultOptions
        loadOptions={loadOptions}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ASelect.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
};
