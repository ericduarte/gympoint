/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Form from '../BasePage/form';
import Label from '~/components/Label';
import Input from '~/components/Input';
import InfoInput from '~/components/InfoInput';
import { formatCurrencyBR, stringToFloatBR } from '~/utils';

export default function PlanForm({ ...props }) {
  const { formData } = props;
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const schema = Yup.object().shape({
    title: Yup.string().required('O título é obrigatório'),
    price: Yup.number().required('O preço é obrigatório'),
    duration: Yup.number().required('A duração é obrigatória'),
  });

  useMemo(async () => {
    if (formData) {
      setPrice(formData.price);
      setDuration(formData.duration);
    }
  }, [formData]);

  useMemo(async () => {
    if (duration && price) {
      setTotalPrice(formatCurrencyBR(duration * price));
    }
  }, [duration, price]);

  return (
    <Form {...props} schema={schema}>
      <Container>
        <Input name="id" hidden />
        <Row>
          <Col>
            <Label>Título</Label>
            <Input name="title" />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Label>Preço(Mensal)</Label>
            <Input
              placeholder="Informe o Preço"
              name="price"
              type="number"
              onChange={e => {
                setPrice(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Label>Duração(Meses)</Label>
            <Input
              type="number"
              placeholder="Duração"
              name="duration"
              onChange={e => {
                setDuration(stringToFloatBR(e.target.value));
              }}
            />
          </Col>
        </Row>
        <Col sm={3}>
          <Label>VALOR FINAL</Label>
          <InfoInput value={totalPrice} />
        </Col>
      </Container>
    </Form>
  );
}

PlanForm.propTypes = {
  formData: PropTypes.shape().isRequired,
};
