import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import styled from 'styled-components';

import AsyncSelect from 'react-select/async';

function CustomAsyncSelect({ name, loadOptions, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select.state.value',
      parseValue: selectRef => {
        if (selectRef) return selectRef.id;
        return defaultValue;
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
        defaultValue={rest.defaultValue}
        defaultOptions
        loadOptions={loadOptions}
        height="44px"
        styles={{ marginTop: '10px' }}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

CustomAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
};

const ASelect = styled(CustomAsyncSelect)`
  margin: 10px 0 10px;
  .react-select__control {
    width: 100%;
    height: 44px;
  }
  .react-select__value-container {
    display: flex;
    align-items: center;
    height: 44px;
  }
  .react-select__input input {
    height: 16px;
  }
`;

export default ASelect;
