import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import colors from '~/styles/colors';

export const CustomAsyncSelect = styled(AsyncSelect)`
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
