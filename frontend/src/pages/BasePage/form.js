import React, { useRef } from 'react';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdArrowBack, MdDone } from 'react-icons/md';
import { CardHeader, CardBody, Button } from './styles';

export default function BasePage(props) {
  const {
    FormWrapper,
    schema,
    formData,
    id,
    header,
    saveAction,
    setPageStateAction,
    children,
  } = props;

  const dispatch = useDispatch();
  function handleSubmit(data) {
    dispatch(saveAction({ ...data, id }));
  }

  function setPageState(data) {
    dispatch(setPageStateAction(data));
  }

  function handleVoltarClick() {
    setPageState('LISTING');
  }

  const form = useRef(null);

  return (
    <Form onSubmit={handleSubmit} schema={schema} initialData={formData}>
      <CardHeader>
        <h1>{header}</h1>
        <aside>
          <div>
            <Button ref={form} kind="primary" type="submit">
              <MdDone color="#fff" size={24} />
              <span>SALVAR</span>
            </Button>
            <Button onClick={handleVoltarClick} type="button">
              <MdArrowBack color="#fff" size={24} />
              <span>VOLTAR</span>
            </Button>
          </div>
        </aside>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Form>
  );
}

BasePage.defaultProps = {
  formData: null,
  id: 0,
};

BasePage.propTypes = {
  FormWrapper: PropTypes.func.isRequired,
  schema: PropTypes.shape().isRequired,
  formData: PropTypes.shape(),
  id: PropTypes.number,
  header: PropTypes.string.isRequired,
};
