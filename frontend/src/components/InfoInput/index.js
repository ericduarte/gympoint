/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { CustomInput } from './styles';

export default function InfoInfo({ ...rest }) {
  return <CustomInput {...rest} />;
}
