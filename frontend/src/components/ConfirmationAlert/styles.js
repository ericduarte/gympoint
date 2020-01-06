import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 400px;
  padding: 30px;
  text-align: center;
  background: #ffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: solid, 1px;
  border-radius: 10px;
  justify-content: center;
`;

export const Button = styled.button`
  width: 50px;
  margin: 10px 0 0 10px;
  height: 30px;
  background: ${props => (props.kind === 'primary' ? '#f64c75' : '#c7c7c7c7')};
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${props => {
      const color = props.kind === 'primary' ? '#f64c75' : '#c7c7c7c7';
      return darken(0.08, color);
    }};
  }
`;
