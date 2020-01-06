import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #f2f2f2;
`;

export const ContentContainer = styled.View``;

export const Content = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 25;
`;

export const NewButton = styled(Button)`
  align-self: stretch;
  margin-bottom: 20px;
`;

export const HelpOrdersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const HelpOrderItem = styled(RectButton)`
  padding: 20px;
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  margin-bottom: 10px;
  line-height: 1.8;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.answered ? '#42CB59' : '#999')};
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;
