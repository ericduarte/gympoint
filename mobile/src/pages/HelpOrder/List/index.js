import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Content,
  NewButton,
  HelpOrdersList,
  HelpOrderItem,
  Header,
  Status,
  StatusContainer,
  Time,
  ContentContainer,
} from './styles';
import api from '~/services/api';

function HelpOrderList({ navigation, isFocused }) {
  const studentId = useSelector(state => state.auth.studentId);
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHelpOrders(id) {
    setLoading(true);
    const response = await api.get(`students/${id}/help-orders`);

    const data = response.data.map(helpOrder => ({
      ...helpOrder,
      time: formatRelative(
        parseISO(
          helpOrder.answer_at ? helpOrder.answer_at : helpOrder.created_at
        ),
        new Date(),
        { locale: pt }
      ),
    }));
    setHelpOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders(studentId);
    }
  }, [isFocused, studentId]);

  function handlePressHelpOrder(helpOrder) {
    navigation.navigate('HelpOrderShow', { helpOrder });
  }

  function handleNewHelpOrder() {
    navigation.navigate('HelpOrderNew');
  }

  return (
    <Container>
      <NewButton onPress={handleNewHelpOrder}>Novo pedido de auxílio</NewButton>
      {loading ? (
        <ActivityIndicator size="large" color="#999" />
      ) : (
        <HelpOrdersList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HelpOrderItem onPress={() => handlePressHelpOrder(item)}>
              <Header>
                <StatusContainer>
                  <Icon
                    name="check-circle"
                    size={20}
                    color={item.answer_at ? '#42CB59' : '#999'}
                  />
                  <Status answered={item.answer_at}>
                    {item.answer_at ? 'Respondido' : 'Sem resposta'}
                  </Status>
                </StatusContainer>
                <Time>{item.time}</Time>
              </Header>
              <ContentContainer>
                <Content numberOfLines={3}>{item.question}</Content>
              </ContentContainer>
            </HelpOrderItem>
          )}
        />
      )}
    </Container>
  );
}

HelpOrderList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrderList);
