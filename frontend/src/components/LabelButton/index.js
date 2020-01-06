/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from './styles';

export default function LabelButton({ color, label, ...rest }) {
  return (
    <CustomButton color={color} {...rest}>
      {label}
    </CustomButton>
  );
}

LabelButton.defaultProps = {
  color: 'primary',
  label: '',
  icon: null,
};

LabelButton.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
};
