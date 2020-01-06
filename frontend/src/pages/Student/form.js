/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import * as Yup from 'yup';
import Form from '../BasePage/form';
import Label from '~/components/Label';
import Input from '~/components/Input';
import FloatInput from '~/components/FloatInput';

export default function PlanForm({ ...props }) {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é Obrigatório'),
    age: Yup.number()
      .min(0, 'A idade deve ser maior ou igual 0 ano')
      .max(150, 'A idade deve ser menor ou igual 150 anos')
      .required('A idade é obrigatória'),
    weight: Yup.number().required('O peso é obrigatório'),
    height: Yup.number().required('A Altura é obrigatória'),
  });

  return (
    <Form {...props} schema={schema}>
      <Container>
        <Input name="id" hidden />
        <Row>
          <Col>
            <Label>Nome</Label>
            <Input name="name" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Email</Label>
            <Input name="email" />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Label>Idade</Label>
            <Input type="number" placeholder="Sua idade" name="age" />
          </Col>
          <Col sm={4}>
            <Label>Peso(em Kg)</Label>
            <FloatInput placeholder="Seu Peso" name="weight" />
          </Col>
          <Col sm={4}>
            <Label>Altura</Label>
            <FloatInput placeholder="Sua altura" name="height" />
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
