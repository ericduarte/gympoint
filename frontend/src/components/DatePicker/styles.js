import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import colors from '~/styles/colors';

export const ReactDatePicker = styled(DatePicker)`
  width: 100%;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  height: 44px;
  width: 100%;
  padding: 0 15px;
  margin: 10px 0 10px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;
