import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    AnswerContainer,
    HelpOrderCard,
    Header,
    Title,
    Time,
    Content,
} from './styles';

export default function HelpOrderShow({ navigation }) {
    const helpOrder = navigation.getParam('helpOrder');
    console.tron.log(helpOrder.created_at);
    const questionTime = useMemo(
        () =>{

            return formatRelative(parseISO(helpOrder.created_at), new Date(), {
                locale: pt,
            })
        },
        [helpOrder.created_at]
    );



    const answerTime = useMemo(
        () =>
            helpOrder.answer_at
                ? formatRelative(parseISO(helpOrder.answer_at), new Date(), {
                      locale: pt,
                  })
                : '',
        [helpOrder.answer_at]
    );

    console.tron.log('Chegou aqui 2');

    return (
        <Container>
            <HelpOrderCard>
                <Header>
                    <Title>PERGUNTA</Title>
                    <Time>{questionTime}</Time>
                </Header>
                <Content>{helpOrder.question}</Content>
                {helpOrder.answer && (
                    <AnswerContainer>
                        <Header>
                            <Title>RESPOSTA</Title>
                            <Time>{answerTime}</Time>
                        </Header>
                        <Content>{helpOrder.answer}</Content>
                    </AnswerContainer>
                )}
            </HelpOrderCard>
        </Container>
    );
}

HelpOrderShow.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func,
    }).isRequired,
};

HelpOrderShow.navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color="#ee4e62" />
        </TouchableOpacity>
    ),
});
