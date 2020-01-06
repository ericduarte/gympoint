import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const CustomButton = styled.button`
  width: ${props => props.width || '200px'};
  margin: 10px 0 0 10px;
  height: 35px;
  background: ${props => colors[props.color]};
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 0.98em;
  font-weight: bold;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    padding-left: 5px;
  }

  &:hover {
    background: ${props => {
      const color = colors[props.color];
      return darken(0.08, color);
    }};
  }
`;
