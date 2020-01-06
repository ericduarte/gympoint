import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Pages = styled.ul`
  li {
    display: inline;
  }
`;

export const Button = styled.button`
  width: 25px;
  margin: 10px 0 0 10px;
  height: 25px;
  background: ${props => colors[props.color]};
  color: #fff;
  border: 0;
  border-radius: 50%;
  font-size: 0.98em;
  font-weight: bold;
  transition: background 0.2s;
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
