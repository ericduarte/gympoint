import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  svg {
    position: relative;
    left: 46px;
    color: ${colors.placeholder};
  }
`;

export const Search = styled.input`
  border: 1px solid ${colors.border};
  border-radius: 4px;
  height: 35px;
  width: 100%;
  padding: 0 15px;
  margin: 10px 0 10px;
  color: ${colors.input};
  text-indent: 35px;
  font-size: 14px;

  &::placeholder {
    color: ${colors.placeholder};
  }
`;
