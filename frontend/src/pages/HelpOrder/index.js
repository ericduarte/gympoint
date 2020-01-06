import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import BasePage from '../BasePage';
import { Question, TextArea, Button } from './styles';

import {
  helpOrderSearchRequest,
  helpOrderSaveRequest,
  helpOrderSetPageState,
} from '~/store/modules/helpOrder/actions';
import Modal from '~/components/Modal';
import Label from '~/components/Label';

export default function HelpOrder() {
  const [showModal, setShowModal] = useState(false);
  const [helpOrder, setHelpOrder] = useState({});

  const pageState = useSelector(state => {
    return state.helpOrder.pageState;
  });

  useEffect(() => {
    setShowModal(pageState === 'ANSWERING');
  }, [setShowModal, pageState]);

  const dispatch = useDispatch();

  function showAnswerModal(row) {
    dispatch(helpOrderSetPageState('ANSWERING'));
    setHelpOrder(row);
  }

  function handleCloseModal() {
    dispatch(helpOrderSetPageState('LISTING'));
  }

  async function handleSubmitAwswer(data, { resetForm }) {
    const { id } = helpOrder;
    resetForm();
    dispatch(helpOrderSaveRequest({ ...data, id }));
  }

  const schema = Yup.object().shape({
    answer: Yup.string().required('A resposta é obrigatória'),
  });

  return (
    <>
      <BasePage
        listHeader="Pedidos de Auxílio"
        searchField="name"
        resource="helpOrder"
        searchAction={helpOrderSearchRequest}
        saveAction={helpOrderSaveRequest}
        setPageStateAction={helpOrderSetPageState}
        showActions={false}
        showAdd={false}
        showCustomActions
        searchPlaceHolder="Informe o aluno..."
        customActions={[
          {
            label: 'responder',
            action: showAnswerModal,
            color: 'edit',
          },
        ]}
        fields={[
          { name: 'student.name', displayName: 'Aluno', textAlign: 'left' },
        ]}
      />
      <Modal
        title="PERGUNTA DO ALUNO"
        isShow={showModal}
        onClose={handleCloseModal}
        width="450px"
      >
        <Question>{helpOrder.question}</Question>
        <Form schema={schema} onSubmit={handleSubmitAwswer}>
          <Label>SUA RESPOSTA</Label>
          <TextArea multiline name="answer" />
          <Button type="submit">Responder Aluno</Button>
        </Form>
      </Modal>
    </>
  );
}
