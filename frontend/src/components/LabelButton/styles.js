import styled from 'styled-components';
import colors from '~/styles/colors';

export const CustomButton = styled.button`
  background: none;
  border: none;
  padding-right: 5px;
  color: ${props => (props.color ? colors[props.color] : colors.primary)};
`;
