import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import colors from '~/styles/colors';

export const Question = styled.span`
  color: #999;
  font-size: 18px;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;

  button {
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 0.98em;
    font-weight: bold;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.primary};
  }

  label {
    width: 100%;
    text-align: center;
  }
`;

export const TextArea = styled(Input)`
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin: 16px 0 0;
  height: 120px;
  margin-bottom: 16px;
  width: 100%;
`;
