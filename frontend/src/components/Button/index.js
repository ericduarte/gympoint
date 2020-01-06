import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from './styles';

export default function Button({ color, label, icon, ...rest }) {
  return (
    <CustomButton color={color} {...rest}>
      {icon}
      <span>{label}</span>
    </CustomButton>
  );
}

Button.defaultProps = {
  color: 'primary',
  label: '',
  icon: null,
};

Button.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
};
