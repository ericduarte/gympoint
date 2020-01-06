import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  margin-left: auto;
  margin-right: auto;
  min-width: 60%;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  aside {
    div {
      display: flex;
    }
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  aside {
    div {
      display: flex;
    }
  }
`;

export const CardBody = styled.div`
  background: #fff;
  height: 100%;
  padding: 10px;
`;

export const Content = styled.div`
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  width: 140px;
  margin: 10px 0 0 10px;
  height: 35px;
  background: ${props => (props.kind === 'primary' ? '#f64c75' : '#c7c7c7c7')};
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
      const color = props.kind === 'primary' ? '#f64c75' : '#c7c7c7c7';
      return darken(0.08, color);
    }};
  }
`;
